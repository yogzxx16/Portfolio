import React from 'react';
import { motion, type Variants } from 'motion/react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { Code2, Layout, Server, Database, Wrench, Sparkles, Terminal } from 'lucide-react';

export const ArsenalSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    languages: <Code2 className="w-4 h-4 text-[#D71936]" />,
    frontend: <Layout className="w-4 h-4 text-[#D71936]" />,
    backend: <Server className="w-4 h-4 text-[#D71936]" />,
    databases: <Database className="w-4 h-4 text-[#D71936]" />,
    tools: <Wrench className="w-4 h-4 text-[#D71936]" />,
    additional: <Sparkles className="w-4 h-4 text-[#D71936]" />,
  };

  const categoryDescriptions: Record<string, string> = {
    languages: 'Core computational logic and syntax for algorithms, systems programming, and modern web applications.',
    frontend: 'Interactive single-page apps, responsive UI architecture, and fluid motion design systems.',
    backend: 'RESTful endpoint design, server orchestration, and secure authenticated application backbones.',
    databases: 'Document datastores, relational schemas, and persistent cloud-hosted database solutions.',
    tools: 'Version control lifecycle, continuous deployment automation, and modern developer environments.',
    additional: 'Advanced prompt engineering, numerical analysis, and spreadsheet data manipulation.',
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="arsenal"
      className="relative py-16 sm:py-24 border-b-2 border-[#23252C] bg-[#090A0E] text-[#F4F2ED] overflow-hidden"
    >
      {/* Anchor for alternative hash */}
      <div id="my-arsenal" className="absolute -top-20" />
      {/* Background Screentone Dot Matrix Texture */}
      <div className="absolute inset-0 bg-screentone-dark opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <ChapterHeader
          number="02"
          title="MY ARSENAL"
          kanji="技術"
          subtitle="Grounded technical competencies organized across system layers — zero arbitrary percentages or exaggerated proficiency."
          theme="dark"
        />

        {/* 6 Asymmetrical Manga Panels */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
        >
          {SKILL_CATEGORIES.map((category, index) => {
            // Asymmetrical grid column spans:
            // Frontend: 7 cols, Backend: 5 cols
            // Languages: 4 cols, Databases: 4 cols, Tools: 4 cols
            // Additional: 12 cols full-width banner
            let colSpan = 'lg:col-span-4';
            let variant: 'default' | 'wash' | 'ink' = 'default';
            let notch: 'none' | 'top-right' | 'bottom-right' = 'none';

            if (category.id === 'frontend') {
              colSpan = 'lg:col-span-7';
              notch = 'top-right';
            } else if (category.id === 'backend') {
              colSpan = 'lg:col-span-5';
              variant = 'wash';
            } else if (category.id === 'languages') {
              colSpan = 'lg:col-span-4';
              variant = 'wash';
            } else if (category.id === 'databases') {
              colSpan = 'lg:col-span-4';
            } else if (category.id === 'tools') {
              colSpan = 'lg:col-span-4';
              notch = 'bottom-right';
            } else if (category.id === 'additional') {
              colSpan = 'lg:col-span-12';
              variant = 'ink';
            }

            const isInk = variant === 'ink';

            return (
              <motion.div
                key={category.id}
                variants={panelVariants}
                className={`${colSpan} flex flex-col`}
              >
                <MangaPanel
                  variant={variant}
                  notch={notch}
                  hoverEffect
                  tag={`SEC 0${index + 1}`}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Panel Top Meta */}
                    <div
                      className={`flex items-center justify-between pb-3 mb-3 border-b ${
                        isInk ? 'border-[#23252C]' : 'border-[#090A0E]/15'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {iconMap[category.id] || <Terminal className="w-4 h-4 text-[#D71936]" />}
                        <span
                          className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                            isInk ? 'text-[#F4F2ED]' : 'text-[#090A0E]'
                          }`}
                        >
                          {category.title}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-xs tracking-widest font-bold ${
                          isInk ? 'text-[#D71936]' : 'text-[#747C8B]'
                        }`}
                      >
                        {category.editorialLabel}
                      </span>
                    </div>

                    {/* Category Title Heading */}
                    <h3
                      className={`font-display text-2xl sm:text-3xl uppercase tracking-wide mb-2 ${
                        isInk ? 'text-[#F4F2ED]' : 'text-[#090A0E]'
                      }`}
                    >
                      {category.title}
                    </h3>

                    {/* Editorial Category Description */}
                    <p
                      className={`font-sans text-xs leading-relaxed mb-4 ${
                        isInk ? 'text-[#9DA6B8]' : 'text-[#3A3F4A]'
                      }`}
                    >
                      {categoryDescriptions[category.id]}
                    </p>

                    {/* Skill Badges Flow */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group relative transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5"
                        >
                          <TechBadge
                            name={skill.name}
                            variant={
                              isInk
                                ? 'noir'
                                : category.id === 'frontend' || category.id === 'languages'
                                ? 'default'
                                : 'muted'
                            }
                            size="md"
                            className={`${
                              isInk
                                ? 'hover:border-[#D71936]'
                                : 'group-hover:border-[#D71936] group-hover:bg-white'
                            } transition-colors cursor-default shadow-sm`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel Footer Tag */}
                  <div
                    className={`mt-6 pt-3 border-t flex items-center justify-between font-mono text-[10px] ${
                      isInk
                        ? 'border-[#23252C] text-[#9DA6B8]'
                        : 'border-[#090A0E]/10 text-[#747C8B]'
                    }`}
                  >
                    <span>{category.skills.length} VERIFIED STACK ITEMS</span>
                    <span className="text-[#D71936] font-bold">
                      ● ACTIVE
                    </span>
                  </div>
                </MangaPanel>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section Bottom Manga Issue Footer Note */}
        <div className="mt-8 pt-4 border-t border-[#23252C] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#9DA6B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D71936]" />
            <span>CHAPTER 02 COMPLETE // CHAPTER 03 (MY CREATIONS) NEXT</span>
          </div>
          <span className="text-[#747C8B] font-semibold">6 CATEGORIES • ZERO EXAGGERATION</span>
        </div>
      </div>
    </section>
  );
};
