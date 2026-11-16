import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface MangaEntranceOverlayProps {
  onComplete?: () => void;
}

export const MangaEntranceOverlay: React.FC<MangaEntranceOverlayProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Auto-dismiss after 1.4s
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setIsVisible(false);
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setIsVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="manga-entrance"
          onClick={handleDismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center cursor-pointer overflow-hidden bg-[#090A0E]"
          aria-label="Click or press Escape to skip intro"
        >
          {/* Top Ink Shutter */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-105%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#090A0E] border-b-4 border-[#D71936] z-10 flex items-end justify-center pb-4"
          >
            <div className="font-mono text-xs text-[#747C8B] tracking-widest uppercase">
              週刊少年・開発者物語 // SEINEN MANGA ARCHIVE
            </div>
          </motion.div>

          {/* Bottom Ink Shutter */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '105%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#090A0E] border-t-4 border-[#D71936] z-10 flex items-start justify-center pt-4"
          >
            <div className="font-mono text-xs text-[#747C8B] tracking-widest uppercase">
              ACT 00 // PROLOGUE • 2026 EDITION
            </div>
          </motion.div>

          {/* Central Impact Seal & Dramatic Text */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-20 text-center px-4"
          >
            {/* Japanese Hanko Impact */}
            <motion.div
              initial={{ rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 mx-auto mb-4 border-4 border-[#D71936] bg-[#D71936] text-white flex items-center justify-center font-display text-4xl shadow-crimson"
            >
              開
            </motion.div>

            <h1 className="font-display text-5xl sm:text-7xl text-[#F4F2ED] tracking-wider uppercase mb-1">
              YOGESH<span className="text-[#D71936]">.</span>
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#D71936] font-bold tracking-widest uppercase mb-4">
              THE DEVELOPER'S STORY — VOL. 01
            </p>

            <div className="inline-block px-3 py-1 bg-[#14151B] border border-[#23252C] font-mono text-[10px] text-[#747C8B]">
              CLICK ANYWHERE OR PRESS ESC TO ENTER
            </div>
          </motion.div>

          {/* Dynamic Speedline Accents */}
          <div className="absolute inset-0 speedlines-radial opacity-30 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
