import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChapterHeader } from '../common/ChapterHeader';
import { HankoStamp } from '../common/HankoStamp';
import FolderFloat from '../react-bits/FolderFloat';
import { Terminal, Cpu } from 'lucide-react';

interface SkillFolderGroup {
  id: string;
  label: string;
  sublabel: string;
  items: string[];
}

const SKILL_FOLDERS: SkillFolderGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    sublabel: 'Technologies',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Vite', 'Motion', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend',
    sublabel: 'Architecture',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Mongoose'],
  },
  {
    id: 'databases',
    label: 'Databases',
    sublabel: 'Storage & Schema',
    items: ['MongoDB', 'Firebase Firestore', 'PostgreSQL', 'Cloud DBs'],
  },
  {
    id: 'languages',
    label: 'Languages',
    sublabel: 'Core Syntax',
    items: ['JavaScript (ES6+)', 'Python', 'C', 'C++', 'TypeScript'],
  },
  {
    id: 'tools',
    label: 'Tools & Cloud',
    sublabel: 'DevOps & Tooling',
    items: ['Git', 'GitHub', 'Vercel', 'Render', 'Postman', 'Firebase Hosting'],
  },
];

export const ArsenalSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="arsenal"
      className="relative min-h-screen py-16 sm:py-24 border-b-2 border-[#23252C] bg-transparent text-[#F4F2ED] overflow-hidden"
    >
      {/* Anchor for alternative hash */}
      <div id="my-arsenal" className="absolute -top-20" />

      {/* 1. Manga Screentone Texture Overlay */}
      <div className="absolute inset-0 bg-screentone-dark opacity-30 pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header with Animated Shuffle Heading */}
        <ChapterHeader
          number="02"
          title="MY ARSENAL"
          kanji="技術"
          theme="dark"
        />

        {/* Technical Inventory Badge Strip */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#23252C] pb-3 mb-10 gap-3 font-mono text-xs text-[#747C8B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D71936] animate-pulse" />
            <span className="text-[#F4F2ED] font-bold uppercase tracking-wider">
              VERIFIED PROFICIENCIES
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#14151B] border border-[#23252C] text-[#D71936] font-bold text-[10px]">
              5 CLASSIFIED FOLDERS
            </span>
            <HankoStamp label="技" size="sm" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* FOLDERFLOAT RESPONSIVE GRID SHOWCASE                         */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="pt-20 pb-20 px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 gap-y-36 max-w-6xl mx-auto">
            {SKILL_FOLDERS.map((group) => (
              <div
                key={group.id}
                className="flex flex-col items-center justify-center relative group select-none w-full"
              >
                {/* Physical Interactive FolderFloat Module */}
                <div className="relative z-20 flex items-center justify-center">
                  <FolderFloat
                    items={group.items}
                    label={group.label}
                    sublabel={group.sublabel}
                    folderColor="#090A0E"
                    frontColor="#23252C"
                    paperColor="#F4F2ED"
                    itemColor="#F4F2ED"
                    itemTextColor="#090A0E"
                    labelColor="#F4F2ED"
                    trigger="hover"
                    lift={110}
                    spread={150}
                    width={290}
                    height={165}
                  />
                </div>

                {/* Tactical Folder Index Label Beneath */}
                <div className="mt-8 text-center font-mono">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#F4F2ED] uppercase tracking-wider font-heading">
                    <Terminal className="w-3.5 h-3.5 text-[#D71936]" />
                    <span>{group.label}</span>
                  </div>
                  <span className="text-[11px] text-[#747C8B] tracking-wider uppercase block mt-0.5">
                    {group.items.length} proficiencies
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Luffy Background with Radial Mask Blend, Subtle Hover & Scroll Parallax */}
        <motion.img
          style={{
            y,
            willChange: 'transform',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 75%)',
            maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 75%)',
          }}
          src="/art/luffy-smiling.png"
          alt="Luffy Smiling - Arsenal Background"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/art/luffy-smiling.jpg';
          }}
          className="absolute bottom-0 right-0 w-[800px] max-w-full translate-x-32 lg:translate-x-52 opacity-[0.08] grayscale mix-blend-screen transition-all duration-700 hover:grayscale-[50%] hover:opacity-30 z-0 cursor-crosshair select-none"
        />

        {/* Bottom Technical Summary Strip */}
        <div className="mt-14 pt-6 border-t-2 border-[#23252C] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#747C8B]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#D71936]" />
            <span className="text-[#F4F2ED] font-bold">TOTAL VERIFIED STACK:</span>
            <span>23 Core Technologies & Tools</span>
          </div>
        </div>

      </div>
    </section>
  );
};
