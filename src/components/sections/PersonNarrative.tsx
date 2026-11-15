import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { HankoStamp } from '../common/HankoStamp';
import { HalftoneOverlay } from '../common/HalftoneOverlay';
import { GraduationCap, Layers, Compass, CheckCircle2 } from 'lucide-react';

export const PersonNarrative: React.FC = () => {
  return (
    <section id="person" className="relative py-16 sm:py-24 border-b-2 border-[#151515]">
      {/* Background Screentone Texture */}
      <HalftoneOverlay density="coarse" opacity="very-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <ChapterHeader
          number="01"
          title="THE PERSON"
          kanji="人物"
          subtitle="Academic credentials, core engineering positioning, and technical areas of interest."
        />

        {/* Asymmetrical Manga Panel Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* PANEL 1: WHO I AM & ACADEMIC CREDENTIALS (Wide, 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <MangaPanel
              variant="default"
              tag="PANEL 01 // WHO I AM"
              notch="top-right"
              hoverEffect
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#151515]/20">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#E53935]">
                      ENTRY NO. 01
                    </span>
                    <span className="text-[#A5A19B]">|</span>
                    <span className="font-mono text-xs text-[#55524E] uppercase">
                      STUDENT & BUILDER
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#A5A19B]">
                    ACT. 01
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide mb-3">
                  IDENTITY & DIRECTION
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#151515] leading-relaxed mb-6 font-medium">
                  I am a B.Tech Information Technology student at SRM Institute of Science and Technology, Ramapuram, focused on full-stack development and AI-powered web applications.
                </p>
              </div>

              {/* Integrated Academic Detail Card */}
              <div className="p-4 sm:p-5 bg-[#FAF8F5] border-2 border-[#151515] shadow-manga relative mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#E53935] font-mono text-xs font-bold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>ACADEMIC FOUNDATION</span>
                    </div>
                    <h4 className="font-display text-xl sm:text-2xl text-[#151515] tracking-wide">
                      {PROFILE_DATA.education.institution}
                    </h4>
                    <p className="font-mono text-xs text-[#55524E]">
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
                <div className="mt-4 pt-3 border-t border-[#151515]/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#55524E] uppercase tracking-wider">
                    CUMULATIVE GPA:
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-[#151515]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E53935]" />
                    <span className="text-base text-[#E53935] font-black font-display">
                      {PROFILE_DATA.education.gpa}
                    </span>
                    <span className="text-[#A5A19B]">/ 10.0</span>
                  </div>
                </div>
              </div>
            </MangaPanel>
          </motion.div>

          {/* RIGHT COLUMN: WHAT I BUILD & WHAT INTERESTS ME (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* PANEL 2: WHAT I BUILD */}
            <MangaPanel
              variant="wash"
              tag="PANEL 02 // WHAT I BUILD"
              notch="none"
              hoverEffect
              className="flex-1"
            >
              <div className="flex items-center gap-2 text-[#151515] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-[#E53935]" />
                <span>BUILD SCOPE // 制作領域</span>
              </div>

              <h3 className="font-display text-2xl text-[#151515] uppercase tracking-wide mb-2">
                PRACTICAL PRODUCTS
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#151515] leading-relaxed mb-4">
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
              <div className="flex items-center gap-2 text-[#151515] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4 text-[#E53935]" />
                <span>FOCUS DOMAINS // 関心領域</span>
              </div>

              <h3 className="font-display text-2xl text-[#151515] uppercase tracking-wide mb-2">
                AREAS OF EXPLORATION
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#151515] leading-relaxed mb-4">
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
          </motion.div>
        </div>

        {/* Section Bottom Manga Issue Footer Note */}
        <div className="mt-8 pt-4 border-t border-[#151515]/20 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#55524E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#151515]" />
            <span>CHAPTER 01 COMPLETE // CHAPTER 02 (MY ARSENAL) NEXT</span>
          </div>
          <span className="text-[#A5A19B]">VERIFIED EDITORIAL RECORD</span>
        </div>
      </div>
    </section>
  );
};
