import React from 'react';

const PHRASE_SEGMENTS = [
  'A PORTFOLIO IN MANGA FORM',
  'CODE, CURIOSITY & A LITTLE CHAOS',
  'EVERY SCROLL TURNS A PAGE',
];

interface MarqueeUnitProps {
  repeatCount?: number;
}

const MarqueeUnit: React.FC<MarqueeUnitProps> = ({ repeatCount = 4 }) => {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: repeatCount }).map((_, rIdx) => (
        <React.Fragment key={rIdx}>
          {PHRASE_SEGMENTS.map((segment, sIdx) => (
            <span key={sIdx} className="inline-flex items-center">
              <span className="font-mono text-[10px] sm:text-[11px] md:text-xs font-bold tracking-wider sm:tracking-widest text-[#F4F2ED] uppercase whitespace-nowrap">
                {segment}
              </span>
              <span
                aria-hidden="true"
                className="mx-2.5 sm:mx-3.5 md:mx-5 text-[#D71936] text-[10px] sm:text-xs select-none inline-block drop-shadow-[0_0_6px_rgba(215,25,54,0.6)]"
              >
                ✦
              </span>
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const TopMarqueeTicker: React.FC = () => {
  return (
    <aside
      aria-label="Manga Noir Portfolio Ticker"
      className="group sticky top-0 left-0 right-0 z-40 w-full bg-[#090A0E]/95 backdrop-blur-md border-b border-[#23252C] py-1 sm:py-1.5 overflow-hidden select-none shadow-[0_2px_10px_rgba(0,0,0,0.5)] touch-pan-y"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Subtle Ambient Red Glow along the top edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D71936]/40 to-transparent pointer-events-none"
      />

      {/* Marquee Track Container: Pauses on hover, disables on prefers-reduced-motion */}
      <div className="flex w-max motion-reduce:transform-none motion-reduce:overflow-x-auto">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <MarqueeUnit repeatCount={4} />
        </div>
        {/* Track 2 (Seamless Duplicate) */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          <MarqueeUnit repeatCount={4} />
        </div>
      </div>
    </aside>
  );
};

export default TopMarqueeTicker;
