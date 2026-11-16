import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { HankoStamp } from '../common/HankoStamp';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const MangaStorySequence: React.FC = () => {
  const isHoverQuery = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hover') === '1';

  const handleProceedToArsenal = (e: React.MouseEvent) => {
    e.preventDefault();
    const arsenalEl = document.getElementById('arsenal');
    if (arsenalEl) {
      arsenalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="person"
      className="relative min-h-screen py-16 sm:py-24 bg-transparent text-[#F4F2ED] border-b-2 border-[#23252C] overflow-hidden"
    >
      {/* Background Screentone Dots */}
      <div className="absolute inset-0 bg-screentone-dark opacity-40 pointer-events-none" />

      {/* Decorative Manga Chapter Title Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#23252C] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#D71936] text-white font-mono text-xs font-bold uppercase tracking-widest">
              第壱話
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F4F2ED] uppercase tracking-wide">
              THE PERSON
            </h2>
          </div>
          <div className="font-mono text-xs text-[#747C8B]">
            IDENTITY • ACADEMIC CREDENTIALS • ENGINEERING PILLARS
          </div>
        </div>
      </div>

      {/* Main Manga Panel Grid Composition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* PANEL 1: PROTAGONIST PORTRAIT (MANGA / REAL HOVER TOGGLE)     */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="lg:col-span-5 bg-[#F4F2ED] text-[#090A0E] border-4 border-[#090A0E] p-4 sm:p-5 shadow-noir relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-noir-lg"
          >
            {/* Header bar of panel */}
            <div className="flex items-center justify-between border-b-2 border-[#090A0E] pb-2 mb-3 font-mono text-xs">
              <span className="font-bold text-[#D71936]">IDENTITY</span>
              <span className="text-[#747C8B] font-bold">DOSSIER</span>
            </div>

            {/* Interactive Portrait Toggle: Manga by default (z-10), fades to opacity-0 on hover revealing real photo */}
            <div className="relative aspect-[4/5] w-full bg-[#090A0E] border-2 border-[#090A0E] overflow-hidden mb-3 group/portrait cursor-pointer select-none">
              {/* Real Photograph (Underneath, revealed on hover) */}
              <img
                src="/art/real-portrait.jpg"
                alt="Yogeshkumar S. — Real Photograph"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105 transition-transform duration-500 group-hover/portrait:scale-105"
              />

              {/* Manga Noir Artwork (Default visible on top, fades out on hover) */}
              <img
                src="/art/manga-portrait.jpg"
                alt="Yogeshkumar S. — Manga Noir Portrait"
                className={`absolute inset-0 w-full h-full object-cover object-center z-10 transition-opacity duration-500 ease-in-out group-hover/portrait:opacity-0 ${
                  isHoverQuery ? 'opacity-0' : ''
                }`}
              />

              {/* Japanese Sound Effect / Manga Accent Tag */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#D71936] text-white font-mono text-xs font-black -rotate-3 shadow-manga-crimson z-20 pointer-events-none">
                現実 (REALITY)
              </div>
            </div>

            {/* Persona Callout */}
            <div className="space-y-2">
              <div>
                <span className="font-mono text-[10px] text-[#D71936] font-bold uppercase tracking-wider block mb-0.5">
                  PROTAGONIST
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#090A0E] uppercase tracking-wide leading-tight font-black">
                  YOGESHKUMAR S
                </h3>
                {/* Single-line Founder position with link */}
                <div className="mt-1">
                  <a
                    href="https://createon-software.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-[#D71936] hover:underline inline-flex items-center gap-1 group/founder"
                  >
                    <span>Founder of CreateOn Software</span>
                    <span className="group-hover/founder:translate-x-0.5 transition-transform">⮞</span>
                  </a>
                </div>
              </div>

              <p className="font-mono text-xs text-[#3A3F4A] font-semibold leading-relaxed">
                {PROFILE_DATA.professionalPositioning}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#D5D2C9] font-mono text-[11px] text-[#747C8B]">
                <span>LOCATION: {PROFILE_DATA.location}</span>
                <span className="text-[#090A0E] font-bold">PORTFOLIO</span>
              </div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* RIGHT STACK: SPEECH BUBBLE + ACADEMIC DOSSIER (7 COLS)        */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'circOut' }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* PANEL 2: AUTHENTIC MANGA SPEECH BUBBLE & PHILOSOPHY */}
            <div
              className="manga-speech-bubble p-5 sm:p-6 bg-[#F4F2ED] text-[#090A0E] border-4 border-[#090A0E] shadow-noir"
            >
              <div className="flex items-center justify-between border-b-2 border-[#090A0E] pb-2 mb-3">
                <span className="font-mono text-xs text-[#D71936] font-bold uppercase tracking-wider">
                  DEVELOPER PHILOSOPHY
                </span>
                <HankoStamp label="学" size="sm" />
              </div>

              <p className="font-display text-2xl sm:text-3xl text-[#090A0E] leading-tight mb-3">
                "{PROFILE_DATA.tagline}"
              </p>

              <p className="font-sans text-sm sm:text-base text-[#23252C] leading-relaxed">
                {PROFILE_DATA.introduction}
              </p>
            </div>

            {/* PANEL 3: ACADEMIC CREDENTIALS (SRM IST RAMAPURAM) */}
            <div
              className="bg-[#14151B] border-2 border-[#23252C] p-5 sm:p-6 shadow-noir text-[#F4F2ED]"
            >
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#23252C]">
                <GraduationCap className="w-5 h-5 text-[#D71936]" />
                <h4 className="font-display text-xl sm:text-2xl text-[#F4F2ED] uppercase tracking-wide">
                  ACADEMIC FOUNDATION
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {/* Institution & Campus */}
                <div className="bg-[#090A0E] border border-[#23252C] p-3">
                  <span className="text-[10px] text-[#747C8B] block mb-1">INSTITUTION & CAMPUS</span>
                  <span className="font-bold text-[#F4F2ED] text-sm block">
                    {PROFILE_DATA.education.institution}
                  </span>
                  <span className="text-[#D71936] text-xs font-bold block mt-0.5">
                    {PROFILE_DATA.education.campus} Campus
                  </span>
                </div>

                {/* Degree & Period */}
                <div className="bg-[#090A0E] border border-[#23252C] p-3">
                  <span className="text-[10px] text-[#747C8B] block mb-1">DEGREE & TIMELINE</span>
                  <span className="font-bold text-[#F4F2ED] text-xs block">
                    {PROFILE_DATA.education.degree}
                  </span>
                  <span className="text-[#9DA6B8] text-xs block mt-0.5">
                    {PROFILE_DATA.education.period}
                  </span>
                </div>
              </div>

              {/* GPA Highlight Banner */}
              <div className="mt-4 p-3 bg-[#090A0E] border-2 border-[#D71936] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#D71936] font-bold block">
                    ACADEMIC STANDING
                  </span>
                  <span className="font-mono text-xs text-[#9DA6B8]">
                    Consistent academic rigor across undergraduate coursework
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl text-white block">
                    {PROFILE_DATA.education.gpa}
                    <span className="text-sm font-mono text-[#747C8B]"> / 10.0</span>
                  </span>
                </div>
              </div>
            </div>

            {/* PANEL 4: TECHNICAL DOMAINS & ACTION PROMPT */}
            <div
              className="bg-[#14151B] border border-[#23252C] p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <span className="font-mono text-[10px] text-[#D71936] font-bold uppercase tracking-wider block mb-1">
                  CORE FOCUS DOMAINS
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {PROFILE_DATA.interests.slice(0, 6).map((item) => (
                    <span key={item} className="px-2 py-0.5 bg-[#090A0E] border border-[#23252C] text-[#F4F2ED]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProceedToArsenal}
                className="shrink-0 px-4 py-2.5 bg-[#D71936] hover:bg-[#B5122B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-manga-crimson"
              >
                <span>MY ARSENAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
