import React from 'react';

export interface ChapterHeaderProps {
  number: string;
  title: string;
  kanji: string;
  subtitle?: string;
  className?: string;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  number,
  title,
  kanji,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`w-full mb-8 md:mb-12 ${className}`}>
      {/* Top Metadata Line */}
      <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#55524E]">
        <span className="flex items-center gap-1.5 font-bold text-[#E53935]">
          <span className="inline-block w-2 h-2 bg-[#E53935]" />
          CHAPTER {number}
        </span>
        <span className="text-[#A5A19B]">/</span>
        <span className="tracking-widest uppercase">{kanji}</span>
        <div className="flex-1 h-px bg-[#151515]/20 ml-2" />
      </div>

      {/* Main Title & Stamp */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#151515] tracking-wide uppercase">
          {title}
        </h2>
        <div className="px-2.5 py-1 border border-[#E53935] text-[#E53935] font-mono text-xs tracking-wider uppercase bg-[#E53935]/5 flex items-center gap-1.5">
          <span className="text-[10px] leading-none">●</span>
          <span>ARC {number}</span>
        </div>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[#55524E] max-w-2xl font-sans">
          {subtitle}
        </p>
      )}

      {/* Decorative Ink Border Rule */}
      <div className="w-full h-1 bg-[#151515] mt-4 relative">
        <div className="absolute right-0 top-0 h-full w-8 bg-[#E53935]" />
      </div>
    </div>
  );
};
