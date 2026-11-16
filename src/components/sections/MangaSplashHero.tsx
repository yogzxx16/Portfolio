import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import HeroLuffyHalftone from '../illustrations/HeroLuffyHalftone';
import { HankoStamp } from '../common/HankoStamp';
import TechText from '../react-bits/TechText';
import { Code2, ChevronDown, Send } from 'lucide-react';

export interface MangaSplashHeroProps {
  onExploreClick?: (e?: React.MouseEvent) => void;
  onConnectClick?: (e?: React.MouseEvent) => void;
}

export const MangaSplashHero: React.FC<MangaSplashHeroProps> = ({
  onExploreClick,
  onConnectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax effect on desktop cursor move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick(e);
      return;
    }
    const nextSection = document.getElementById('manga-story') || document.getElementById('person');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onConnectClick) {
      onConnectClick(e);
      return;
    }
    const connectSection = document.getElementById('next-chapter');
    if (connectSection) {
      connectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="prologue"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-screen lg:min-h-0 border-b-2 border-[#23252C] bg-transparent text-[#F4F2ED] overflow-hidden flex flex-col justify-between pt-3 sm:pt-4 pb-4 sm:pb-6"
    >
      {/* 1. Screentone & Speedline Ambient Backdrop */}
      <div className="absolute inset-0 bg-screentone-dark opacity-50 pointer-events-none" />
      <div className="absolute inset-0 speedlines-radial opacity-20 pointer-events-none" />

      {/* 2. Original Manga Illustration Background Layer with Subtle Parallax */}
      <motion.div
        animate={{
          x: mousePos.x * 20,
          y: mousePos.y * 15,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-55 flex items-center justify-end overflow-hidden"
      >
        <div className="relative w-full lg:w-[65%] h-full max-h-[960px] translate-x-12 sm:translate-x-0">
          <img
            src="/art/one-piece-bg.jpg"
            alt="One Piece Straw Hat Crew Scene"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 filter"
          />
          {/* Edge Feathering Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-transparent to-[#090A0E]/75" />
        </div>
      </motion.div>


      {/* 4. Main Two-Column Splash Spread */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Manga Noir Typography & Scaled Action Stack (6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Chapter Indicator */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#D71936] font-bold tracking-widest uppercase">
                PROLOGUE
              </span>
              <div className="h-px bg-[#23252C] flex-1 max-w-[140px]" />
              <span className="font-mono text-[10px] text-[#747C8B]">始動</span>
            </div>

            {/* Massive Display Title with Animated React Bits TechText */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="overflow-visible select-none w-full max-w-[850px] h-[90px] sm:h-[110px] lg:h-[130px]">
                  <TechText
                    fontFamily="'Space Grotesk', sans-serif"
                    accentColor="#D71936"
                    align="left"
                    clickKick={true}
                    color="#F4F2ED"
                    dashGap={2}
                    dashLength={4}
                    fontSize={68}
                    fontWeight={800}
                    letterSpacing={0.04}
                    guides={false}
                    intro="none"
                    reveal="letter"
                    specks={15}
                    text="YOGESHKUMAR S"
                    className="w-full h-full"
                  />
                </div>

                {/* Manga SFX Sound Effect Badge */}
                <div className="self-start sm:self-center px-2 py-0.5 bg-[#D71936] text-white font-mono text-xs font-bold -rotate-6 shadow-manga-crimson">
                  ドッドッ (FOCUS)
                </div>
              </div>

              {/* Crimson Accent Rule */}
              <div
                aria-hidden="true"
                className="mt-2 h-1.5 w-36 sm:w-48 bg-[#D71936] shadow-crimson"
              />
            </div>

            {/* Manga Speech Bubble Directive */}
            <div className="manga-speech-bubble p-5 sm:p-6 text-[#090A0E] max-w-xl shadow-noir space-y-3 font-sans text-xs sm:text-sm text-[#23252C] leading-relaxed">
              <div className="flex items-center justify-between mb-1">
                
                
              </div>
              <p className="font-semibold italic text-[#090A0E] text-sm sm:text-base ">
                Every great creation begins with an idea. Mine begins with curiosity... and a lot of code.
              </p>
              <p>
                Yo! I'm YOGESHKUMAR S. — an IT student, a builder, and an explorer in the ever-expanding world of technology.
              </p>
              <p>
                I don't like staying in one lane. From crafting web experiences and experimenting with AI to exploring new technologies, creative ideas, and everything in between — I'm always curious about what's possible.
              </p>
              <p>
                I'm a little bit of everything: a coder, an experimenter, a problem-solver, and a lifelong learner. I enjoy stepping into unfamiliar territories, picking up new skills, connecting different interests, and turning random ideas into something real.
              </p>
              <p className="font-bold text-[#090A0E] pt-0.5 tracking-wide">
                I am more of a person who is JACK OF MANY TRADES. MASTER OF MORE THAN ONE.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleScrollToNext}
                className="px-6 py-3.5 bg-[#D71936] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B5122B] transition-colors flex items-center gap-2 shadow-manga-crimson cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>INSPECT FEATURED WORK</span>
              </button>

              <button
                onClick={handleScrollToConnect}
                className="px-6 py-3.5 bg-[#14151B] border border-[#23252C] text-[#F4F2ED] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#D71936] hover:text-[#D71936] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>LET'S CONNECT</span>
              </button>

              {/* Japanese Red Seal */}
              <div className="ml-2 hidden sm:block">
                <HankoStamp label="開" size="md" />
              </div>
            </div>
          </div>

          {/* Right Column: Hero Luffy with Halftone Color Reveal & Thought Bubble (No Frame, No Rope, +20% Size) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative z-20 mt-8 lg:mt-0">
            <HeroLuffyHalftone className="w-full max-w-[600px] sm:max-w-[650px] lg:max-w-[700px] xl:max-w-[720px]" />
          </div>
        </div>
      </div>

      {/* 5. Bottom Navigation & Story Transition Prompt */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#23252C] pt-3 flex items-center justify-between font-mono text-xs text-[#747C8B]">
        <div className="flex items-center gap-3">
          <span className="text-[#D71936] font-bold">PROCEED:</span>
          <span>THE PERSON</span>
        </div>

        <button
          onClick={handleScrollToNext}
          className="flex items-center gap-1.5 text-[#F4F2ED] hover:text-[#D71936] transition-colors cursor-pointer"
        >
          <span className="text-[11px] uppercase tracking-wider">SCROLL TO ENTER MANGA STORY</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D71936]" />
        </button>
      </div>
    </section>
  );
};
