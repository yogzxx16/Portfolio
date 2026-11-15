import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CHAPTERS_DATA } from '../../data/chapters';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapterId?: string;
  onNavigate?: (chapterId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeChapterId = 'prologue',
  onNavigate,
}) => {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (_e: React.MouseEvent<HTMLAnchorElement>, chapterId: string) => {
    if (onNavigate) {
      onNavigate(chapterId);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#151515]/60 backdrop-blur-xs z-50 md:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF8F5] border-l-2 border-[#151515] shadow-2xl z-50 flex flex-col justify-between p-6 md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#151515] mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[#E53935] font-bold tracking-widest uppercase block">
                    MANGA VOLUME NAVIGATOR
                  </span>
                  <span className="font-display text-xl text-[#151515] tracking-wide">
                    VOL. 01 / ED. 2026
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 border border-[#151515] bg-[#F4F0E8] text-[#151515] hover:bg-[#E53935] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapters List */}
              <nav className="space-y-2">
                <span className="font-mono text-[10px] text-[#A5A19B] uppercase tracking-wider block mb-2">
                  TABLE OF CONTENTS
                </span>
                {CHAPTERS_DATA.map((chapter) => {
                  const isActive = activeChapterId === chapter.id;
                  return (
                    <a
                      key={chapter.id}
                      href={`#${chapter.id}`}
                      onClick={(e) => handleItemClick(e, chapter.id)}
                      className={`flex items-center justify-between p-3 border transition-all ${
                        isActive
                          ? 'bg-[#151515] text-[#F4F0E8] border-[#151515] shadow-manga-red'
                          : 'bg-[#FAF8F5] text-[#151515] border-[#151515]/30 hover:border-[#151515] hover:bg-[#EAE5DC]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? 'text-[#E53935]' : 'text-[#151515]'
                          }`}
                        >
                          CH.{chapter.number}
                        </span>
                        <span className="font-display text-lg tracking-wide">
                          {chapter.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs opacity-70">
                          {chapter.kanji}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Seal & Metadata */}
            <div className="mt-8 pt-4 border-t border-[#151515]/20 flex items-center justify-between font-mono text-[11px] text-[#55524E]">
              <div>
                <span className="font-bold block text-[#151515]">YOGESHKUMAR S</span>
                <span>MERN & AI Developer</span>
              </div>
              <div className="w-8 h-8 border border-[#E53935] text-[#E53935] font-display flex items-center justify-center font-bold">
                印
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
