import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { CHAPTERS_DATA } from '../../data/chapters';
import { ReadingProgress } from './ReadingProgress';
import { MobileDrawer } from './MobileDrawer';

export interface VolumeNavbarProps {
  activeChapterId?: string;
  onNavigate?: (chapterId: string) => void;
}

export const VolumeNavbar: React.FC<VolumeNavbarProps> = ({
  activeChapterId = 'prologue',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (_e: React.MouseEvent<HTMLAnchorElement>, chapterId: string) => {
    if (onNavigate) {
      onNavigate(chapterId);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#090A0E]/95 backdrop-blur-md border-b-2 border-[#23252C] shadow-noir'
            : 'bg-[#090A0E] border-b-2 border-[#23252C]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Logo & Edition */}
          <div className="flex items-center gap-3">
            <a
              href="#prologue"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#D71936]"
              aria-label="Yogesh - The Developer's Story Home"
            >
              <div className="w-6 h-6 bg-[#D71936] text-white flex items-center justify-center font-display text-sm font-bold group-hover:bg-[#A81229] transition-colors">
                Y
              </div>
              <span className="font-display text-2xl tracking-wider uppercase text-[#F4F2ED]">
                YOGESH<span className="text-[#D71936]">.</span>
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#23252C] font-mono text-[11px] text-[#747C8B]">
              <span className="px-1.5 py-0.5 bg-[#D71936] text-white font-bold">MANGA NOIR</span>
              <span>VOL. 01</span>
            </div>
          </div>

          {/* Desktop Chapter Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 font-mono text-xs">
            {CHAPTERS_DATA.map((chapter) => {
              const isActive = activeChapterId === chapter.id;
              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={(e) => handleLinkClick(e, chapter.id)}
                  className={`px-2.5 py-1.5 transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#14151B] text-[#F4F2ED] border-[#D71936] shadow-crimson'
                      : 'bg-transparent text-[#747C8B] border-transparent hover:border-[#23252C] hover:bg-[#14151B] hover:text-[#F4F2ED]'
                  } focus:outline-none focus:ring-2 focus:ring-[#D71936]`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-[#D71936] font-bold'
                        : 'text-[#747C8B] font-bold'
                    }
                  >
                    {chapter.number}
                  </span>
                  <span className="font-sans font-bold tracking-tight">{chapter.title}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#next-chapter"
              onClick={(e) => handleLinkClick(e, 'next-chapter')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#D71936] bg-[#D71936] text-white font-mono text-xs font-bold hover:bg-[#A81229] hover:border-[#A81229] transition-colors shadow-noir active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>CONNECT</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 border border-[#23252C] bg-[#14151B] text-[#F4F2ED] hover:bg-[#23252C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D71936]"
              aria-label="Open Manga Chapter Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Reading Progress Indicator Bar */}
        <ReadingProgress />
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeChapterId={activeChapterId}
        onNavigate={onNavigate}
      />
    </>
  );
};
