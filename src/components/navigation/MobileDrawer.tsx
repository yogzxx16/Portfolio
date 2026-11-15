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
            className="fixed inset-0 bg-[#090A0E]/85 backdrop-blur-sm z-50 md:hidden"
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
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#090A0E] text-[#F4F2ED] border-l-2 border-[#23252C] shadow-noir-lg z-50 flex flex-col justify-between p-6 md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#23252C] mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[#D71936] font-bold tracking-widest uppercase block">
                    MANGA NOIR NAVIGATOR
                  </span>
                  <span className="font-display text-xl text-[#F4F2ED] tracking-wide">
                    VOL. 01 / ED. 2026
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 border border-[#23252C] bg-[#14151B] text-[#F4F2ED] hover:bg-[#D71936] hover:border-[#D71936] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D71936]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapters List */}
              <nav className="space-y-2">
                <span className="font-mono text-[10px] text-[#747C8B] uppercase tracking-wider block mb-2">
                  TABLE OF CONTENTS // 目次
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
                          ? 'bg-[#14151B] text-[#F4F2ED] border-[#D71936] shadow-crimson'
                          : 'bg-[#090A0E] text-[#747C8B] border-[#23252C] hover:border-[#F4F2ED] hover:text-[#F4F2ED]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? 'text-[#D71936]' : 'text-[#747C8B]'
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
            <div className="mt-8 pt-4 border-t border-[#23252C] flex items-center justify-between font-mono text-[11px] text-[#747C8B]">
              <div>
                <span className="font-bold block text-[#F4F2ED]">YOGESHKUMAR S</span>
                <span>Full-Stack MERN &bull; AI Apps</span>
              </div>
              <div className="w-8 h-8 border border-[#D71936] text-[#D71936] font-display flex items-center justify-center font-bold">
                印
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
