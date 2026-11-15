import React from 'react';
import { motion, type Variants } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { InkButton } from '../common/InkButton';
import { HankoStamp } from '../common/HankoStamp';
import { HalftoneOverlay } from '../common/HalftoneOverlay';
import { HeroMangaIllustration } from '../illustrations/HeroMangaIllustration';
import { Code2, Sparkles, ChevronDown } from 'lucide-react';

export interface PrologueHeroProps {
  onExploreClick?: (e?: React.MouseEvent) => void;
  onConnectClick?: (e?: React.MouseEvent) => void;
}

export const PrologueHero: React.FC<PrologueHeroProps> = ({
  onExploreClick,
  onConnectClick,
}) => {
  // Motion animation variants for clean staggered reveals
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleActionClick = (
    e: React.MouseEvent | undefined,
    targetId: string,
    customHandler?: (e?: React.MouseEvent) => void
  ) => {
    if (customHandler) {
      customHandler(e);
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (!targetElement && e) {
      // Sensible fallback until future chapters are fully mounted
      e.preventDefault();
      const previewElement = document.getElementById('pipeline-preview');
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="prologue"
      className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 overflow-hidden border-b-2 border-[#151515]"
    >
      {/* Subtle Screentone Texture across hero paper */}
      <HalftoneOverlay density="medium" opacity="very-subtle" />

      {/* Top Editorial Issue Ribbon */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="border-b-2 border-[#151515] pb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#55524E]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#E53935] text-white font-bold tracking-widest text-[10px]">
              CHAPTER 00
            </span>
            <span className="font-bold text-[#151515] uppercase tracking-wider">
              PROLOGUE // プロローグ
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline">CHENNAI, IN (IST)</span>
            <span className="text-[#A5A19B]">|</span>
            <span className="font-bold text-[#151515]">SERIALIZED PORTFOLIO</span>
            <span className="text-[#A5A19B]">|</span>
            <span>VOL. 01 / ED. 2026</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Manga Editorial Grid */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Bold Typography & Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Japanese Chapter Banner & Stamp */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#E53935] font-bold tracking-widest uppercase">
                第〇章 — THE DEVELOPER'S STORY
              </span>
              <div className="h-px bg-[#151515]/20 flex-1 max-w-[120px]" />
            </motion.div>

            {/* Massive Editorial Display Title */}
            <motion.div variants={itemVariants} className="relative">
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl tracking-tight leading-[0.88] text-[#151515] uppercase select-none">
                {PROFILE_DATA.displayTitle.replace('.', '')}
                <span className="text-[#E53935] inline-block animate-pulse">.</span>
              </h1>
              {/* Halftone Shadow Backdrop Accent */}
              <div
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 w-36 h-4 bg-halftone opacity-25 pointer-events-none"
              />
            </motion.div>

            {/* Professional Positioning Stack */}
            <motion.div variants={itemVariants} className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#151515] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 bg-[#151515]" />
                <span>B.Tech IT Student</span>
                <span className="text-[#A5A19B]">/</span>
                <span>Full-Stack MERN Developer</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#E53935] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Building AI-Powered Web Applications</span>
              </div>
            </motion.div>

            {/* Narrative Tagline in Manga Speech Frame */}
            <motion.div
              variants={itemVariants}
              className="relative p-4 sm:p-5 border-2 border-[#151515] bg-[#FAF8F5] shadow-manga max-w-xl"
            >
              <div className="font-mono text-[10px] text-[#A5A19B] tracking-widest uppercase mb-1 flex items-center justify-between">
                <span>EDITORIAL STATEMENT</span>
                <span className="text-[#E53935] font-bold">FOCUS</span>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#151515] font-medium leading-relaxed italic">
                "{PROFILE_DATA.tagline}"
              </p>
              <p className="font-mono text-xs text-[#55524E] mt-2 leading-normal">
                {PROFILE_DATA.introduction}
              </p>
            </motion.div>

            {/* Red ink rule accent beneath tagline */}
            <motion.div aria-hidden="true" variants={itemVariants} className="flex items-center gap-3 max-w-xl">
              <div className="h-[3px] w-10 bg-[#E53935]" />
              <div className="h-px flex-1 bg-[#151515]/20" />
              <span className="font-mono text-[9px] text-[#E53935] font-bold tracking-widest">DEVELOPER'S STORY</span>
            </motion.div>

            {/* Action CTAs & Stamp */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <InkButton
                variant="primary"
                size="lg"
                href="#creations"
                onClick={(e) => handleActionClick(e, 'creations', onExploreClick)}
                icon={<Code2 className="w-4 h-4" />}
              >
                EXPLORE MY WORK
              </InkButton>

              <InkButton
                variant="secondary"
                size="lg"
                href="#next-chapter"
                onClick={(e) => handleActionClick(e, 'next-chapter', onConnectClick)}
              >
                LET'S CONNECT
              </InkButton>

              <div className="ml-auto sm:ml-4 flex items-center gap-3">
                <HankoStamp
                  label="開"
                  subtext="OPEN"
                  shape="circle"
                  color="red"
                  size="sm"
                  angle={-6}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bespoke Vector Art Spread (6 cols — equal weight) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 flex justify-center"
          >
            <HeroMangaIllustration />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <a
          href="#person"
          className="group inline-flex items-center gap-2 font-mono text-xs text-[#55524E] hover:text-[#151515] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E53935]"
          aria-label="Scroll to Chapter 01: The Person"
        >
          <span className="font-bold tracking-widest uppercase">READ CHAPTER 01</span>
          <span className="text-[10px] text-[#E53935] font-bold">*SCROLL*</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="p-1 border border-[#151515] bg-[#FAF8F5] group-hover:bg-[#EAE5DC]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#151515]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
