import React, { useState, useEffect } from 'react';
import { VolumeNavbar } from './components/navigation/VolumeNavbar';
import { PrologueHero } from './components/sections/PrologueHero';
import { PersonNarrative } from './components/sections/PersonNarrative';
import { ArsenalSection } from './components/sections/ArsenalSection';
import { CreationsSection } from './components/sections/CreationsSection';
import { JourneySection } from './components/sections/JourneySection';
import { NextChapterSection } from './components/sections/NextChapterSection';

export default function App(): React.JSX.Element {
  const [activeChapter, setActiveChapter] = useState('prologue');

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
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#151515] font-sans antialiased selection:bg-[#E53935] selection:text-white flex flex-col justify-between">
      {/* Sticky Volume Navbar */}
      <VolumeNavbar
        activeChapterId={activeChapter}
        onNavigate={(id) => setActiveChapter(id)}
      />

      {/* Primary Chapters */}
      <main className="flex-1">
        {/* CHAPTER 00 — PROLOGUE */}
        <PrologueHero />

        {/* CHAPTER 01 — THE PERSON */}
        <PersonNarrative />

        {/* CHAPTER 02 — MY ARSENAL */}
        <ArsenalSection />

        {/* CHAPTER 03 — MY CREATIONS */}
        <CreationsSection />

        {/* CHAPTER 04 — THE JOURNEY */}
        <JourneySection />

        {/* CHAPTER 05 — NEXT CHAPTER & COLOPHON */}
        <NextChapterSection />
      </main>
    </div>
  );
}
