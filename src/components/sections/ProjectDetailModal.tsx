import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Wrench, FileCode2 } from 'lucide-react';
import { ProjectRecord } from '../../types';
import { TechBadge } from '../common/TechBadge';
import { InkButton } from '../common/InkButton';
import { HankoStamp } from '../common/HankoStamp';
import { HalftoneOverlay } from '../common/HalftoneOverlay';

export interface ProjectDetailModalProps {
  project: ProjectRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#151515]/75 backdrop-blur-xs"
          />

          {/* Modal Panel Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] border-[3px] border-[#151515] shadow-2xl flex flex-col overflow-hidden focus:outline-none"
          >
            <HalftoneOverlay density="fine" opacity="very-subtle" />

            {/* Modal Top Header Bar */}
            <div className="p-4 sm:p-5 border-b-2 border-[#151515] bg-[#FAF8F5] flex items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#E53935] px-2 py-0.5 bg-[#E53935]/10 border border-[#E53935]">
                  {project.chapterIndex}
                </span>
                <span className="font-mono text-xs text-[#55524E] uppercase hidden sm:inline">
                  PROJECT DOSSIER // 詳細仕様書
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="p-1.5 border-2 border-[#151515] bg-[#FAF8F5] text-[#151515] hover:bg-[#E53935] hover:border-[#E53935] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 z-10">
              {/* Title & Maturity Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-[#151515]/20">
                <div>
                  <h2
                    id="modal-project-title"
                    className="font-display text-4xl sm:text-5xl text-[#151515] uppercase tracking-wide"
                  >
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-[#55524E] mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <TechBadge
                    name={project.maturity}
                    variant={project.liveUrl ? 'accent' : 'muted'}
                    size="md"
                  />
                  <HankoStamp
                    label="証"
                    subtext="VERIFIED"
                    shape="circle"
                    color="red"
                    size="sm"
                    angle={-4}
                  />
                </div>
              </div>

              {/* Documented Problem Solved */}
              {project.problemStatement && (
                <div className="p-4 bg-[#EAE5DC] border-2 border-[#151515]">
                  <div className="flex items-center gap-2 text-[#E53935] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>DOCUMENTED PROBLEM CONTEXT</span>
                  </div>
                  <p className="text-sm text-[#151515] font-sans leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Summary Description */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#A5A19B] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-[#151515]" />
                  <span>OVERVIEW & ARCHITECTURE</span>
                </h4>
                <p className="font-sans text-base text-[#151515] leading-relaxed">
                  {project.summary}
                </p>
                {project.technicalNotes && (
                  <p className="font-mono text-xs text-[#55524E] mt-3 p-3 bg-[#FAF8F5] border border-[#151515]/30">
                    <span className="font-bold text-[#151515]">TECHNICAL IMPLEMENTATION: </span>
                    {project.technicalNotes}
                  </p>
                )}
              </div>

              {/* Documented Features Checklist */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#A5A19B] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>DOCUMENTED CAPABILITIES ({project.keyFeatures.length})</span>
                </h4>
                <div className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 bg-[#FAF8F5] border border-[#151515]/20 text-xs text-[#151515]"
                    >
                      <span className="font-mono text-[#E53935] font-bold shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="font-sans leading-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tech Stack Tags */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#A5A19B] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#151515]" />
                  <span>VERIFIED TECH STACK</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} name={tech} variant="default" size="md" />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions Bar */}
            <div className="p-4 sm:p-5 border-t-2 border-[#151515] bg-[#EAE5DC] flex flex-wrap items-center justify-between gap-3 z-10 shrink-0">
              <div className="font-mono text-xs text-[#55524E]">
                <span>REPOSITORY & DEPLOYMENT CONTRACT</span>
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <InkButton
                    variant="accent"
                    size="md"
                    href={project.liveUrl}
                    target="_blank"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    LIVE DEMO
                  </InkButton>
                )}

                {project.githubUrl && (
                  <InkButton
                    variant="primary"
                    size="md"
                    href={project.githubUrl}
                    target="_blank"
                    icon={<Github className="w-4 h-4" />}
                  >
                    GITHUB REPO
                  </InkButton>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
