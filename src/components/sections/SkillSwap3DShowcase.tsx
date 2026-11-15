import React from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { SkillSwap3DCanvas } from '../3d/SkillSwap3DCanvas';
import { HankoStamp } from '../common/HankoStamp';

export const SkillSwap3DShowcase: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'skillswap')!;

  return (
    <section
      id="skillswap-prototype"
      className="relative py-20 sm:py-28 bg-[#090A0E] text-[#F4F2ED] border-b-2 border-[#23252C] overflow-hidden"
    >
      {/* Background Screentone Dot Texture */}
      <div className="absolute inset-0 bg-screentone-dark opacity-60 pointer-events-none" />

      {/* Decorative Oversized Chapter Index Backdrop */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-4 font-display text-[14rem] sm:text-[18rem] text-[#23252C] opacity-20 pointer-events-none select-none z-0"
      >
        01
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="pb-4 mb-12 border-b-2 border-[#23252C] flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D71936] font-bold uppercase tracking-wider mb-1">
              <span>FEATURED SPREAD // 第壱作品</span>
              <span className="text-[#9DA6B8]">&bull;</span>
              <span className="text-[#F4F2ED]">3D CANVAS PRESENTATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F4F2ED] uppercase tracking-wide">
              CHAPTER 03 // MY CREATIONS
            </h2>
          </div>

          <div className="font-mono text-xs text-[#9DA6B8] flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#14151B] border border-[#23252C] text-[#F4F2ED]">
              STATUS: DEPLOYED
            </span>
            <span className="hidden sm:inline">ACTUAL VERIFIED WORK</span>
          </div>
        </div>

        {/* 3D Spread Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: 3D Interactive WebGL Display Screen Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative border-2 border-[#23252C] bg-[#14151B] p-2 sm:p-3 shadow-noir-lg">
              {/* Top Screen Chassis Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#23252C] font-mono text-[11px] text-[#9DA6B8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D71936] rounded-xs" />
                  <span className="font-bold text-[#F4F2ED]">SKILLSWAP 3D PERSPECTIVE VIEWPORT</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#D71936] font-bold">1280 &times; 800</span>
                  <span className="text-[#9DA6B8] hidden sm:inline">THREE.JS / R3F</span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <SkillSwap3DCanvas />

              {/* Chassis Bottom Banner & Stamp */}
              <div className="mt-3 pt-2.5 border-t border-[#23252C] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#9DA6B8]">
                <div className="flex items-center gap-1.5 text-[#D71936] font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>INTERACTIVE 3D DISPLAY &bull; CURSOR DRIVEN PERSPECTIVE TILT</span>
                </div>
                <div className="flex items-center gap-2">
                  <HankoStamp
                    label="換"
                    subtext="SWAP"
                    shape="circle"
                    color="red"
                    size="sm"
                    angle={-4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Narrative Manga Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Act & Maturity Tag */}
            <div className="flex items-center justify-between border-b border-[#23252C] pb-2 font-mono text-xs">
              <span className="font-bold text-[#D71936]">
                ACT 01 // {project.chapterIndex}
              </span>
              <span className="px-2 py-0.5 bg-[#D71936] text-white font-bold text-[10px]">
                {project.maturity.toUpperCase()}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="font-display text-5xl sm:text-6xl text-[#F4F2ED] uppercase tracking-wide leading-none">
                {project.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#9DA6B8] mt-1 font-semibold">
                {project.subtitle}
              </p>
            </div>

            {/* Documented Problem Context */}
            {project.problemStatement && (
              <div className="p-3.5 bg-[#14151B] border-l-3 border-[#D71936] shadow-noir space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#D71936] uppercase tracking-wider block">
                  DOCUMENTED CHALLENGE
                </span>
                <p className="font-sans text-xs text-[#9DA6B8] leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
            )}

            {/* Summary */}
            <p className="font-sans text-sm sm:text-base text-[#F4F2ED] leading-relaxed font-medium">
              {project.summary}
            </p>

            {/* Key Capabilities Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[10px] text-[#9DA6B8] uppercase tracking-widest block mb-1">
                KEY VERIFIED ARCHITECTURE FEATURES:
              </span>
              {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-[#9DA6B8]">
                  <span className="text-[#D71936] font-bold mt-0.5">▶</span>
                  <span className="font-sans text-[#F4F2ED]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Badges */}
            <div className="pt-2">
              <span className="font-mono text-[10px] text-[#9DA6B8] uppercase tracking-widest block mb-2">
                VERIFIED TECH STACK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-[#14151B] border border-[#23252C] font-mono text-xs text-[#F4F2ED] hover:border-[#D71936] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D71936] text-white font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#D71936] shadow-noir hover:bg-[#A81229] hover:border-[#A81229] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D71936]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LIVE DEMO</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14151B] text-[#F4F2ED] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#23252C] shadow-noir hover:bg-[#23252C] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D71936]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
              )}

              <a
                href="#skillswap-prototype"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 font-mono text-xs text-[#747C8B] hover:text-[#F4F2ED] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#D71936]" />
                <span>ARCHITECTURAL DOSSIER</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
