import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectRecord } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { HankoStamp } from '../common/HankoStamp';

export interface SkillSwapMangaSpreadProps {
  embedded?: boolean;
  onOpenModal?: (project: ProjectRecord) => void;
}

export const SkillSwapMangaSpread: React.FC<SkillSwapMangaSpreadProps> = ({
  embedded = false,
  onOpenModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const skillswap = PROJECTS_DATA.find((p) => p.id === 'skillswap') || PROJECTS_DATA[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 12,
      rotateY: x * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleOpenModal = () => {
    if (onOpenModal) {
      onOpenModal(skillswap);
    } else {
      setSelectedProject(skillswap);
      setIsModalOpen(true);
    }
  };

  const spreadContent = (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="transition-all duration-300"
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        className="bg-[#F4F2ED] text-[#090A0E] border-4 border-[#090A0E] shadow-noir p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        {/* Top Manga Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b-4 border-[#090A0E] pb-4 mb-6 gap-4">
          <div>
            <span className="font-mono text-xs text-[#D71936] font-bold uppercase tracking-widest block mb-1">
              WORK 01 // LEAD ENGINEERING SHOWCASE
            </span>
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#090A0E] uppercase tracking-tight">
              SKILLSWAP<span className="text-[#D71936]">.</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <HankoStamp label="創" size="md" />
            <div className="font-mono text-right text-xs">
              <span className="text-[#D71936] font-bold block">PEER EXCHANGE PLATFORM</span>
              <span className="text-[#747C8B]">FULL-STACK REACT &bull; FIREBASE</span>
            </div>
          </div>
        </div>

        {/* Asymmetrical 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dimensional Manga Artwork Frame (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full bg-[#090A0E] border-4 border-[#090A0E] overflow-hidden group shadow-noir cursor-pointer" onClick={handleOpenModal}>
              <img
                src="/art/manga/skillswap-manga.jpg"
                alt="SkillSwap Collaborative Peer Learning Manga Scene"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Explicit Mockup & Art Safeguard Label */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#090A0E]/95 text-white font-mono text-[10px] font-bold border border-[#23252C] tracking-wider uppercase">
                ILLUSTRATIVE PREVIEW // CONCEPTUAL ARTWORK
              </div>

              {/* Japanese Sound Effect Overlay */}
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#D71936] text-white font-mono text-sm font-black -rotate-3 shadow-manga-crimson">
                ズズズ... (CONNECTING)
              </div>
            </div>

            {/* Subtitle & Value Proposition */}
            <div className="p-4 bg-white border-2 border-[#090A0E] font-sans text-xs sm:text-sm text-[#23252C] leading-relaxed">
              <p className="font-display text-lg text-[#090A0E] mb-1">
                "EXCHANGE SKILLS INSTEAD OF PAYING FOR EXPENSIVE COURSES."
              </p>
              <p>
                {skillswap.summary}
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Highlights & Verification Links (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Architecture Highlights Panel */}
            <div className="bg-white border-2 border-[#090A0E] p-5 shadow-noir">
              <span className="font-mono text-xs text-[#D71936] font-bold uppercase tracking-widest block mb-3 pb-2 border-b border-[#E5E2D9]">
                SYSTEM ARCHITECTURE // 技術基盤
              </span>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D71936] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090A0E] block">Real-Time Messaging</strong>
                    <span className="text-[#747C8B] text-[11px]">Instant text communications and active notifications</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D71936] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090A0E] block">Jitsi Meet API Video Sessions</strong>
                    <span className="text-[#747C8B] text-[11px]">Integrated 1-on-1 virtual mentoring classrooms</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D71936] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090A0E] block">Gamified XP & Streaks</strong>
                    <span className="text-[#747C8B] text-[11px]">Achievement incentives and skill reciprocity metrics</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D71936] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090A0E] block">Firebase Cloud Architecture</strong>
                    <span className="text-[#747C8B] text-[11px]">Authentication, Firestore database and secure hosting</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="p-4 bg-[#14151B] border-2 border-[#090A0E] text-[#F4F2ED]">
              <span className="font-mono text-[10px] text-[#747C8B] uppercase tracking-wider block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {skillswap.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-[#090A0E] text-[#F4F2ED] border border-[#23252C]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Verified Actions */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap gap-3">
                {skillswap.liveUrl && (
                  <a
                    href={skillswap.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[#D71936] hover:bg-[#B5122B] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-manga-crimson transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LIVE APPLICATION</span>
                  </a>
                )}

                {skillswap.githubUrl && (
                  <a
                    href={skillswap.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#090A0E] hover:bg-[#23252C] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>

              <button
                onClick={handleOpenModal}
                className="w-full py-2.5 bg-white border-2 border-[#090A0E] hover:bg-[#090A0E] hover:text-white text-[#090A0E] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D71936]" />
                <span>OPEN FULL CASE STUDY MODAL</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Section Link */}
        <div className="mt-8 pt-4 border-t-2 border-[#090A0E] flex items-center justify-between font-mono text-xs text-[#747C8B]">
          <span className="font-bold text-[#090A0E]">
            NEXT: EXPLORE 7 OTHER APPLICATIONS IN CREATIONS CATALOG
          </span>

          <a
            href="#catalog-grid"
            className="text-[#D71936] hover:underline font-bold flex items-center gap-1"
          >
            <span>VIEW REMAINING 7 WORKS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );

  if (embedded) {
    return spreadContent;
  }

  return (
    <section
      id="skillswap"
      className="relative min-h-screen py-16 sm:py-24 bg-[#090A0E] text-[#F4F2ED] border-b-2 border-[#23252C] overflow-hidden"
    >
      {/* Background Screentone Dots */}
      <div className="absolute inset-0 bg-screentone-dark opacity-35 pointer-events-none" />

      {/* Chapter 03 Lead Spread Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#23252C] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#D71936] text-white font-mono text-xs font-bold uppercase tracking-widest">
              第参話 // ACT 03
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F4F2ED] uppercase tracking-wide">
              MY CREATIONS // LEAD WORK: SKILLSWAP
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#747C8B]">
            <span className="px-2 py-0.5 bg-[#16A34A] text-white font-bold">DEPLOYED APPLICATION</span>
            <span>•</span>
            <span>CASE STUDY SPREAD</span>
          </div>
        </div>
      </div>

      {/* Main 3D Perspective Manga Spread Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {spreadContent}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
};
