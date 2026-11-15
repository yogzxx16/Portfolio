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
            className="fixed inset-0 bg-[#090A0E]/85 backdrop-blur-xs"
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
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#090A0E] text-[#F4F2ED] border-2 border-[#23252C] shadow-noir-lg flex flex-col overflow-hidden focus:outline-none"
          >
            <HalftoneOverlay density="fine" opacity="very-subtle" />

            {/* Modal Top Header Bar */}
            <div className="p-4 sm:p-5 border-b-2 border-[#23252C] bg-[#14151B] flex items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#D71936] px-2 py-0.5 bg-[#D71936]/10 border border-[#D71936]">
                  {project.chapterIndex}
                </span>
                <span className="font-mono text-xs text-[#9DA6B8] uppercase hidden sm:inline">
                  PROJECT DOSSIER // 詳細仕様書
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="p-1.5 border border-[#23252C] bg-[#14151B] text-[#F4F2ED] hover:bg-[#D71936] hover:border-[#D71936] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D71936] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 z-10">
              {/* Title & Maturity Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-[#23252C]">
                <div>
                  <h2
                    id="modal-project-title"
                    className="font-display text-4xl sm:text-5xl text-[#F4F2ED] uppercase tracking-wide"
                  >
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-[#9DA6B8] mt-1 font-semibold">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <TechBadge
                    name={project.maturity}
                    variant={project.liveUrl ? 'accent' : 'noir'}
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
                <div className="p-4 bg-[#14151B] border-l-4 border-[#D71936] border-y border-r border-[#23252C]">
                  <div className="flex items-center gap-2 text-[#D71936] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>DOCUMENTED PROBLEM CONTEXT</span>
                  </div>
                  <p className="text-sm text-[#F4F2ED] font-sans leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Summary Description */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#9DA6B8] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-[#D71936]" />
                  <span>OVERVIEW & ARCHITECTURE</span>
                </h4>
                <p className="font-sans text-base text-[#F4F2ED] leading-relaxed">
                  {project.summary}
                </p>
                {project.technicalNotes && (
                  <p className="font-mono text-xs text-[#9DA6B8] mt-3 p-3 bg-[#14151B] border border-[#23252C]">
                    <span className="font-bold text-[#F4F2ED]">TECHNICAL IMPLEMENTATION: </span>
                    {project.technicalNotes}
                  </p>
                )}
              </div>

              {/* Documented Features Checklist */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#9DA6B8] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D71936]" />
                  <span>DOCUMENTED CAPABILITIES ({project.keyFeatures.length})</span>
                </h4>
                <div className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 bg-[#14151B] border border-[#23252C] text-xs text-[#F4F2ED]"
                    >
                      <span className="font-mono text-[#D71936] font-bold shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="font-sans leading-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tech Stack Tags */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#9DA6B8] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#D71936]" />
                  <span>VERIFIED TECH STACK</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} name={tech} variant="noir" size="md" />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions Bar */}
            <div className="p-4 sm:p-5 border-t-2 border-[#23252C] bg-[#14151B] flex flex-wrap items-center justify-between gap-3 z-10 shrink-0">
              <div className="font-mono text-xs text-[#9DA6B8]">
                <span>REPOSITORY & DEPLOYMENT CONTRACT</span>
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <InkButton
                    variant="primary"
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
                    variant="secondary"
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
