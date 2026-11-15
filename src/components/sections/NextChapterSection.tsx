import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { InkButton } from '../common/InkButton';
import { HankoStamp } from '../common/HankoStamp';
import { HalftoneOverlay } from '../common/HalftoneOverlay';
import {
  Mail,
  Github,
  Linkedin,
  FileText,
  Send,
  AlertCircle,
  Copy,
  Check,
  ArrowUp,
  MapPin,
  Clock,
} from 'lucide-react';

const INQUIRY_OPTIONS = [
  'Project Collaboration',
  'Internship / Full-time Opportunity',
  'Freelance / Contract',
  'General Inquiry',
];

interface FormState {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  hp_company: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

export const NextChapterSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    inquiryType: 'Project Collaboration',
    message: '',
    hp_company: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [requiresFallback, setRequiresFallback] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (min 2 characters).';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be under 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.inquiryType || !INQUIRY_OPTIONS.includes(formData.inquiryType)) {
      newErrors.inquiryType = 'Please select a valid inquiry type.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    } else if (formData.message.trim().length > 3000) {
      newErrors.message = 'Message must be under 3,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');
    setRequiresFallback(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setSubmissionStatus('success');
        setStatusMessage(result.message || 'Dispatch successfully transmitted.');
        setFormData({
          name: '',
          email: '',
          inquiryType: 'Project Collaboration',
          message: '',
          hp_company: '',
        });
      } else {
        setSubmissionStatus('error');
        setStatusMessage(
          result.message ||
            'Unable to transmit message through serverless gateway. Please connect directly via email.'
        );
        if (result.requiresMailtoFallback || response.status === 503 || response.status === 404) {
          setRequiresFallback(true);
        }
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage(
        'Network transmission error encountered. Please use direct mailto communication below.'
      );
      setRequiresFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const fallbackMailtoHref = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${formData.inquiryType || 'Collaboration'} from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(formData.message || 'Hello Yogesh,\n\n')}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="next-chapter" className="relative pt-16 sm:pt-24 border-b-2 border-[#151515]">
      <HalftoneOverlay density="coarse" opacity="very-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {/* Chapter Header */}
        <ChapterHeader
          number="05"
          title="NEXT CHAPTER"
          kanji="終章"
          subtitle="Every great project starts with a conversation. Let's discuss ideas, opportunities, and digital collaborations."
        />

        {/* 12-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Editorial Narrative & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <MangaPanel variant="wash" tag="COMMUNICATION HUB" notch="none" className="p-6 sm:p-8">
              <span className="font-mono text-xs text-[#E53935] font-bold tracking-widest uppercase block mb-1">
                CONTACT DIRECTIVE
              </span>

              <h3 className="font-display text-3xl sm:text-4xl text-[#151515] uppercase tracking-wide leading-tight mb-4">
                Every great project starts with a conversation.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#151515] leading-relaxed mb-6">
                Whether you have an upcoming project, full-stack opening, open-source initiative, or hackathon collaboration, my inbox is always open.
              </p>

              {/* Direct Info List */}
              <div className="space-y-3 pt-2 border-t border-[#151515]/20 font-mono text-xs">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#151515]">
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <Mail className="w-4 h-4 text-[#E53935] shrink-0" />
                    <span className="text-[#151515] font-bold truncate">{PROFILE_DATA.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 hover:bg-[#EAE5DC] border border-transparent hover:border-[#151515] transition-colors shrink-0"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-[#E53935]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#55524E]" />
                    )}
                  </button>
                </div>

                {/* Location & Timezone */}
                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#151515]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E53935] shrink-0" />
                    <span>{PROFILE_DATA.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#55524E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>IST (UTC+5:30)</span>
                  </div>
                </div>

                {/* GitHub Channel */}
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#151515] hover:bg-[#151515] hover:text-[#FAF8F5] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#E53935] group-hover:text-white" />
                    <span className="font-bold">GITHUB PROFILE</span>
                  </div>
                  <span className="text-[#A5A19B] group-hover:text-white text-[11px]">
                    github.com/yogzxx16
                  </span>
                </a>

                {/* Verified LinkedIn Channel (rendered only when verified URL exists) */}
                {PROFILE_DATA.linkedinUrl && (
                  <a
                    href={PROFILE_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#151515] hover:bg-[#151515] hover:text-[#FAF8F5] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#E53935] group-hover:text-white" />
                      <span className="font-bold">LINKEDIN NETWORK</span>
                    </div>
                    <span className="text-[#A5A19B] group-hover:text-white text-[11px]">
                      VERIFIED PROFILE
                    </span>
                  </a>
                )}

                {/* Resume Download (rendered only when verified sanitized PDF URL exists) */}
                {PROFILE_DATA.resumeUrl && (
                  <a
                    href={PROFILE_DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#151515] hover:bg-[#151515] hover:text-[#FAF8F5] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#E53935] group-hover:text-white" />
                      <span className="font-bold">DOWNLOAD RESUME</span>
                    </div>
                    <span className="text-[#A5A19B] group-hover:text-white text-[11px]">
                      VERIFIED PDF
                    </span>
                  </a>
                )}
              </div>

              {/* Status Seal */}
              <div className="mt-6 pt-4 border-t border-[#151515]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#151515]">
                  <span className="w-2 h-2 rounded-full bg-[#E53935] animate-ping" />
                  <span className="font-bold">ACTIVE FOR NEW VENTURES</span>
                </div>
                <HankoStamp
                  label="通"
                  subtext="CONTACT"
                  shape="circle"
                  color="red"
                  size="sm"
                  angle={5}
                />
              </div>
            </MangaPanel>
          </div>

          {/* RIGHT COLUMN: Interactive Contact Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <MangaPanel
              variant="default"
              tag="TRANSMISSION FORM // 通信窓口"
              notch="top-right"
              className="p-6 sm:p-8"
            >
              {submissionStatus === 'success' ? (
                /* Success State with Manga Hanko Stamp */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-5"
                >
                  <div className="flex justify-center">
                    <HankoStamp
                      label="完"
                      subtext="DELIVERED"
                      shape="circle"
                      color="red"
                      size="lg"
                      angle={-6}
                    />
                  </div>

                  <div>
                    <h4 className="font-display text-3xl sm:text-4xl text-[#151515] uppercase tracking-wide">
                      DISPATCH RECORDED // 送信完了
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#55524E] max-w-md mx-auto mt-2 leading-relaxed">
                      {statusMessage ||
                        'Thank you for reaching out. Your transmission has been queued and I will respond promptly.'}
                    </p>
                  </div>

                  <div className="pt-4">
                    <InkButton
                      variant="primary"
                      size="md"
                      onClick={() => setSubmissionStatus('idle')}
                    >
                      SEND ANOTHER MESSAGE
                    </InkButton>
                  </div>
                </motion.div>
              ) : (
                /* Active Form State */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field (hidden from human users, traps spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_company">Do not fill this field</label>
                    <input
                      type="text"
                      id="hp_company"
                      name="hp_company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.hp_company}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Error Notification Banner if failed */}
                  <AnimatePresence>
                    {submissionStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-[#FAF8F5] border-2 border-[#E53935] shadow-manga-red space-y-2"
                        role="alert"
                      >
                        <div className="flex items-center gap-2 text-[#E53935] font-mono text-xs font-bold uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>TRANSMISSION NOTICE</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#151515] font-sans">
                          {statusMessage}
                        </p>
                        {requiresFallback && (
                          <div className="pt-2">
                            <a
                              href={fallbackMailtoHref}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#151515] text-[#FAF8F5] font-mono text-xs font-bold hover:bg-[#E53935] transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>OPEN DIRECT MAILTO CLIENT</span>
                            </a>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs font-bold uppercase tracking-wider text-[#151515]"
                      >
                        YOUR NAME <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Kenji Sato"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF8F5] border-2 ${
                          errors.name ? 'border-[#E53935]' : 'border-[#151515]'
                        } font-sans text-sm text-[#151515] placeholder:text-[#A5A19B] focus:outline-none focus:ring-2 focus:ring-[#E53935] transition-all`}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="font-mono text-[11px] text-[#E53935]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs font-bold uppercase tracking-wider text-[#151515]"
                      >
                        YOUR EMAIL <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. you@company.com"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF8F5] border-2 ${
                          errors.email ? 'border-[#E53935]' : 'border-[#151515]'
                        } font-sans text-sm text-[#151515] placeholder:text-[#A5A19B] focus:outline-none focus:ring-2 focus:ring-[#E53935] transition-all`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="font-mono text-[11px] text-[#E53935]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiryType"
                      className="block font-mono text-xs font-bold uppercase tracking-wider text-[#151515]"
                    >
                      INQUIRY SCOPE <span className="text-[#E53935]">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      disabled={isSubmitting}
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border-2 border-[#151515] font-sans text-sm text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#E53935] transition-all cursor-pointer"
                    >
                      {INQUIRY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="font-mono text-[11px] text-[#E53935]">{errors.inquiryType}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="message"
                        className="block font-mono text-xs font-bold uppercase tracking-wider text-[#151515]"
                      >
                        MESSAGE PAYLOAD <span className="text-[#E53935]">*</span>
                      </label>
                      <span className="font-mono text-[10px] text-[#A5A19B]">
                        {formData.message.length} / 3000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share project goals, role requirements, technical ideas, or collaboration proposals..."
                      className={`w-full p-3.5 bg-[#FAF8F5] border-2 ${
                        errors.message ? 'border-[#E53935]' : 'border-[#151515]'
                      } font-sans text-sm text-[#151515] placeholder:text-[#A5A19B] focus:outline-none focus:ring-2 focus:ring-[#E53935] transition-all resize-y`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="font-mono text-[11px] text-[#E53935]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <InkButton
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      icon={
                        isSubmitting ? (
                          <span className="animate-spin text-sm">●</span>
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {isSubmitting ? 'TRANSMITTING DISPATCH...' : 'TRANSMIT DISPATCH'}
                    </InkButton>

                    <a
                      href={fallbackMailtoHref}
                      className="font-mono text-xs text-[#55524E] hover:text-[#E53935] hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Prefer direct mailto client? Click here</span>
                    </a>
                  </div>
                </form>
              )}
            </MangaPanel>
          </div>
        </div>
      </div>

      {/* COLOPHON & FOOTER */}
      <footer className="bg-[#151515] text-[#F4F0E8] border-t-2 border-[#151515] relative overflow-hidden">
        {/* Subtle halftone background in footer */}
        <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F4F0E8]/15 items-center justify-between">
            {/* Colophon Title & Positioning */}
            <div className="md:col-span-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[#E53935] text-white flex items-center justify-center font-display text-base font-bold">
                  Y
                </div>
                <span className="font-display text-3xl tracking-wider text-[#F4F0E8]">
                  YOGESH<span className="text-[#E53935]">.</span>
                </span>
                <span className="text-[#A5A19B]">|</span>
                <span className="font-mono text-xs text-[#A5A19B]">THE DEVELOPER'S STORY</span>
              </div>
              <p className="font-sans text-xs text-[#A5A19B] max-w-md leading-relaxed">
                A serialized, single-page manga-inspired editorial developer portfolio. Designed with authentic panel rhythms, bespoke technical vector artwork, and strict data accuracy.
              </p>
            </div>

            {/* Completion Seal & Back to Top */}
            <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-6">
              {/* Manga Completion Seal 完 */}
              <div className="flex items-center gap-3 p-2 bg-[#1f1f1f] border border-[#F4F0E8]/20">
                <HankoStamp
                  label="完"
                  subtext="COMPLETE"
                  shape="circle"
                  color="red"
                  size="md"
                  angle={-4}
                />
                <div className="font-mono text-xs">
                  <span className="text-[#F4F0E8] font-bold block">VOLUME 01</span>
                  <span className="text-[#A5A19B] text-[10px]">SERIES COMPLETED</span>
                </div>
              </div>

              {/* Scroll to Top */}
              <button
                type="button"
                onClick={scrollToTop}
                className="p-3 border border-[#F4F0E8]/20 bg-[#1f1f1f] text-[#F4F0E8] hover:bg-[#E53935] hover:border-[#E53935] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]"
                aria-label="Scroll to top of portfolio"
                title="Return to Prologue"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Colophon Meta Credits */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#A5A19B]">
            <div>
              <span>Art Directed & Engineered by </span>
              <strong className="text-[#F4F0E8]">Yogeshkumar S.</strong>
            </div>

            <div>
              <span>Built with React 19, TypeScript, Vite, Tailwind CSS v4 & Motion.</span>
            </div>

            <div>
              <span>&copy; 2026 YOGESHKUMAR S. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};