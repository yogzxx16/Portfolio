import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env / .env.local into process.env for local development
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RESEND_API_KEY && !process.env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  }
  if (env.CONTACT_TO_EMAIL && !process.env.CONTACT_TO_EMAIL) {
    process.env.CONTACT_TO_EMAIL = env.CONTACT_TO_EMAIL;
  }
  if (env.CONTACT_FROM_EMAIL && !process.env.CONTACT_FROM_EMAIL) {
    process.env.CONTACT_FROM_EMAIL = env.CONTACT_FROM_EMAIL;
  }
  if (env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_URL) {
    process.env.UPSTASH_REDIS_REST_URL = env.UPSTASH_REDIS_REST_URL;
  }
  if (env.UPSTASH_REDIS_REST_TOKEN && !process.env.UPSTASH_REDIS_REST_TOKEN) {
    process.env.UPSTASH_REDIS_REST_TOKEN = env.UPSTASH_REDIS_REST_TOKEN;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vite-api-contact-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' || req.url?.startsWith('/api/contact?')) {
              try {
                // Dynamically execute the Vercel serverless function in Vite dev mode
                const mod = await server.ssrLoadModule('/api/contact.ts');
                const handler = mod.default;
                if (typeof handler === 'function') {
                  await handler(req, res);
                  return;
                }
              } catch (err) {
                console.error('[Vite Dev Server API Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'DEV_SERVER_ERROR',
                    message: 'Vite dev server encountered an error processing /api/contact.',
                  })
                );
                return;
              }
            }
            next();
          });
        },
      },
    ],
  };
});
