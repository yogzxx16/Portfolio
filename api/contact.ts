import type { IncomingMessage, ServerResponse } from 'http';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Request body payload interface
interface ContactPayload {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
  // Honeypot field - must be left empty by legitimate human visitors
  hp_company?: string;
}

// Allowed inquiry categories
const ALLOWED_INQUIRY_TYPES = [
  'Project Collaboration',
  'Internship / Full-time Opportunity',
  'Freelance / Contract',
  'General Inquiry',
];

// Helper to sanitize text preventing HTML/script injection in email body
function sanitizeText(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Client IP resolver helper
function getClientIp(req: IncomingMessage | Request): string {
  if ('headers' in req && typeof req.headers.get === 'function') {
    // Web Request API
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return req.headers.get('x-real-ip') || '127.0.0.1';
  } else {
    // Node.js IncomingMessage
    const headers = (req as IncomingMessage).headers;
    const forwarded = headers['x-forwarded-for'];
    if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
    if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0].trim();
    const realIp = headers['x-real-ip'];
    if (typeof realIp === 'string') return realIp.trim();
    return (req as IncomingMessage).socket?.remoteAddress || '127.0.0.1';
  }
}

// Initialize Upstash Rate Limiter if credentials exist
let ratelimitInstance: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    ratelimitInstance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '60 s'), // Max 3 submissions per 60 seconds per IP
      analytics: true,
      prefix: 'portfolio_contact',
    });
  } catch (error) {
    console.error('Failed to initialize Upstash Redis rate limiter:', error);
  }
}

// Core request processor
async function processContactRequest(
  method: string,
  clientIp: string,
  contentLength: number,
  body: ContactPayload
): Promise<{ status: number; body: Record<string, unknown> }> {
  // 1. Method check
  if (method !== 'POST') {
    return {
      status: 405,
      body: {
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: 'Only HTTP POST requests are supported.',
      },
    };
  }

  // 2. Request body size limit check (Max 10KB = 10,240 bytes)
  if (contentLength > 10240) {
    return {
      status: 413,
      body: {
        success: false,
        error: 'PAYLOAD_TOO_LARGE',
        message: 'Request payload exceeds the maximum allowed size (10KB).',
      },
    };
  }

  // 3. Honeypot check - reject spam bots silently or with 400
  if (body.hp_company && body.hp_company.trim().length > 0) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'SPAM_DETECTED',
        message: 'Suspicious transmission flagged by anti-spam verification.',
      },
    };
  }

  // 4. Rate Limiting Check (Upstash Redis)
  if (ratelimitInstance) {
    try {
      const { success, limit, remaining, reset } = await ratelimitInstance.limit(clientIp);
      if (!success) {
        return {
          status: 429,
          body: {
            success: false,
            error: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many messages sent from this network. Please wait a minute before trying again.',
            limit,
            remaining,
            reset,
          },
        };
      }
    } catch (rateLimitErr) {
      console.warn('Upstash rate limit verification check warning:', rateLimitErr);
      // Proceed cautiously if rate limit check fails due to network glitch
    }
  }

  // 5. Server-side field validation
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const inquiryType = typeof body.inquiryType === 'string' ? body.inquiryType.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length < 2 || name.length > 100) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'INVALID_NAME',
        message: 'Name is required and must be between 2 and 100 characters.',
      },
    };
  }

  // Email format verification (RFC 5322 compatible regex)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'INVALID_EMAIL',
        message: 'A valid email address is required.',
      },
    };
  }

  if (!inquiryType || !ALLOWED_INQUIRY_TYPES.includes(inquiryType)) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'INVALID_INQUIRY_TYPE',
        message: `Inquiry type must be one of: ${ALLOWED_INQUIRY_TYPES.join(', ')}.`,
      },
    };
  }

  if (!message || message.length < 10 || message.length > 3000) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'INVALID_MESSAGE',
        message: 'Message is required and must be between 10 and 3,000 characters.',
      },
    };
  }

  // 6. External Service Check: Verify RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is missing from environment variables.');
    return {
      status: 503,
      body: {
        success: false,
        error: 'SERVICE_UNCONFIGURED',
        message:
          'The server email transmission service is not currently configured. Please send an email directly to syogeshkumar2020@gmail.com.',
        requiresMailtoFallback: true,
      },
    };
  }

  // 7. Dispatch Email via Resend
  const toEmail = process.env.CONTACT_TO_EMAIL || 'syogeshkumar2020@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  try {
    const resend = new Resend(resendApiKey);

    const safeName = sanitizeText(name);
    const safeEmail = sanitizeText(email);
    const safeInquiry = sanitizeText(inquiryType);
    const safeMessage = sanitizeText(message).replace(/\n/g, '<br/>');

    const emailSubject = `[Portfolio Contact] ${inquiryType} from ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F4F0E8; color: #151515; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #FAF8F5; border: 2px solid #151515; box-shadow: 4px 4px 0px #151515; padding: 24px; }
            .badge { display: inline-block; background-color: #E53935; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 8px; letter-spacing: 1px; margin-bottom: 12px; }
            .header { border-bottom: 2px solid #151515; padding-bottom: 12px; margin-bottom: 20px; }
            .field-label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #55524E; letter-spacing: 0.5px; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #151515; margin-bottom: 16px; line-height: 1.5; }
            .message-box { background: #FFFFFF; border: 1px solid #151515; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; }
            .footer { margin-top: 24px; pt-4; border-top: 1px solid #EAE5DC; font-size: 11px; color: #A5A19B; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="badge">CHAPTER 05 // TRANSMISSION RECORD</div>
            <div class="header">
              <h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">New Portfolio Inquiry</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #55524E;">Origin: ${clientIp} &bull; Received: ${new Date().toISOString()}</p>
            </div>

            <div class="field-label">Sender Name</div>
            <div class="field-value">${safeName}</div>

            <div class="field-label">Contact Email</div>
            <div class="field-value"><a href="mailto:${safeEmail}" style="color: #E53935; text-decoration: none;">${safeEmail}</a></div>

            <div class="field-label">Inquiry Scope</div>
            <div class="field-value">${safeInquiry}</div>

            <div class="field-label">Message Payload</div>
            <div class="message-box">${safeMessage}</div>

            <div class="footer">
              YOGESH &bull; THE DEVELOPER'S STORY &bull; VOL. 01
            </div>
          </div>
        </body>
      </html>
    `;

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      text: `New Portfolio Inquiry from ${name} (${email})\nInquiry: ${inquiryType}\n\n${message}`,
      html: htmlContent,
    });

    if (sendResult.error) {
      console.error('Resend delivery failure error:', sendResult.error);
      return {
        status: 502,
        body: {
          success: false,
          error: 'DISPATCH_FAILED',
          message: 'Unable to deliver message through email service provider. Please reach out via direct mailto.',
          requiresMailtoFallback: true,
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: 'Your dispatch has been successfully recorded. Thank you for connecting.',
        timestamp: new Date().toISOString(),
      },
    };
  } catch (deliveryError) {
    console.error('Unexpected email dispatch exception:', deliveryError);
    return {
      status: 500,
      body: {
        success: false,
        error: 'INTERNAL_TRANSMISSION_ERROR',
        message: 'An unexpected transmission failure occurred. Please use direct mailto link.',
        requiresMailtoFallback: true,
      },
    };
  }
}

