import React from 'react';
import { motion } from 'motion/react';

export interface HeroMangaIllustrationProps {
  className?: string;
}

export const HeroMangaIllustration: React.FC<HeroMangaIllustrationProps> = ({
  className = '',
}) => {
  return (
    <div className={`relative w-full aspect-[4/3] max-w-xl mx-auto select-none ${className}`}>
      {/* Decorative Manga Frame Border & Background */}
      <div className="absolute inset-0 border-2 border-[#151515] bg-[#FAF8F5] shadow-manga overflow-hidden">
        {/* Procedural Halftone Screentone in Top Corner */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-48 h-48 bg-halftone opacity-10 rounded-full"
        />

        {/* Speedline Rays Layer */}
        <svg
          viewBox="0 0 600 450"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="300" y1="225" x2="0" y2="0" stroke="#151515" strokeWidth="1.5" strokeDasharray="6,4" />
          <line x1="300" y1="225" x2="600" y2="0" stroke="#151515" strokeWidth="1.5" strokeDasharray="6,4" />
          <line x1="300" y1="225" x2="0" y2="450" stroke="#151515" strokeWidth="1.5" strokeDasharray="6,4" />
          <line x1="300" y1="225" x2="600" y2="450" stroke="#151515" strokeWidth="1.5" strokeDasharray="6,4" />
          <line x1="300" y1="225" x2="100" y2="0" stroke="#151515" strokeWidth="1" />
          <line x1="300" y1="225" x2="500" y2="0" stroke="#151515" strokeWidth="1" />
          <line x1="300" y1="225" x2="0" y2="225" stroke="#E53935" strokeWidth="1.5" />
          <line x1="300" y1="225" x2="600" y2="225" stroke="#E53935" strokeWidth="1.5" />
        </svg>

        {/* Main Vector Art Spread */}
        <motion.div
          className="relative w-full h-full p-4 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <svg
            viewBox="0 0 500 380"
            className="w-full h-full max-h-[360px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for Patterns & Gradients */}
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#151515" opacity="0.35" />
              </pattern>
              <pattern id="diagonalHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#151515" strokeWidth="1.2" opacity="0.4" />
              </pattern>
            </defs>

            {/* Back Panel: System Architecture Plane */}
            <rect
              x="40"
              y="30"
              width="420"
              height="280"
              fill="#EAE5DC"
              stroke="#151515"
              strokeWidth="2.5"
            />
            {/* Screentone Shade on Back Panel */}
            <rect x="40" y="30" width="160" height="280" fill="url(#dotPattern)" />

            {/* Sub-Panel A: Neural / AI Flow Grid (Top Left) */}
            <g transform="translate(60, 50)">
              <rect width="180" height="110" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
              <rect width="180" height="20" fill="#151515" />
              <text x="8" y="14" fill="#F4F0E8" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                MERN_CORE.SYS // AI_MODEL
              </text>
              <circle cx="168" cy="10" r="3" fill="#E53935" />

              {/* Data Node Flow */}
              <circle cx="35" cy="55" r="8" fill="#151515" />
              <circle cx="90" cy="40" r="12" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <circle cx="90" cy="80" r="9" fill="#151515" />
              <circle cx="145" cy="60" r="10" fill="#FAF8F5" stroke="#151515" strokeWidth="2.5" />

              {/* Connecting Lines */}
              <line x1="43" y1="55" x2="78" y2="43" stroke="#151515" strokeWidth="2" />
              <line x1="43" y1="55" x2="81" y2="78" stroke="#151515" strokeWidth="2" />
              <line x1="102" y1="40" x2="135" y2="57" stroke="#151515" strokeWidth="2" />
              <line x1="99" y1="80" x2="135" y2="63" stroke="#151515" strokeWidth="2" />
              <text x="83" y="44" fill="#FAF8F5" fontFamily="'Space Mono', monospace" fontSize="10" fontWeight="bold">
                AI
              </text>
            </g>

            {/* Sub-Panel B: Code Synthesis Buffer (Top Right) */}
            <g transform="translate(260, 50)">
              <rect width="180" height="150" fill="#151515" stroke="#151515" strokeWidth="2" />
              <rect x="0" y="0" width="180" height="20" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
              <text x="8" y="14" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                API_GATEWAY.TS
              </text>
              <line x1="150" y1="10" x2="170" y2="10" stroke="#E53935" strokeWidth="2" />

              {/* Mock Code Lines */}
              <rect x="12" y="32" width="60" height="5" fill="#E53935" />
              <rect x="78" y="32" width="80" height="5" fill="#FAF8F5" opacity="0.8" />
              <rect x="24" y="45" width="120" height="5" fill="#A5A19B" />
              <rect x="24" y="58" width="90" height="5" fill="#FAF8F5" opacity="0.6" />
              <rect x="36" y="71" width="100" height="5" fill="#E53935" />
              <rect x="24" y="84" width="70" height="5" fill="#A5A19B" />
              <rect x="12" y="97" width="40" height="5" fill="#FAF8F5" />

              {/* Terminal Cursor Blink */}
              <rect x="58" y="97" width="8" height="6" fill="#E53935" />

              {/* Screentone Inset */}
              <rect x="12" y="115" width="156" height="24" fill="url(#diagonalHatch)" stroke="#FAF8F5" strokeWidth="1" />
              <text x="18" y="131" fill="#FAF8F5" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                STATUS: 200 OK [TRANSFERRED]
              </text>
            </g>

            {/* Center Front: Cybernetic Drafting Desk / Terminal Surface */}
            <g transform="translate(90, 175)">
              {/* Main Desk / Monitor Frame with Hard Shadow */}
              <rect x="8" y="8" width="320" height="145" fill="#151515" />
              <rect width="320" height="145" fill="#FAF8F5" stroke="#151515" strokeWidth="2.5" />

              {/* Monitor Header */}
              <rect width="320" height="26" fill="#151515" />
              <text x="12" y="17" fill="#F4F0E8" fontFamily="'Bebas Neue', sans-serif" fontSize="15" letterSpacing="1">
                YOGESH // DEVELOPMENT MATRIX — VOL. 01
              </text>
              <rect x="270" y="6" width="38" height="14" fill="#E53935" />
              <text x="276" y="16" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ACTIVE
              </text>

              {/* Display Canvas Elements */}
              <g transform="translate(16, 38)">
                {/* Interface Wireframe */}
                <rect width="180" height="85" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
                <rect x="10" y="10" width="160" height="16" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
                <text x="18" y="21" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8">
                  &lt;InteractiveApplication /&gt;
                </text>

                <rect x="10" y="34" width="75" height="42" fill="url(#dotPattern)" stroke="#151515" strokeWidth="1" />
                <rect x="95" y="34" width="75" height="42" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
                <line x1="102" y1="42" x2="162" y2="42" stroke="#E53935" strokeWidth="2" />
                <line x1="102" y1="52" x2="150" y2="52" stroke="#151515" strokeWidth="1.5" />
                <line x1="102" y1="62" x2="140" y2="62" stroke="#A5A19B" strokeWidth="1.5" />
              </g>

              {/* Right Side Metric Readouts */}
              <g transform="translate(210, 38)">
                <rect width="95" height="85" fill="#151515" stroke="#151515" strokeWidth="1" />
                <text x="10" y="18" fill="#E53935" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                  SRM RAMAPURAM
                </text>
                <text x="10" y="32" fill="#FAF8F5" fontFamily="'Space Mono', monospace" fontSize="8">
                  B.TECH IT 25-29
                </text>
                <line x1="10" y1="40" x2="85" y2="40" stroke="#FAF8F5" strokeWidth="1" strokeDasharray="2,2" />
                <text x="10" y="55" fill="#A5A19B" fontFamily="'Space Mono', monospace" fontSize="8">
                  CUMULATIVE GPA
                </text>
                <text x="10" y="74" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="22" letterSpacing="0.5">
                  8.68 / 10.0
                </text>
              </g>
            </g>

            {/* Manga Sound Effect Callout (Onomatopoeia) Stamp */}
            <g transform="translate(400, 240) rotate(-10)">
              <rect x="4" y="4" width="75" height="38" fill="#151515" />
              <rect width="75" height="38" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <text x="37" y="27" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="24" textAnchor="middle" letterSpacing="1">
                BUILD!
              </text>
              {/* Action Hash Marks */}
              <line x1="-8" y1="10" x2="-2" y2="10" stroke="#151515" strokeWidth="2" />
              <line x1="-12" y1="20" x2="-4" y2="20" stroke="#151515" strokeWidth="2.5" />
              <line x1="-8" y1="30" x2="-2" y2="30" stroke="#151515" strokeWidth="2" />
            </g>

            {/* Bottom Left Japanese Seal Stamp */}
            <g transform="translate(25, 275)">
              <rect width="36" height="36" fill="#FAF8F5" stroke="#E53935" strokeWidth="2" />
              <rect x="3" y="3" width="30" height="30" fill="none" stroke="#E53935" strokeWidth="1" strokeDasharray="2,2" />
              <text x="18" y="24" fill="#E53935" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle" fontWeight="bold">
                創
              </text>
            </g>
          </svg>
        </motion.div>

        {/* Bottom Editorial Caption Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-[#151515] text-[#F4F0E8] px-3 py-1.5 flex items-center justify-between font-mono text-[10px] tracking-widest border-t-2 border-[#151515]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E53935] inline-block animate-pulse" />
            <span>FIG 00.1 — CREATIVE TERMINAL MATRIX</span>
          </div>
          <span className="text-[#A5A19B]">SECTOR: FULL-STACK / AI</span>
        </div>
      </div>
    </div>
  );
};
