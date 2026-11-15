import React, { useState } from 'react';
import { VolumeNavbar } from './components/navigation/VolumeNavbar';
import { MangaPanel } from './components/common/MangaPanel';
import { ChapterHeader } from './components/common/ChapterHeader';
import { InkButton } from './components/common/InkButton';
import { TechBadge } from './components/common/TechBadge';
import { HankoStamp } from './components/common/HankoStamp';
import { HalftoneOverlay } from './components/common/HalftoneOverlay';

// Import verified data to test data pipeline & dynamic calculations
import { PROFILE_DATA } from './data/profile';
import { SKILL_CATEGORIES } from './data/skills';
import {
  PROJECTS_DATA,
  FEATURED_PROJECTS,
  ARCHIVED_PROJECTS,
  TOTAL_PROJECTS_COUNT,
  DEPLOYED_PROJECTS_COUNT,
} from './data/projects';
import { EXPERIENCES_DATA } from './data/experience';
import { ACHIEVEMENTS_DATA } from './data/achievements';

import { ExternalLink, Terminal, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function App(): React.JSX.Element {
  const [activeChapter] = useState('prologue');
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#151515] font-sans antialiased selection:bg-[#E53935] selection:text-white">
      {/* Sticky Volume Navbar */}
      <VolumeNavbar activeChapterId={activeChapter} />

      {/* Main Verification Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Verification Banner */}
        <section className="relative">
          <MangaPanel variant="ink" tag="PHASE 02 PREVIEW" hoverEffect>
            <HalftoneOverlay density="fine" opacity="subtle" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#E53935] font-bold tracking-widest uppercase block mb-1">
                  SYSTEM FOUNDATION VERIFICATION
                </span>
                <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-[#F4F0E8]">
                  MANGA UI PRIMITIVES & VERIFIED DATA
                </h1>
                <p className="font-mono text-xs text-[#A5A19B] mt-1">
                  Strictly grounded for {PROFILE_DATA.name} | {PROFILE_DATA.education.institution} ({PROFILE_DATA.education.degree}, GPA {PROFILE_DATA.education.gpa})
                </p>
              </div>
              <HankoStamp label="完" subtext="PHASE 02" shape="circle" color="red" size="md" />
            </div>
          </MangaPanel>
        </section>

        {/* 1. Typography & Chapter Header Test */}
        <section>
          <ChapterHeader
            number="00"
            title="TYPOGRAPHY & HEADERS"
            kanji="文字組版"
            subtitle="Testing condensed display typography (Bebas Neue), modern body sans-serif (Plus Jakarta Sans), and monospace metadata (Space Mono)."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MangaPanel variant="default" tag="DISPLAY">
              <span className="font-mono text-[10px] text-[#A5A19B] block mb-1">BEBAS NEUE</span>
              <p className="font-display text-4xl leading-tight uppercase text-[#151515]">
                THE DEVELOPER'S STORY
              </p>
              <p className="font-display text-2xl text-[#E53935] mt-2">
                VOL. 01 / EDITION 2026
              </p>
            </MangaPanel>

            <MangaPanel variant="wash" tag="BODY SANS">
              <span className="font-mono text-[10px] text-[#A5A19B] block mb-1">PLUS JAKARTA SANS</span>
              <p className="text-sm text-[#151515] leading-relaxed">
                {PROFILE_DATA.introduction}
              </p>
            </MangaPanel>

            <MangaPanel variant="bordered-only" tag="CODE MONO">
              <span className="font-mono text-[10px] text-[#A5A19B] block mb-1">SPACE MONO</span>
              <p className="font-mono text-xs text-[#55524E] leading-loose">
                LOCATION: {PROFILE_DATA.location}<br />
                EMAIL: {PROFILE_DATA.email}<br />
                GITHUB: {PROFILE_DATA.githubUrl.replace('https://', '')}<br />
                GPA: {PROFILE_DATA.education.gpa} / 10.0
              </p>
            </MangaPanel>
          </div>
        </section>

        {/* 2. Manga Panels & Notches */}
        <section>
          <ChapterHeader
            number="01"
            title="MANGA PANEL PRIMITIVES"
            kanji="枠線構成"
            subtitle="Testing high-contrast ink borders, recessed ink-wash cards, and geometric corner notches."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MangaPanel variant="default" tag="PANEL 01" notch="none" hoverEffect>
              <h3 className="font-display text-xl mb-1">Default Paper</h3>
              <p className="text-xs text-[#55524E]">
                Clean paper background (#FAF8F5) with solid 2px ink border and 4px offset ink shadow.
              </p>
            </MangaPanel>

            <MangaPanel variant="wash" tag="PANEL 02" notch="top-right" hoverEffect>
              <h3 className="font-display text-xl mb-1">Ink Wash Surface</h3>
              <p className="text-xs text-[#55524E]">
                Recessed tone (#EAE5DC) with top-right angular notch for technical callouts.
              </p>
            </MangaPanel>

            <MangaPanel variant="ink" tag="PANEL 03" notch="bottom-right" hoverEffect>
              <h3 className="font-display text-xl text-[#F4F0E8] mb-1">Deep Ink Inversion</h3>
              <p className="text-xs text-[#A5A19B]">
                High-contrast ink fill (#151515) with light paper text and bottom-right notch.
              </p>
            </MangaPanel>

            <MangaPanel variant="bordered-only" tag="PANEL 04" hoverEffect>
              <h3 className="font-display text-xl mb-1">Bordered Frame</h3>
              <p className="text-xs text-[#55524E]">
                Transparent canvas revealing underlying paper texture with ink borders.
              </p>
            </MangaPanel>
          </div>
        </section>

        {/* 3. Interactive Buttons, Badges & Hanko Stamps */}
        <section>
          <ChapterHeader
            number="02"
            title="BUTTONS, BADGES & SEALS"
            kanji="武具捺印"
            subtitle="Testing tactile buttons with active press states, metadata badges, and authentic Japanese seal stamps."
          />

          <div className="space-y-6">
            {/* Ink Buttons Row */}
            <MangaPanel variant="default">
              <span className="font-mono text-[10px] text-[#A5A19B] uppercase tracking-wider block mb-3">
                INTERACTIVE INK BUTTONS
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <InkButton
                  variant="primary"
                  onClick={() => setClickCount((c) => c + 1)}
                  icon={<Terminal className="w-4 h-4" />}
                >
                  Primary Action ({clickCount})
                </InkButton>
                <InkButton variant="secondary" icon={<ExternalLink className="w-4 h-4" />}>
                  Secondary Action
                </InkButton>
                <InkButton variant="accent" icon={<Flame className="w-4 h-4" />}>
                  Accent Flame
                </InkButton>
                <InkButton variant="ghost">
                  Ghost Outline
                </InkButton>
                <InkButton variant="primary" size="sm">
                  Small Button
                </InkButton>
                <InkButton variant="primary" size="lg">
                  Large CTA
                </InkButton>
              </div>
            </MangaPanel>

            {/* Badges & Stamps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MangaPanel variant="wash" tag="TECH BADGES">
                <span className="font-mono text-[10px] text-[#55524E] uppercase tracking-wider block mb-3">
                  PILL & METADATA BADGES
                </span>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="React 19" variant="default" />
                  <TechBadge name="TypeScript" variant="accent" />
                  <TechBadge name="Tailwind v4" variant="default" />
                  <TechBadge name="Node.js" variant="muted" />
                  <TechBadge name="MongoDB" variant="outline" />
                  <TechBadge name="Express.js" variant="default" />
                  <TechBadge name="Vite" variant="accent" />
                  <TechBadge name="REST APIs" variant="muted" />
                </div>
              </MangaPanel>

              <MangaPanel variant="default" tag="HANKO SEALS">
                <span className="font-mono text-[10px] text-[#A5A19B] uppercase tracking-wider block mb-3">
                  AUTHENTIC JAPANESE INK SEALS
                </span>
                <div className="flex items-center gap-6">
                  <HankoStamp label="完" subtext="END" shape="circle" color="red" size="md" angle={-8} />
                  <HankoStamp label="極" subtext="PEAK" shape="square" color="red" size="md" angle={4} />
                  <HankoStamp label="済" subtext="DONE" shape="circle" color="ink" size="sm" angle={-3} />
                  <HankoStamp label="印" subtext="SEAL" shape="square" color="ink" size="sm" angle={6} />
                </div>
              </MangaPanel>
            </div>
          </div>
        </section>

        {/* 4. Verified Data Pipeline Audit */}
        <section>
          <ChapterHeader
            number="03"
            title="VERIFIED DATA PIPELINE AUDIT"
            kanji="検証數據"
            subtitle="Testing actual project metrics, dynamic counters, and strict data-binding without hardcoded values."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MangaPanel variant="default" tag="PROJECTS">
              <span className="font-mono text-3xl font-black text-[#151515] block">
                {TOTAL_PROJECTS_COUNT}
              </span>
              <span className="font-mono text-xs text-[#55524E]">
                Total Verified Records ({FEATURED_PROJECTS.length} Featured / {ARCHIVED_PROJECTS.length} Archive)
              </span>
            </MangaPanel>

            <MangaPanel variant="default" tag="DEPLOYED">
              <span className="font-mono text-3xl font-black text-[#E53935] block">
                {DEPLOYED_PROJECTS_COUNT}
              </span>
              <span className="font-mono text-xs text-[#55524E]">
                Publicly Verified Live Demos
              </span>
            </MangaPanel>

            <MangaPanel variant="default" tag="SKILLS">
              <span className="font-mono text-3xl font-black text-[#151515] block">
                {SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </span>
              <span className="font-mono text-xs text-[#55524E]">
                Technologies across {SKILL_CATEGORIES.length} Categories
              </span>
            </MangaPanel>

            <MangaPanel variant="default" tag="ACADEMIC">
              <span className="font-mono text-3xl font-black text-[#151515] block">
                {PROFILE_DATA.education.gpa}
              </span>
              <span className="font-mono text-xs text-[#55524E]">
                SRM IST Ramapuram GPA
              </span>
            </MangaPanel>
          </div>

          {/* Projects Verification List */}
          <MangaPanel variant="default" tag="8 PROJECT RECORDS">
            <div className="divide-y divide-[#151515]/20">
              {PROJECTS_DATA.map((project, idx) => (
                <div
                  key={project.id}
                  className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#E53935] font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg tracking-wide">
                          {project.title}
                        </span>
                        <TechBadge
                          name={project.maturity}
                          variant={project.isFeatured ? 'accent' : 'muted'}
                          size="sm"
                        />
                      </div>
                      <p className="text-xs text-[#55524E] line-clamp-1">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[11px] text-[#E53935] hover:underline flex items-center gap-1"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] text-[#151515] hover:underline flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </MangaPanel>
        </section>

        {/* 5. Experience & Hackathons Data Sanity Check */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MangaPanel variant="wash" tag="EXPERIENCES">
              <h3 className="font-display text-xl mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E53935]" />
                <span>Verified Experience ({EXPERIENCES_DATA.length})</span>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {EXPERIENCES_DATA.map((exp) => (
                  <div key={exp.role + exp.organization} className="p-2.5 bg-[#FAF8F5] border border-[#151515]/30">
                    <div className="flex justify-between font-bold text-[#151515]">
                      <span>{exp.role}</span>
                      <span className="text-[#E53935]">{exp.status}</span>
                    </div>
                    <div className="text-[#55524E]">{exp.organization} ({exp.period})</div>
                  </div>
                ))}
              </div>
            </MangaPanel>

            <MangaPanel variant="wash" tag="ACHIEVEMENTS">
              <h3 className="font-display text-xl mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#E53935]" />
                <span>Verified Achievements ({ACHIEVEMENTS_DATA.length})</span>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {ACHIEVEMENTS_DATA.map((ach) => (
                  <div key={ach.event} className="p-2.5 bg-[#FAF8F5] border border-[#151515]/30">
                    <div className="flex justify-between font-bold text-[#151515]">
                      <span>{ach.event}</span>
                      <span className="text-[#E53935]">{ach.standing}</span>
                    </div>
                    <div className="text-[#55524E] text-[11px] mt-1">{ach.description}</div>
                  </div>
                ))}
              </div>
            </MangaPanel>
          </div>
        </section>

        {/* Phase 2 Sign-off Footer */}
        <footer className="pt-8 pb-12 border-t-2 border-[#151515] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#55524E]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E53935]" />
            <span>PHASE 02: REUSABLE PRIMITIVES & DATA COMPLETE</span>
          </div>
          <span>VOL. 01 / ED. 2026 — YOGESHKUMAR S</span>
        </footer>
      </main>
    </div>
  );
}
