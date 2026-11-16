import React from 'react';
import Shuffle from '../react-bits/Shuffle';

export interface ChapterHeaderProps {
  number: string;
  title: string;
  kanji: string;
  subtitle?: string;
  theme?: 'dark' | 'paper';
  className?: string;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  number,
  title,
  kanji,
  subtitle,
  theme = 'dark',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full mb-8 md:mb-12 ${className}`}>
      {/* Top Metadata Line */}
      <div
        className={`flex items-center gap-3 mb-2 font-mono text-xs ${
          isDark ? 'text-[#9DA6B8]' : 'text-[#3A3F4A]'
        }`}
      >
        <span className="flex items-center gap-1.5 font-bold text-[#D71936]">
          <span className="inline-block w-2.5 h-2.5 bg-[#D71936]" />
          CHAPTER {number}
        </span>
        <span className={isDark ? 'text-[#747C8B]' : 'text-[#8C93A0]'}>/</span>
        <span className={`tracking-widest uppercase font-bold ${isDark ? 'text-[#F4F2ED]' : 'text-[#090A0E]'}`}>
          {kanji}
        </span>
        <div className={`flex-1 h-px ml-2 ${isDark ? 'bg-[#23252C]' : 'bg-[#090A0E]/20'}`} />
      </div>

      {/* Main Title & Stamp */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div
          className={`font-heading text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase ${
            isDark ? 'text-[#F4F2ED]' : 'text-[#090A0E]'
          }`}
        >
          <Shuffle
            accentColor="#D71936"
            color={isDark ? '#F4F2ED' : '#090A0E'}
            duration={0.4}
            effect="slide"
            shuffleDirection="right"
            text={title}
            triggerOnHover={true}
          />
        </div>
        <div className="px-2.5 py-1 border border-[#D71936] text-[#D71936] font-mono text-xs tracking-wider uppercase bg-[#D71936]/10 flex items-center gap-1.5">
          <span className="text-[10px] leading-none">●</span>
          <span>ARC {number}</span>
        </div>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p
          className={`mt-2.5 text-sm sm:text-base max-w-2xl font-sans leading-relaxed ${
            isDark ? 'text-[#9DA6B8]' : 'text-[#3A3F4A]'
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative Ink Border Rule */}
      <div className={`w-full h-1 mt-4 relative ${isDark ? 'bg-[#23252C]' : 'bg-[#090A0E]'}`}>
        <div className="absolute right-0 top-0 h-full w-12 bg-[#D71936]" />
      </div>
    </div>
  );
};
