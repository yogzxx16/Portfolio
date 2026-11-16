import React from 'react';
import { motion } from 'motion/react';

export interface HeroMangaIllustrationProps {
  className?: string;
}

export const HeroMangaIllustration: React.FC<HeroMangaIllustrationProps> = ({
  className = '',
}) => {
  return (
    <div className={`relative w-full aspect-[16/11] max-w-2xl mx-auto select-none ${className}`}>
      {/* Outer Manga Comic Frame with Hard Shadow & Angled Corner Cut */}
      <div className="absolute inset-0 border-3 border-[#151515] bg-[#FAF8F5] shadow-manga-lg overflow-hidden notch-top-right">
        {/* Background Screentone Textures */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-64 h-64 bg-halftone opacity-15 rounded-full pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 h-32 bg-halftone-muted opacity-10 pointer-events-none"
        />

        {/* Dynamic Speedline Rays Emanating from Creative Core */}
        <svg
          viewBox="0 0 640 440"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="320" y1="210" x2="0" y2="0" stroke="#151515" strokeWidth="2" strokeDasharray="8,6" />
          <line x1="320" y1="210" x2="640" y2="0" stroke="#151515" strokeWidth="2" strokeDasharray="8,6" />
          <line x1="320" y1="210" x2="0" y2="440" stroke="#151515" strokeWidth="2" strokeDasharray="8,6" />
          <line x1="320" y1="210" x2="640" y2="440" stroke="#151515" strokeWidth="2" strokeDasharray="8,6" />
          <line x1="320" y1="210" x2="160" y2="0" stroke="#151515" strokeWidth="1.5" />
          <line x1="320" y1="210" x2="480" y2="0" stroke="#151515" strokeWidth="1.5" />
          <line x1="320" y1="210" x2="0" y2="210" stroke="#E53935" strokeWidth="2" />
          <line x1="320" y1="210" x2="640" y2="210" stroke="#E53935" strokeWidth="2" />
          <line x1="320" y1="210" x2="200" y2="440" stroke="#151515" strokeWidth="1.5" />
          <line x1="320" y1="210" x2="440" y2="440" stroke="#151515" strokeWidth="1.5" />
        </svg>

        {/* Main Vector Art Composition with Floating Parallax */}
        <motion.div
          className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
        >
          <svg
            viewBox="0 0 540 370"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Filter Patterns */}
            <defs>
              <pattern id="heroDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#151515" opacity="0.3" />
              </pattern>
              <pattern id="heroHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#151515" strokeWidth="1.2" opacity="0.35" />
              </pattern>
            </defs>

            {/* Backboard Manga Spread */}
            <rect
              x="25"
              y="20"
              width="490"
              height="300"
              fill="#EAE5DC"
              stroke="#151515"
              strokeWidth="2.5"
            />
            {/* Screentone Shade on Back Panel */}
            <rect x="25" y="20" width="220" height="300" fill="url(#heroDots)" />

            {/* Left Sub-Panel: AI & Architecture Graph */}
            <g transform="translate(45, 40)">
              <rect width="210" height="135" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
              {/* Header Ribbon */}
              <rect width="210" height="22" fill="#151515" />
              <text x="10" y="15" fill="#F4F0E8" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                AI_PIPELINE.SYS // FULL-STACK
              </text>
              <circle cx="195" cy="11" r="3.5" fill="#E53935" />

              {/* Neural Nodes & Data Stream */}
              <circle cx="40" cy="65" r="9" fill="#151515" />
              <text x="36" y="69" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                API
              </text>
              <circle cx="105" cy="48" r="14" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <text x="98" y="53" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="13" fontWeight="bold">
                AI
              </text>
              <circle cx="105" cy="100" r="10" fill="#151515" />
              <circle cx="170" cy="72" r="12" fill="#FAF8F5" stroke="#151515" strokeWidth="2.5" />
              <text x="162" y="76" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                MERN
              </text>

              {/* Vector Data Connectors */}
              <line x1="49" y1="65" x2="91" y2="52" stroke="#151515" strokeWidth="2.5" />
              <line x1="49" y1="65" x2="95" y2="98" stroke="#151515" strokeWidth="2.5" />
              <line x1="119" y1="48" x2="158" y2="68" stroke="#151515" strokeWidth="2.5" />
              <line x1="115" y1="100" x2="158" y2="76" stroke="#151515" strokeWidth="2.5" />

              {/* Coordinate Label */}
              <rect x="10" y="112" width="90" height="14" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
              <text x="16" y="122" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="7">
                LATENCY: &lt;12ms
              </text>
            </g>

            {/* Right Sub-Panel: Code Synthesis Terminal */}
            <g transform="translate(280, 40)">
              <rect width="215" height="155" fill="#151515" stroke="#151515" strokeWidth="2" />
              <rect width="215" height="22" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
              <text x="10" y="15" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                REACT_ENGINE.TSX // BUILD
              </text>
              <rect x="175" y="5" width="30" height="12" fill="#E53935" />
              <text x="180" y="14" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="7" fontWeight="bold">
                VITE
              </text>

              {/* Syntax Highlighting Bars */}
              <rect x="14" y="34" width="70" height="6" fill="#E53935" />
              <rect x="90" y="34" width="95" height="6" fill="#FAF8F5" opacity="0.85" />
              <rect x="28" y="48" width="140" height="6" fill="#A5A19B" />
              <rect x="28" y="62" width="110" height="6" fill="#FAF8F5" opacity="0.7" />
              <rect x="42" y="76" width="125" height="6" fill="#E53935" />
              <rect x="28" y="90" width="85" height="6" fill="#A5A19B" />
              <rect x="14" y="104" width="50" height="6" fill="#FAF8F5" />
              {/* Terminal Cursor */}
              <rect x="68" y="104" width="9" height="7" fill="#E53935" />

              {/* Status Band */}
              <rect x="14" y="122" width="187" height="22" fill="url(#heroHatch)" stroke="#FAF8F5" strokeWidth="1" />
              <text x="22" y="137" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ✓ ALL MODULES COMPILED (100%)
              </text>
            </g>

            {/* Foreground Main Console: Cybernetic Developer Desk Spread */}
            <g transform="translate(65, 175)">
              {/* Hard Ink Offset Shadow for Main Terminal */}
              <rect x="8" y="8" width="390" height="150" fill="#151515" />
              <rect width="390" height="150" fill="#FAF8F5" stroke="#151515" strokeWidth="3" />

              {/* Top Title Bar of Developer Console */}
              <rect width="390" height="28" fill="#151515" />
              <text x="14" y="19" fill="#F4F0E8" fontFamily="'Bebas Neue', sans-serif" fontSize="16" letterSpacing="1">
                YOGESHKUMAR S // THE DEVELOPER'S STORY — VOL. 01
              </text>
              <rect x="330" y="6" width="48" height="16" fill="#E53935" />
              <text x="338" y="17" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ONLINE
              </text>

              {/* Left Side: Interactive UI Blueprint Canvas */}
              <g transform="translate(18, 40)">
                <rect width="215" height="92" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
                <rect x="10" y="10" width="195" height="18" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
                <text x="18" y="22" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                  &lt;MangaPortfolio app="production" /&gt;
                </text>

                {/* Sub-wireframe panes */}
                <rect x="10" y="36" width="90" height="46" fill="url(#heroDots)" stroke="#151515" strokeWidth="1" />
                <rect x="108" y="36" width="97" height="46" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
                <line x1="116" y1="46" x2="195" y2="46" stroke="#E53935" strokeWidth="2.5" />
                <line x1="116" y1="56" x2="180" y2="56" stroke="#151515" strokeWidth="1.5" />
                <line x1="116" y1="66" x2="165" y2="66" stroke="#A5A19B" strokeWidth="1.5" />
              </g>

              {/* Right Side: Academic & System Telemetry */}
              <g transform="translate(250, 40)">
                <rect width="122" height="92" fill="#151515" stroke="#151515" strokeWidth="1.5" />
                <text x="10" y="18" fill="#E53935" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                  SRM RAMAPURAM
                </text>
                <text x="10" y="32" fill="#FAF8F5" fontFamily="'Space Mono', monospace" fontSize="8">
                  B.TECH IT 25-29
                </text>
                <line x1="10" y1="40" x2="112" y2="40" stroke="#FAF8F5" strokeWidth="1" strokeDasharray="2,2" />
                <text x="10" y="56" fill="#A5A19B" fontFamily="'Space Mono', monospace" fontSize="8">
                  CUMULATIVE GPA
                </text>
                <text x="10" y="80" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="26" letterSpacing="1">
                  9.2<tspan fill="#E53935" fontSize="16">/10</tspan>
                </text>
              </g>
            </g>

            {/* Dramatic Manga Sound-Effect (Onomatopoeia) Badge */}
            <g transform="translate(435, 230) rotate(-8)">
              <rect x="5" y="5" width="85" height="42" fill="#151515" />
              <rect width="85" height="42" fill="#E53935" stroke="#151515" strokeWidth="2.5" />
              <text x="42" y="30" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="28" textAnchor="middle" letterSpacing="1">
                BUILD!
              </text>
              {/* Dynamic Impact Speed Hash Lines */}
              <line x1="-10" y1="12" x2="-3" y2="12" stroke="#151515" strokeWidth="2.5" />
              <line x1="-16" y1="22" x2="-5" y2="22" stroke="#151515" strokeWidth="3" />
              <line x1="-10" y1="32" x2="-3" y2="32" stroke="#151515" strokeWidth="2.5" />
            </g>

            {/* Authentic Japanese Red Stamp Seal in Corner */}
            <g transform="translate(15, 270)">
              <rect width="40" height="40" fill="#FAF8F5" stroke="#E53935" strokeWidth="2.5" />
              <rect x="3.5" y="3.5" width="33" height="33" fill="none" stroke="#E53935" strokeWidth="1" strokeDasharray="3,2" />
              <text x="20" y="27" fill="#E53935" fontFamily="'Bebas Neue', sans-serif" fontSize="20" textAnchor="middle" fontWeight="bold">
                創
              </text>
            </g>
          </svg>
        </motion.div>

        {/* Bottom Editorial Caption Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-[#151515] text-[#F4F0E8] px-4 py-2 flex items-center justify-between font-mono text-[10px] tracking-widest border-t-2 border-[#151515]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E53935] inline-block animate-pulse" />
            <span className="font-bold">PLATE 00.1 — THE CREATIVE DRAFTING ENGINE</span>
          </div>
          <span className="text-[#A5A19B] hidden sm:inline">SCALE: 1:1 // EDITORIAL SPECIFICATION</span>
        </div>
      </div>
    </div>
  );
};
