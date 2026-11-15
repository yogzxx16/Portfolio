import React, { useState, useEffect } from 'react';
import { VolumeNavbar } from './components/navigation/VolumeNavbar';
import { NoirHero } from './components/sections/NoirHero';
import { SkillSwap3DShowcase } from './components/sections/SkillSwap3DShowcase';
import { PersonNarrative } from './components/sections/PersonNarrative';
import { ArsenalSection } from './components/sections/ArsenalSection';
import { CreationsSection } from './components/sections/CreationsSection';
import { JourneySection } from './components/sections/JourneySection';
import { NextChapterSection } from './components/sections/NextChapterSection';
import { Sparkles, Layers } from 'lucide-react';

export default function App(): React.JSX.Element {
  const [activeChapter, setActiveChapter] = useState('prologue');
  const [prototypeView, setPrototypeView] = useState<'prototype-focus' | 'full-volume'>('prototype-focus');

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapter(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [prototypeView]);

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F4F2ED] font-sans antialiased selection:bg-[#D71936] selection:text-white flex flex-col justify-between">
      {/* Sticky Manga Noir Volume Navbar */}
      <VolumeNavbar
        activeChapterId={activeChapter}
        onNavigate={(id) => {
          setActiveChapter(id);
          // If navigating to a chapter in full volume, expand view if needed
          if (id !== 'prologue' && id !== 'skillswap-prototype' && prototypeView === 'prototype-focus') {
            setPrototypeView('full-volume');
          }
        }}
      />

      {/* Prototype Mode Bar */}
      <div className="bg-[#14151B] border-b border-[#23252C] px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#D71936] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MANGA NOIR PROTOTYPE PREVIEW</span>
            <span className="text-[#747C8B] hidden sm:inline">&bull; 3D TANKŌBON HERO & SKILLSWAP 3D SPREAD</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPrototypeView(prototypeView === 'prototype-focus' ? 'full-volume' : 'prototype-focus')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#23252C] hover:bg-[#D71936] text-[#F4F2ED] text-[11px] font-bold transition-colors cursor-pointer"
            >
              <Layers className="w-3 h-3" />
              <span>
                {prototypeView === 'prototype-focus'
                  ? 'SWITCH TO FULL VOLUME VIEW'
                  : 'SWITCH TO PROTOTYPE FOCUS'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Experience Container */}
      <main className="flex-1">
        {/* ========================================================================= */}
        {/* PROTOTYPE SECTION 1: MANGA NOIR CINEMATIC HERO (WITH 3D TANKŌBON CENTERPIECE) */}
        {/* ========================================================================= */}
        <NoirHero />

        {/* ========================================================================= */}
        {/* PROTOTYPE SECTION 2: SKILLSWAP 3D MANGA PROJECT SPREAD */}
        {/* ========================================================================= */}
        <SkillSwap3DShowcase />

        {/* ========================================================================= */}
        {/* EXTENDED SECTIONS (PRESERVED FOR FULL VOLUME REVIEW) */}
        {/* ========================================================================= */}
        {prototypeView === 'full-volume' && (
          <div className="space-y-0">
            {/* CHAPTER 01 — THE PERSON */}
            <PersonNarrative />

            {/* CHAPTER 02 — MY ARSENAL */}
            <ArsenalSection />

            {/* CHAPTER 03 — MY CREATIONS (ALL ARCHIVES) */}
            <CreationsSection />

            {/* CHAPTER 04 — THE JOURNEY */}
            <JourneySection />

            {/* CHAPTER 05 — NEXT CHAPTER & COLOPHON */}
            <NextChapterSection />
          </div>
        )}

        {/* Prototype Closing Colophon Bar when in Prototype Focus mode */}
        {prototypeView === 'prototype-focus' && (
          <div className="bg-[#090A0E] border-t-2 border-[#23252C] py-12 text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 space-y-4">
              <div className="inline-block p-2 border border-[#23252C] bg-[#14151B]">
                <span className="font-mono text-xs text-[#D71936] font-bold tracking-widest uppercase">
                  PROTOTYPE CHECKPOINT // 試作完了
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F4F2ED] uppercase">
                MANGA NOIR DIRECTION AWAITING REVIEW
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#747C8B] max-w-xl mx-auto leading-relaxed">
                Review the cinematic 3D manga volume hero and the interactive SkillSwap 3D project spread. Upon approval, this aesthetic will cascade across all remaining chapters.
              </p>
              <div className="pt-2 font-mono text-[11px] text-[#747C8B]">
                ART DIRECTED & ENGINEERED BY YOGESHKUMAR S. &bull; 2026
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
