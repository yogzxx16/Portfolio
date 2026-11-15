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
            ? 'bg-[#FAF8F5]/95 backdrop-blur-xs border-b-2 border-[#151515] shadow-xs'
            : 'bg-[#FAF8F5] border-b-2 border-[#151515]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Logo & Edition */}
          <div className="flex items-center gap-3">
            <a
              href="#prologue"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#E53935]"
              aria-label="Yogesh - The Developer's Story Home"
            >
              <div className="w-6 h-6 bg-[#151515] text-[#F4F0E8] flex items-center justify-center font-display text-sm font-bold group-hover:bg-[#E53935] transition-colors">
                Y
              </div>
              <span className="font-display text-2xl tracking-wider uppercase text-[#151515]">
                YOGESH<span className="text-[#E53935]">.</span>
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#151515]/20 font-mono text-[11px] text-[#55524E]">
              <span className="px-1.5 py-0.5 bg-[#E53935] text-white font-bold">VOL. 01</span>
              <span>ED. 2026</span>
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
                      ? 'bg-[#151515] text-[#F4F0E8] border-[#151515] shadow-xs'
                      : 'bg-transparent text-[#151515] border-transparent hover:border-[#151515] hover:bg-[#EAE5DC]'
                  } focus:outline-none focus:ring-2 focus:ring-[#E53935]`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-[#E53935] font-bold'
                        : 'text-[#151515] font-bold'
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
              href="#chapter-05"
              onClick={(e) => handleLinkClick(e, 'chapter-05')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#151515] bg-[#FAF8F5] text-[#151515] font-mono text-xs font-bold hover:bg-[#E53935] hover:border-[#E53935] hover:text-white transition-colors shadow-xs active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>CONNECT</span>
              <span className="text-[#E53935] group-hover:text-white">●</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 border-2 border-[#151515] bg-[#FAF8F5] text-[#151515] hover:bg-[#EAE5DC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ink Reading Progress Bar */}
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
