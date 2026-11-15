import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { MangaBook3D } from '../3d/MangaBook3D';
import { HankoStamp } from '../common/HankoStamp';
import { Code2, ChevronDown, Sparkles, Send } from 'lucide-react';

export interface NoirHeroProps {
  onExploreClick?: (e?: React.MouseEvent) => void;
  onConnectClick?: (e?: React.MouseEvent) => void;
}

export const NoirHero: React.FC<NoirHeroProps> = ({
  onExploreClick,
  onConnectClick,
}) => {

  const handleScrollTo = (targetId: string, customHandler?: (e?: React.MouseEvent) => void) => {
    return (e: React.MouseEvent) => {
      if (customHandler) {
        customHandler(e);
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
  };

  return (
    <section
      id="prologue"
      className="relative min-h-[85vh] lg:min-h-0 lg:h-[880px] max-h-[920px] flex flex-col justify-between pt-4 sm:pt-6 pb-8 sm:pb-12 overflow-hidden bg-[#090A0E] text-[#F4F2ED] border-b-2 border-[#23252C]"
    >
      {/* Background Screentone Dot Matrix & Radial Speedlines */}
      <div className="absolute inset-0 bg-screentone-dark opacity-60 pointer-events-none" />
      <div className="absolute inset-0 speedlines-radial opacity-30 pointer-events-none" />

      {/* Subtle Crimson Ambient Core behind 3D Book */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(215, 25, 54, 0.8) 0%, rgba(9, 10, 14, 0) 70%)',
        }}
      />

      {/* Top Editorial Issue Ribbon */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 relative z-10">
        <div className="border-b-2 border-[#23252C] pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#747C8B]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#D71936] text-white font-bold tracking-widest text-[10px]">
              VOL. 01
            </span>
            <span className="font-bold text-[#F4F2ED] uppercase tracking-wider text-[11px] sm:text-xs">
              MANGA NOIR // THE DEVELOPER'S STORY
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline">CHENNAI, IN (IST)</span>
            <span className="text-[#23252C]">|</span>
            <span className="font-bold text-[#F4F2ED]">SERIALIZED VOLUME</span>
            <span className="text-[#23252C]">|</span>
            <span>2026 EDITION</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Grid */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Manga Noir Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Japanese Chapter Banner */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#D71936] font-bold tracking-widest uppercase">
                序章 // CHAPTER 00 — PROLOGUE
              </span>
              <div className="h-px bg-[#23252C] flex-1 max-w-[140px]" />
            </div>

            {/* Massive Display Title */}
            <div className="relative">
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl tracking-tight leading-[0.85] text-[#F4F2ED] uppercase select-none">
                YOGESH
                <span className="text-[#D71936] inline-block animate-pulse">.</span>
              </h1>
              {/* Crimson Accent Rule */}
              <div
                aria-hidden="true"
                className="mt-2 h-1.5 w-36 sm:w-44 bg-[#D71936] shadow-crimson"
              />
            </div>

            {/* Professional Positioning Stack */}
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#F4F2ED] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 bg-[#D71936]" />
                <span>B.Tech IT Student</span>
                <span className="text-[#747C8B]">/</span>
                <span>Full-Stack MERN Developer</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#D71936] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Building AI-Powered Web Applications</span>
              </div>
            </div>

            {/* Narrative Speech Frame */}
            <div className="relative p-5 sm:p-6 border-2 border-[#23252C] bg-[#14151B] shadow-noir-lg max-w-xl">
              <div className="font-mono text-[10px] text-[#747C8B] tracking-widest uppercase mb-1.5 flex items-center justify-between border-b border-[#23252C] pb-1">
                <span>EDITORIAL DIRECTIVE</span>
                <span className="text-[#D71936] font-bold">ACT. 00</span>
              </div>
              <p className="font-sans text-lg sm:text-xl text-[#F4F2ED] font-semibold leading-relaxed italic">
                "{PROFILE_DATA.tagline}"
              </p>
              <p className="font-mono text-xs text-[#747C8B] mt-2.5 leading-relaxed">
                {PROFILE_DATA.introduction}
              </p>
            </div>

            {/* Action Buttons Row & Hanko Stamp */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Crimson CTA */}
              <a
                href="#skillswap-prototype"
                onClick={handleScrollTo('skillswap-prototype', onExploreClick)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D71936] text-white font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#D71936] shadow-noir hover:bg-[#A81229] hover:border-[#A81229] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D71936]"
              >
                <Code2 className="w-4 h-4" />
                <span>INSPECT FEATURED WORK</span>
              </a>

              {/* Secondary Steel CTA */}
              <a
                href="#next-chapter"
                onClick={handleScrollTo('next-chapter', onConnectClick)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#14151B] text-[#F4F2ED] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#23252C] shadow-noir hover:bg-[#23252C] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D71936]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>LET'S CONNECT</span>
              </a>

              {/* Hanko Stamp */}
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
            </div>
          </div>

          {/* Right Column: Original 3D Manga Volume Centerpiece (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* 3D Canvas Centerpiece */}
            <MangaBook3D />

            {/* 3D Instruction Subtitle */}
            <p className="font-mono text-[10px] text-[#747C8B] mt-4 tracking-widest uppercase text-center">
              INTERACTIVE 3D TANKŌBON // TILT & CLICK TO INSPECT
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <a
          href="#skillswap-prototype"
          onClick={handleScrollTo('skillswap-prototype')}
          className="group inline-flex items-center gap-2 font-mono text-xs text-[#747C8B] hover:text-[#F4F2ED] transition-colors focus:outline-none"
          aria-label="Scroll to SkillSwap 3D prototype showcase"
        >
          <span className="font-bold tracking-widest uppercase">PROCEED TO PROJECT SHOWCASE</span>
          <span className="text-[10px] text-[#D71936] font-bold">*SCROLL*</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="p-1 border border-[#23252C] bg-[#14151B] group-hover:border-[#D71936]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#F4F2ED]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
