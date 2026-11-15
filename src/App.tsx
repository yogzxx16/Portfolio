import React, { useState, useEffect } from 'react';
import { VolumeNavbar } from './components/navigation/VolumeNavbar';
import { PrologueHero } from './components/sections/PrologueHero';
import { PersonNarrative } from './components/sections/PersonNarrative';
import { ArsenalSection } from './components/sections/ArsenalSection';
import { CreationsSection } from './components/sections/CreationsSection';
import { MangaPanel } from './components/common/MangaPanel';
import { HankoStamp } from './components/common/HankoStamp';
import { TechBadge } from './components/common/TechBadge';
import { Sparkles, Terminal } from 'lucide-react';

export default function App(): React.JSX.Element {
  const [activeChapter, setActiveChapter] = useState('prologue');
  const [notification, setNotification] = useState<string | null>(null);

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

  const handleActionToast = (chapterName: string) => {
    setNotification(`${chapterName} is being serialized in upcoming Phase 5.`);
    const fallback = document.getElementById('pipeline-preview');
    if (fallback) {
      fallback.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#151515] font-sans antialiased selection:bg-[#E53935] selection:text-white flex flex-col justify-between">
      {/* Sticky Volume Navbar */}
      <VolumeNavbar
        activeChapterId={activeChapter}
        onNavigate={(id) => setActiveChapter(id)}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 border-2 border-[#151515] bg-[#FAF8F5] shadow-manga-red flex items-center gap-3 font-mono text-xs animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#E53935]" />
          <span className="font-bold">{notification}</span>
        </div>
      )}

      {/* Primary Chapters */}
      <main className="flex-1">
        {/* CHAPTER 00 — PROLOGUE */}
        <PrologueHero
          onConnectClick={() => handleActionToast('Chapter 05: Next Chapter')}
        />

        {/* CHAPTER 01 — THE PERSON */}
        <PersonNarrative />

        {/* CHAPTER 02 — MY ARSENAL */}
        <ArsenalSection />

        {/* CHAPTER 03 — MY CREATIONS */}
        <CreationsSection />

        {/* Pipeline & Serialization Preview Container for Phase 5 */}
        <section id="pipeline-preview" className="py-16 bg-[#EAE5DC] border-b-2 border-[#151515]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MangaPanel variant="default" tag="SERIALIZATION PIPELINE" notch="top-right">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#151515]/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#E53935] font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>NEXT EPISODES UNDER PRODUCTION</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#151515] tracking-wide">
                    FINAL ARCS ARRIVING IN PHASE 5
                  </h3>
                  <p className="font-mono text-xs text-[#55524E] max-w-xl">
                    Chapters 00, 01, 02, and 03 are live. The Journey timeline and Next Chapter contact system will complete the volume in Phase 5.
                  </p>
                </div>
                <HankoStamp label="続" subtext="TO BE CONTINUED" shape="square" color="red" size="md" />
              </div>

              {/* Upcoming Chapter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="p-5 bg-[#FAF8F5] border-2 border-[#151515] shadow-xs">
                  <span className="font-mono text-xs font-bold text-[#A5A19B] block mb-1">
                    CH.04 // 軌跡
                  </span>
                  <h4 className="font-display text-2xl text-[#151515] mb-2">THE JOURNEY</h4>
                  <p className="text-xs text-[#55524E] mb-4">
                    Chronicle timeline covering Decode Labs, Future Interns, completed Google Student Ambassador role, DSC, and verified hackathons.
                  </p>
                  <TechBadge name="Phase 5" variant="accent" size="sm" />
                </div>

                <div className="p-5 bg-[#FAF8F5] border-2 border-[#151515] shadow-xs">
                  <span className="font-mono text-xs font-bold text-[#A5A19B] block mb-1">
                    CH.05 // 終章
                  </span>
                  <h4 className="font-display text-2xl text-[#151515] mb-2">NEXT CHAPTER</h4>
                  <p className="text-xs text-[#55524E] mb-4">
                    Vercel serverless contact transmission system with Resend integration, direct social channels, and closing colophon.
                  </p>
                  <TechBadge name="Phase 5" variant="accent" size="sm" />
                </div>
              </div>
            </MangaPanel>
          </div>
        </section>
      </main>

      {/* Colophon & Footer */}
      <footer className="bg-[#151515] text-[#F4F0E8] py-8 border-t-2 border-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#E53935] text-white flex items-center justify-center font-display text-xs font-bold">
              Y
            </div>
            <span className="font-display text-lg tracking-wider">
              YOGESH<span className="text-[#E53935]">.</span>
            </span>
            <span className="text-[#A5A19B]">|</span>
            <span className="text-[#A5A19B]">THE DEVELOPER'S STORY</span>
          </div>

          <div className="flex items-center gap-4 text-[#A5A19B]">
            <span>VOL. 01 / ED. 2026</span>
            <span>&bull;</span>
            <span>CHENNAI, INDIA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