// Vercel Serverless Function entrypoint (Compatible with Node.js and Web APIs)
export default async function handler(req: any, res?: any) {
  // If Web standard Request object (e.g. Edge runtime or Web API)
  if (req instanceof Request || (req && typeof req.json === 'function' && !res)) {
    const webReq = req as Request;
    const method = webReq.method || 'GET';

    // 1. Method check before parsing body
    if (method !== 'POST') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'METHOD_NOT_ALLOWED',
          message: 'Only HTTP POST requests are supported.',
        }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const clientIp = getClientIp(webReq);
    let body: ContactPayload = {};
    let contentLength = 0;

    try {
      const text = await webReq.text();
      contentLength = Buffer.byteLength(text, 'utf8');
      body = text ? JSON.parse(text) : {};
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'INVALID_JSON',
          message: 'Request body must be valid JSON.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await processContactRequest(
      method,
      clientIp,
      contentLength,
      body
    );

    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Node.js HTTP Serverless runtime (Standard Vercel Node Serverless Function)
  const nodeReq = req as IncomingMessage & { body?: any };
  const nodeRes = res as ServerResponse & {
    status: (code: number) => any;
    json: (data: any) => void;
    setHeader: (name: string, value: string) => void;
  };

  const method = nodeReq.method || 'GET';

  // 1. Method check before reading body
  if (method !== 'POST') {
    return nodeRes.status(405).json({
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Only HTTP POST requests are supported.',
    });
  }

  const clientIp = getClientIp(nodeReq);
  const rawContentLength = Number(nodeReq.headers['content-length'] || 0);

  // If body is already parsed by Vercel middleware:
  let body: ContactPayload = {};
  if (nodeReq.body) {
    body = typeof nodeReq.body === 'string' ? JSON.parse(nodeReq.body) : nodeReq.body;
  } else {
    // Read raw body chunks
    try {
      const buffers: Buffer[] = [];
      for await (const chunk of nodeReq) {
        buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const rawText = Buffer.concat(buffers).toString('utf8');
      body = rawText ? JSON.parse(rawText) : {};
    } catch {
      return nodeRes.status(400).json({
        success: false,
        error: 'INVALID_JSON',
        message: 'Request body must be valid JSON.',
      });
    }
  }

  const result = await processContactRequest(
    method,
    clientIp,
    rawContentLength || JSON.stringify(body).length,
    body
  );

  return nodeRes.status(result.status).json(result.body);
}

// Named export for Web Fetch API runtime compatibility
export async function POST(request: Request): Promise<Response> {
  const clientIp = getClientIp(request);
  let body: ContactPayload = {};
  let contentLength = 0;

  try {
    const text = await request.text();
    contentLength = Buffer.byteLength(text, 'utf8');
    body = text ? JSON.parse(text) : {};
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_JSON',
        message: 'Request body must be valid JSON.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const result = await processContactRequest(
    'POST',
    clientIp,
    contentLength,
    body
  );

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
