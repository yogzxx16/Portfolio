import React from 'react';
import { motion } from 'motion/react';
import HalftoneReveal from '../react-bits/HalftoneReveal';

export interface HeroLuffyHalftoneProps {
  className?: string;
}

export const HeroLuffyHalftone: React.FC<HeroLuffyHalftoneProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Subtle Ambient Crimson Halo behind character (blending with hero background) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(215, 25, 54, 0.75) 0%, rgba(9, 10, 14, 0) 70%)',
        }}
      />

      {/* ============================================================ */}
      {/* FLOATING MANGA THOUGHT BUBBLE ("Hi Broski...")               */}
      {/* Positioned upper-right of Luffy's head with dots pointing left*/}
      {/* ============================================================ */}
      <motion.div
        className="absolute -top-10 sm:-top-14 right-2 sm:right-6 lg:right-10 z-30 pointer-events-none"
        animate={{
          y: [-6, 6, -6],
          rotate: [1.5, -1.5, 1.5],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative">
          {/* Hand-Drawn Cloud Thought Bubble SVG */}
          <svg
            viewBox="0 0 170 115"
            className="w-[140px] sm:w-[170px] h-auto drop-shadow-[4px_6px_0px_rgba(9,10,14,0.95)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mirrored Cloud Lobes Body */}
            <g transform="translate(170, 0) scale(-1, 1)">
              <path
                d="M 32,58 
                   C 16,56 12,38 24,26 
                   C 32,14 50,14 58,20 
                   C 68,8 90,8 100,18 
                   C 112,8 132,12 138,24 
                   C 152,24 160,38 154,52 
                   C 164,66 156,82 142,86 
                   C 134,96 116,98 106,90 
                   C 94,98 76,98 66,90 
                   C 54,98 36,94 30,82 
                   C 16,80 18,66 32,58 Z"
                fill="#F4F2ED"
                stroke="#090A0E"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </g>

            {/* Connecting Thought Circles leading down-left toward Luffy's Straw Hat */}
            {/* Circle 1 (Medium) */}
            <circle
              cx="42"
              cy="98"
              r="6.5"
              fill="#F4F2ED"
              stroke="#090A0E"
              strokeWidth="2.5"
            />
            {/* Circle 2 (Small) */}
            <circle
              cx="30"
              cy="108"
              r="4.5"
              fill="#F4F2ED"
              stroke="#090A0E"
              strokeWidth="2"
            />
            {/* Circle 3 (Tiny) */}
            <circle
              cx="20"
              cy="116"
              r="3"
              fill="#F4F2ED"
              stroke="#090A0E"
              strokeWidth="1.8"
            />
          </svg>

          {/* Thought Bubble Text: "Hi Broski..." */}
          <div className="absolute inset-0 flex items-center justify-center pb-5 pl-2">
            <span
              className="text-[#090A0E] text-base sm:text-lg lg:text-xl font-black tracking-wider uppercase select-none"
              style={{
                fontFamily: "'Bangers', 'Oswald', system-ui, sans-serif",
                letterSpacing: '0.05em',
              }}
            >
              Hi Broski...
            </span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* LUFFY CHARACTER CANVAS (NO FRAME, NO CARD, NO ROPE)          */}
      {/* Black & White Halftone Dot Print -> Reveals Color on Hover   */}
      {/* ============================================================ */}
      <div
        className="relative w-full aspect-[4/3] flex items-center justify-center z-10 touch-pan-y"
        style={{ touchAction: 'pan-y' }}
      >
        <HalftoneReveal
          src="/art/manga/luffy-character.png"
          fallbackSrc="/art/luffy-hero-transparent.png"
          alt="Luffy Manga Character"
          fit="contain"
          mode="mono"
          shape="dot"
          cellSize={4}
          inkColor="#F4F2ED"
          paperColor="#090A0E"
          contrast={1.2}
          revealRadius={150}
          softness={0.65}
          linger={0.8}
          reverse={false}
          wander={false}
          clickBurst={true}
          intro={true}
          className="w-full h-full cursor-crosshair touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        />
      </div>
    </div>
  );
};

export default HeroLuffyHalftone;
