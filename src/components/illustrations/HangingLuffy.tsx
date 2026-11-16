import React from 'react';
import { motion } from 'motion/react';
import HalftoneReveal from '../react-bits/HalftoneReveal';

export interface HangingLuffyProps {
  className?: string;
}

export const HangingLuffy: React.FC<HangingLuffyProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-start select-none ${className}`}>
      {/* Ambient Crimson / Dark Glow behind Luffy */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-25 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(215, 25, 54, 0.7) 0%, rgba(9, 10, 14, 0) 70%)',
        }}
      />

      {/* ============================================================ */}
      {/* PENDULAR SWING ASSEMBLY (ROPE + SUSPENDED CHARACTER)         */}
      {/* ============================================================ */}
      <motion.div
        className="relative flex flex-col items-center z-10 w-full"
        style={{ transformOrigin: '50% -40px' }}
        animate={{
          rotate: [-1.8, 1.8, -1.8],
          x: [-3, 3, -3],
          y: [0, 3, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Top Suspension Rope Segment: Extends down from ceiling */}
        <div className="relative w-full flex justify-center -mb-6 z-20 pointer-events-none">
          <svg
            width="80"
            height="110"
            viewBox="0 0 80 110"
            className="overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Drop Shadow for Tactile Depth */}
              <filter id="ropeShadow" x="-50%" y="-20%" width="200%" height="150%">
                <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
              </filter>

              {/* Realistic Twisted Rope Pattern */}
              <pattern id="ropeBraid" width="14" height="20" patternUnits="userSpaceOnUse">
                {/* Dark Base */}
                <rect width="14" height="20" fill="#5A3A1A" />
                {/* Twisted Strands */}
                <path d="M0,2 Q7,7 14,12 L14,16 Q7,11 0,6 Z" fill="#C49A6C" />
                <path d="M0,8 Q7,13 14,18 L14,22 Q7,17 0,12 Z" fill="#DDBB88" />
                <path d="M0,14 Q7,19 14,24 L14,28 Q7,23 0,18 Z" fill="#A87B4C" />
                {/* Strand Separation Shadows */}
                <line x1="0" y1="2" x2="14" y2="12" stroke="#3A220F" strokeWidth="1.2" />
                <line x1="0" y1="8" x2="14" y2="18" stroke="#3A220F" strokeWidth="1.2" />
                <line x1="0" y1="14" x2="14" y2="24" stroke="#3A220F" strokeWidth="1.2" />
              </pattern>
            </defs>

            {/* Ceiling Anchor Knot */}
            <circle cx="40" cy="4" r="8" fill="#3A220F" filter="url(#ropeShadow)" />
            <circle cx="40" cy="4" r="6" fill="#C49A6C" stroke="#5A3A1A" strokeWidth="2" />

            {/* Main Hanging Rope Vertical Cord */}
            <rect
              x="34"
              y="4"
              width="12"
              height="80"
              rx="4"
              fill="url(#ropeBraid)"
              stroke="#3A220F"
              strokeWidth="1.5"
              filter="url(#ropeShadow)"
            />

            {/* Split Harness Loop behind Luffy's shoulders */}
            <path
              d="M34,80 C30,95 18,105 8,110 M46,80 C50,95 62,105 72,110"
              stroke="#5A3A1A"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#ropeShadow)"
            />
            <path
              d="M34,80 C30,95 18,105 8,110 M46,80 C50,95 62,105 72,110"
              stroke="url(#ropeBraid)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Character Illustration Area (Luffy Halftone Canvas) */}
        <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[4/3] flex items-center justify-center z-10">
          <HalftoneReveal
            src="/art/luffy-hero-transparent.png"
            alt="Luffy Hanging Hero Illustration"
            fit="contain"
            mode="color"
            shape="dot"
            cellSize={3}
            angle={45}
            paperColor="#F4F2ED"
            contrast={1.15}
            revealRadius={160}
            softness={0.65}
            linger={1.2}
            clickBurst={true}
            intro={true}
            className="w-full h-full cursor-crosshair"
          />

          {/* Foreground Tied Rope Knot (Tied across upper torso, under arms, over yellow sash) */}
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            <svg
              viewBox="0 0 480 360"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="knotShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Rope loop under armpits across chest (around y=155..175, safely below face & neck) */}
              <g filter="url(#knotShadow)">
                {/* Shadow Backing */}
                <path
                  d="M178,142 C205,152 275,152 302,142"
                  stroke="#261608"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                {/* Main Torso Wrap Strand 1 */}
                <path
                  d="M178,142 C205,152 275,152 302,142"
                  stroke="url(#ropeBraid)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Main Torso Wrap Strand 2 (Twisted Wrap) */}
                <path
                  d="M182,148 C210,158 270,158 298,148"
                  stroke="#3A220F"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M182,148 C210,158 270,158 298,148"
                  stroke="url(#ropeBraid)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />

                {/* Central Tied Knot Loop */}
                <ellipse
                  cx="240"
                  cy="153"
                  rx="16"
                  ry="9"
                  fill="url(#ropeBraid)"
                  stroke="#3A220F"
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="242"
                  cy="151"
                  rx="11"
                  ry="7"
                  fill="#DDBB88"
                  stroke="#5A3A1A"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Dangling Rope Knot Tails */}
                <path
                  d="M234,158 C232,172 226,182 223,194"
                  stroke="#3A220F"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M234,158 C232,172 226,182 223,194"
                  stroke="url(#ropeBraid)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Frayed End 1 */}
                <path d="M221,194 L220,199 M223,194 L223,200 M225,194 L226,198" stroke="#DDBB88" strokeWidth="2" strokeLinecap="round" />

                <path
                  d="M246,158 C248,170 254,180 258,190"
                  stroke="#3A220F"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M246,158 C248,170 254,180 258,190"
                  stroke="url(#ropeBraid)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Frayed End 2 */}
                <path d="M256,190 L255,195 M258,190 L259,196 M261,190 L262,194" stroke="#DDBB88" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingLuffy;
