import React from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { HankoStamp } from '../common/HankoStamp';
import { GraduationCap, Layers, Compass, CheckCircle2, User, Sparkles } from 'lucide-react';

export const PersonNarrative: React.FC = () => {
  return (
    <section
      id="person"
      className="relative py-16 sm:py-24 border-b-2 border-[#23252C] bg-[#090A0E] text-[#F4F2ED] overflow-hidden"
    >
      {/* Anchor for alternative hash */}
      <div id="the-person" className="absolute -top-20" />
      {/* Background Screentone Dot Matrix Texture */}
      <div className="absolute inset-0 bg-screentone-dark opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <ChapterHeader
          number="01"
          title="THE PERSON"
          kanji="人物"
          subtitle="Academic credentials, core engineering positioning, and technical areas of interest."
          theme="dark"
        />

        {/* Asymmetrical Manga Panel Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* PANEL 1: WHO I AM & ACADEMIC CREDENTIALS (Wide, 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <MangaPanel
              variant="default"
              tag="PANEL 01 // WHO I AM"
              notch="top-right"
              hoverEffect
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#090A0E]/15">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D71936]">
                      ENTRY NO. 01
                    </span>
                    <span className="text-[#8C93A0]">|</span>
                    <span className="font-mono text-xs text-[#3A3F4A] uppercase font-semibold">
                      STUDENT & BUILDER
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#747C8B] font-bold">
                    ACT. 01
                  </span>
                </div>

                {/* Editorial Portrait + Narrative Grid */}
                <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
                  {/* Manga Editorial Portrait Placeholder */}
                  <div className="w-full sm:w-44 aspect-[3/4] shrink-0 border-2 border-[#090A0E] bg-[#E8E6DF] shadow-noir relative flex flex-col items-center justify-center p-3 text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
                    
                    {/* Corner Registration Crosshairs */}
                    <span className="absolute top-1 left-1.5 font-mono text-[8px] text-[#747C8B] select-none">+</span>
                    <span className="absolute top-1 right-1.5 font-mono text-[8px] text-[#747C8B] select-none">+</span>
                    <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-[#747C8B] select-none">+</span>
                    <span className="absolute bottom-1 right-1.5 font-mono text-[8px] text-[#747C8B] select-none">+</span>

                    <div className="relative z-10 space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#090A0E] bg-[#F4F2ED] flex items-center justify-center shadow-sm">
                        <User className="w-6 h-6 text-[#090A0E]" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#090A0E] uppercase tracking-wider block">
                          PORTRAIT
                        </span>
                        <span className="font-mono text-[9px] text-[#3A3F4A] block">
                          GENUINE PHOTO
                        </span>
                        <span className="inline-block mt-1 font-mono text-[8px] px-1.5 py-0.5 bg-[#D71936] text-white font-bold tracking-widest">
                          YOGESH
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-1.5 text-center w-full z-10">
                      <span className="font-mono text-[7px] text-[#747C8B] uppercase tracking-tight font-semibold">
                        ARCHIVAL PLACEHOLDER
                      </span>
                    </div>
                  </div>

                  {/* Narrative Bio */}
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#090A0E] uppercase tracking-wide">
                      IDENTITY & DIRECTION
                    </h3>

                    <p className="font-sans text-base text-[#090A0E] leading-relaxed font-semibold">
                      I am a B.Tech Information Technology student at SRM Institute of Science and Technology, Ramapuram, focused on full-stack development and AI-powered web applications.
                    </p>

                    <p className="font-sans text-sm text-[#3A3F4A] leading-relaxed">
                      I enjoy building practical digital products, web applications, API integrations, and interactive user experiences with modern web technologies.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-[#090A0E]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#090A0E] shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#D71936]" />
                        <span className="font-bold">MERN Stack</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#090A0E] shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[#D71936] rounded-full" />
                        <span className="font-bold">AI Integrations</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrated Academic Detail Card */}
              <div className="p-4 sm:p-5 bg-white border-2 border-[#090A0E] shadow-noir relative mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#D71936] font-mono text-xs font-bold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>ACADEMIC FOUNDATION</span>
                    </div>
                    <h4 className="font-display text-xl sm:text-2xl text-[#090A0E] tracking-wide">
                      {PROFILE_DATA.education.institution}
                    </h4>
                    <p className="font-mono text-xs text-[#3A3F4A]">
                      {PROFILE_DATA.education.campus} Campus &bull; {PROFILE_DATA.education.degree} ({PROFILE_DATA.education.period})
                    </p>
                  </div>

                  <HankoStamp
                    label="学"
                    subtext="SRM"
                    shape="square"
                    color="red"
                    size="sm"
                    angle={4}
                  />
                </div>

                {/* GPA Readout Ribbon */}
                <div className="mt-4 pt-3 border-t border-[#090A0E]/15 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#3A3F4A] uppercase tracking-wider font-semibold">
                    CUMULATIVE GPA:
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-[#090A0E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D71936]" />
                    <span className="text-xl text-[#D71936] font-black font-display">
                      {PROFILE_DATA.education.gpa}
                    </span>
                    <span className="text-[#747C8B]">/ 10.0</span>
                  </div>
                </div>
              </div>
            </MangaPanel>
          </div>

          {/* RIGHT COLUMN: WHAT I BUILD & WHAT INTERESTS ME (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* PANEL 2: WHAT I BUILD */}
            <MangaPanel
              variant="wash"
              tag="PANEL 02 // WHAT I BUILD"
              notch="none"
              hoverEffect
              className="flex-1"
            >
              <div className="flex items-center gap-2 text-[#090A0E] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-[#D71936]" />
                <span>BUILD SCOPE // 制作領域</span>
              </div>

              <h3 className="font-display text-2xl text-[#090A0E] uppercase tracking-wide mb-2">
                PRACTICAL PRODUCTS
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#23252C] leading-relaxed mb-4">
                Practical digital products, web applications, API integrations and interactive user experiences.
              </p>

              {/* Scope Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <TechBadge name="Web Applications" variant="default" size="sm" />
                <TechBadge name="API Integrations" variant="accent" size="sm" />
                <TechBadge name="Interactive UX" variant="default" size="sm" />
                <TechBadge name="Full-Stack Systems" variant="muted" size="sm" />
              </div>
            </MangaPanel>

            {/* PANEL 3: WHAT INTERESTS ME */}
            <MangaPanel
              variant="default"
              tag="PANEL 03 // WHAT INTERESTS ME"
              notch="bottom-right"
              hoverEffect
              className="flex-1"
            >
              <div className="flex items-center gap-2 text-[#090A0E] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4 text-[#D71936]" />
                <span>FOCUS DOMAINS // 関心領域</span>
              </div>

              <h3 className="font-display text-2xl text-[#090A0E] uppercase tracking-wide mb-2">
                AREAS OF EXPLORATION
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#23252C] leading-relaxed mb-4">
                Backend systems, AI tools, automation, hackathons, collaborative projects, UI/UX and developer tools.
              </p>

              {/* Dynamic Interest Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PROFILE_DATA.interests.map((interest) => (
                  <TechBadge
                    key={interest}
                    name={interest}
                    variant="muted"
                    size="sm"
                  />
                ))}
              </div>
            </MangaPanel>
          </div>
        </div>

        {/* Section Bottom Manga Issue Footer Note */}
        <div className="mt-8 pt-4 border-t border-[#23252C] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#9DA6B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D71936]" />
            <span>CHAPTER 01 COMPLETE // CHAPTER 02 (MY ARSENAL) NEXT</span>
          </div>
          <span className="text-[#747C8B] font-semibold">VERIFIED EDITORIAL RECORD</span>
        </div>
      </div>
    </section>
  );
};
