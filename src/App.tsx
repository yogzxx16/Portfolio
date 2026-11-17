import React, { useState, useEffect, useLayoutEffect } from 'react';
import ShapeGrid from './components/react-bits/ShapeGrid';
import BubbleMenu from './components/react-bits/BubbleMenu';
import TearTicket from './components/react-bits/TearTicket';
import ScrollExpand from './components/react-bits/ScrollExpand';
import { MangaSplashHero } from './components/sections/MangaSplashHero';
import { MangaStorySequence } from './components/sections/MangaStorySequence';
import { ArsenalSection } from './components/sections/ArsenalSection';
import { CreationsSection } from './components/sections/CreationsSection';
import { JourneySection } from './components/sections/JourneySection';
import { NextChapterSection } from './components/sections/NextChapterSection';
import { TopMarqueeTicker } from './components/common/TopMarqueeTicker';
import { CHAPTERS_DATA } from './data/chapters';

export default function App(): React.JSX.Element {
  const [soloView] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('solo');
    }
    return null;
  });

  // TearTicket entrance state
  const isTestingTicket = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('ticket') === '1';
  const hasSoloParam = typeof window !== 'undefined' && Boolean(new URLSearchParams(window.location.search).get('solo'));
  const skipTicketParam = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('torn') === '1' ||
    new URLSearchParams(window.location.search).get('skipTicket') === '1'
  );
  
  const [ticketTorn, setTicketTorn] = useState<boolean>(() => {
    if (isTestingTicket) return false;
    if (hasSoloParam || skipTicketParam) return true;
    return false;
  });
  
  const [ticketOverlayVisible, setTicketOverlayVisible] = useState<boolean>(() => {
    if (isTestingTicket) return true;
    if (hasSoloParam || skipTicketParam) return false;
    return true;
  });

  // Synchronous scroll positioning for testing transition points
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const scrollYParam = params.get('scrollY');
      if (scrollYParam) {
        const y = parseInt(scrollYParam, 10);
        window.scrollTo(0, y);
      }
    }
  }, []);

  // Lock body scroll while ticket is not torn
  useEffect(() => {
    if (!ticketTorn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const params = new URLSearchParams(window.location.search);
      const scrollYParam = params.get('scrollY');
      const scrollToParam = params.get('scrollTo');
      if (scrollYParam) {
        const y = parseInt(scrollYParam, 10);
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        }, 150);
      } else if (scrollToParam) {
        setTimeout(() => {
          const el = document.getElementById(scrollToParam);
          if (el) {
            el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
          }
        }, 150);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [ticketTorn]);

  // Seamless transition: unlock scroll, kick ScrollExpand zoom, and fade overlay
  const handleTear = () => {
    setTicketTorn(true);
    document.body.style.overflow = '';
    
    // Smoothly initiate the ScrollExpand zoom sequence
    window.scrollTo({ top: 160, behavior: 'smooth' });

    // Fade out overlay after stub detachment
    setTimeout(() => {
      setTicketOverlayVisible(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F4F2ED] font-sans antialiased selection:bg-[#D71936] selection:text-white flex flex-col justify-between relative overflow-x-clip">
      
      {/* ============================================================ */}
      {/* STEP 2: GLOBAL SHAPEGRID TECH BLUEPRINT BACKGROUND           */}
      {/* ============================================================ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ShapeGrid
          direction="diagonal"
          speed={0.4}
          shape="square"
          lineColor="#262933"
          hoverColor="#D71936"
          hoverFillColor="#D71936"
          fillOpacity={0.25}
          glow={1}
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : undefined}
          className="w-full h-full"
        />
      </div>

      {/* ============================================================ */}
      {/* STEP 1: TEARTICKET ENTRANCE OVERLAY WITH "TEAR" RED STUB     */}
      {/* ============================================================ */}
      {ticketOverlayVisible && (
        <div
          className={`fixed inset-0 z-50 bg-[#090A0E]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-opacity duration-700 ease-out ${
            ticketTorn ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative w-[86vw] max-w-[340px] sm:w-full sm:max-w-[800px] flex justify-center">
            <TearTicket
              image="/art/luffy-waving.gif"
              imageAlt="Luffy Waving - Manga Portfolio Entrance"
              background="#090A0E"
              color="#F4F2ED"
              border={true}
              borderColor="#D71936"
              borderWidth={2}
              stubBackground="#D71936"
              width={800}
              height={350}
              stubSize={120}
              orientation="horizontal"
              tilt={true}
              onTear={handleTear}
              stub={
                <div className="h-full flex items-center justify-center">
                  <span
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    className="text-4xl font-heading tracking-widest text-white drop-shadow-md select-none pointer-events-none"
                  >
                    TEAR
                  </span>
                </div>
              }
            >
              <div className="p-8 text-left h-full flex flex-col justify-center relative z-10">
                <h2 className="font-heading text-5xl sm:text-6xl text-[#D71936] mb-4 tracking-wide uppercase drop-shadow-lg">
                  SEINEN MANGA ARCHIVE
                </h2>
                <p className="text-xl sm:text-2xl font-bold max-w-md text-[#F4F2ED] leading-snug drop-shadow-md">
                  Welcome to YOGESHKUMAR S PORTFOLIO. This is a Manga Themed Portfolio, Hope you like it!
                </p>
              </div>
            </TearTicket>
          </div>

          {/* Quick Click-to-Tear Button */}
          <button
            onClick={handleTear}
            className="mt-6 px-6 py-3 sm:py-2.5 min-h-[44px] border border-[#23252C] bg-[#14151B] hover:border-[#D71936] active:bg-[#D71936]/20 text-[#747C8B] hover:text-[#F4F2ED] active:text-white font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-noir font-heading tracking-wider touch-manipulation select-none"
            aria-label="Tear ticket and enter portfolio"
          >
            <span>[TEAR TICKET & ENTER PORTFOLIO ⮞]</span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* GLOBAL NAVIGATION — REACT BITS BUBBLEMENU                    */}
      {/* ============================================================ */}
      <BubbleMenu
        logo={null}
        useFixedPosition={true}
        menuBg="#D71936"
        menuContentColor="#F4F2ED"
        items={CHAPTERS_DATA.map((ch, idx) => ({
          label: `${ch.number} ${ch.title}`,
          href: `#${ch.id}`,
          ariaLabel: `${ch.number} ${ch.title} (${ch.kanji})`,
          rotation: idx % 2 === 0 ? -6 : 6,
          hoverStyles: {
            bgColor: '#090A0E',
            textColor: '#F4F2ED',
          },
        }))}
      />

      {/* ============================================================ */}
      {/* SLIM CONTINUOUS SCROLLING TEXT TICKER AT THE VERY TOP        */}
      {/* ============================================================ */}
      <TopMarqueeTicker />

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA — NATIVE VERTICAL SCROLL FLOW               */}
      {/* ============================================================ */}
      <main className="flex-1 relative z-10 space-y-0 bg-transparent">
        {/* CHAPTER 00 — PROLOGUE (HERO ENTRANCE VIA SCROLLEXPAND) */}
        {soloView === 'hero-direct' ? (
          <MangaSplashHero />
        ) : (!soloView || soloView === 'hero') ? (
          <ScrollExpand
            src="/art/one-piece-bg.jpg"
            title="YOGESHKUMAR S"
            useWindowScroll={true}
            scrollDistance={1.2}
            holdDistance={0}
            startWidth={38}
            startHeight={58}
            startRadius={20}
            smoothing={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.02 : 0.1}
            enabled={true}
            className="w-full bg-transparent"
          >
            <MangaSplashHero />
          </ScrollExpand>
        ) : null}

        {/* CHAPTER 01 — THE PERSON */}
        {(!soloView || soloView === 'about-skills' || soloView === 'person' || soloView === 'story') && (
          <MangaStorySequence />
        )}

        {/* CHAPTER 02 — MY ARSENAL */}
        {(!soloView || soloView === 'about-skills' || soloView === 'arsenal') && (
          <ArsenalSection />
        )}

        {/* CHAPTER 03 — MY CREATIONS */}
        {(!soloView || soloView === 'skillswap' || soloView === 'projects' || soloView === 'creations') && (
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
