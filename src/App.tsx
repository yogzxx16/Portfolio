import React, { useState, useEffect } from 'react';
import { VolumeNavbar } from './components/navigation/VolumeNavbar';
import { NoirHero } from './components/sections/NoirHero';
import { PersonNarrative } from './components/sections/PersonNarrative';
import { ArsenalSection } from './components/sections/ArsenalSection';
import { SkillSwap3DShowcase } from './components/sections/SkillSwap3DShowcase';
import { CreationsSection } from './components/sections/CreationsSection';
import { JourneySection } from './components/sections/JourneySection';
import { NextChapterSection } from './components/sections/NextChapterSection';

export default function App(): React.JSX.Element {
  const [soloView] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('solo');
    }
    return null;
  });
  const [activeChapter, setActiveChapter] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const solo = params.get('solo');
      if (solo === 'skillswap' || solo === 'projects' || solo === 'creations') return 'creations';
      if (solo === 'about-skills' || solo === 'arsenal') return 'arsenal';
      if (solo === 'person') return 'person';
      if (solo === 'journey') return 'journey';
      if (solo === 'next-chapter') return 'next-chapter';
    }
    return 'prologue';
  });

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (soloView) return;

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
  }, [soloView]);

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F4F2ED] font-sans antialiased selection:bg-[#D71936] selection:text-white flex flex-col justify-between">
      {/* Sticky Manga Noir Volume Navbar */}
      <VolumeNavbar
        activeChapterId={activeChapter}
        onNavigate={(id) => {
          setActiveChapter(id);
        }}
      />

      {/* Primary Experience Container */}
      <main className="flex-1 space-y-0">
        {/* CHAPTER 00 — PROLOGUE (HERO WITH 3D TANKŌBON CENTERPIECE) */}
        {(!soloView || soloView === 'hero') && <NoirHero />}

        {/* CHAPTER 01 — THE PERSON */}
        {(!soloView || soloView === 'about-skills' || soloView === 'person') && (
          <PersonNarrative />
        )}

        {/* CHAPTER 02 — MY ARSENAL */}
        {(!soloView || soloView === 'about-skills' || soloView === 'arsenal') && (
          <ArsenalSection />
        )}

        {/* CHAPTER 03 — LEAD 3D SHOWCASE (SKILLSWAP 3D PERSPECTIVE SPREAD) */}
        {(!soloView || soloView === 'skillswap' || soloView === 'projects') && (
          <SkillSwap3DShowcase />
        )}

        {/* CHAPTER 03 — MY CREATIONS (ALL CURATED & ARCHIVED WORKS) */}
        {(!soloView || soloView === 'projects' || soloView === 'creations') && (
          <CreationsSection />
        )}

        {/* CHAPTER 04 — THE JOURNEY */}
        {(!soloView || soloView === 'journey') && <JourneySection />}

        {/* CHAPTER 05 — NEXT CHAPTER & COLOPHON */}
        {(!soloView || soloView === 'next-chapter') && <NextChapterSection />}
      </main>
    </div>
  );
}
