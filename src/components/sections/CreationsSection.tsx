import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PROJECTS_DATA,
  ARCHIVED_PROJECTS,
  TOTAL_PROJECTS_COUNT,
  PUBLIC_DEMOS_COUNT,
  DEPLOYED_APPLICATIONS_COUNT,
} from '../../data/projects';
import { ProjectRecord } from '../../types';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { InkButton } from '../common/InkButton';
import { ProjectEditorialArtwork } from '../illustrations/ProjectEditorialArtwork';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';

export const CreationsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = [
    'All',
    'Deployed Applications',
    'Full-Stack Projects',
    'Hackathon Prototypes',
    'Conceptual UI',
  ];

  // All 8 projects filtered equally in a single uniform collection
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    if (activeFilter === 'Deployed Applications') {
      return PROJECTS_DATA.filter((p) => p.maturity === 'Deployed Application');
    }
    if (activeFilter === 'Full-Stack Projects') {
      return PROJECTS_DATA.filter((p) => p.maturity === 'Full-Stack Prototype');
    }
    if (activeFilter === 'Hackathon Prototypes') {
      return PROJECTS_DATA.filter((p) => p.maturity === 'Hackathon Prototype');
    }
    if (activeFilter === 'Conceptual UI') {
      return PROJECTS_DATA.filter((p) => p.maturity === 'Conceptual UI');
    }
    return PROJECTS_DATA;
  }, [activeFilter]);

  const handleOpenModal = (project: ProjectRecord) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="creations"
      className="relative py-16 sm:py-24 border-b-2 border-[#23252C] bg-transparent text-[#F4F2ED] overflow-hidden"
    >
      {/* Anchors for alternative hashes */}
      <div id="my-creations" className="absolute -top-20" />
      <div id="skillswap" className="absolute -top-20" />
      <div id="projects" className="absolute -top-20" />
      
      {/* Background Screentone Dot Matrix Texture */}
      <div className="absolute inset-0 bg-screentone-dark opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header — Single Chapter 03 Header for the Entire Block */}
        <ChapterHeader
          number="03"
          title="MY CREATIONS"
          kanji="制作物"
          subtitle="A curated portfolio of full-stack platforms, accessible utilities, AI-integrated workflows, and responsive web products."
          theme="dark"
        />

        {/* Dynamic Metrics Header Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <MangaPanel variant="noir" tag="VOLUME METRIC">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              {TOTAL_PROJECTS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Total Documented Works
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="DEPLOYED WORKS">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#D71936] block">
              0{DEPLOYED_APPLICATIONS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Live Production Platforms
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="PUBLIC ACCESS">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              0{PUBLIC_DEMOS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Public Interactive Demos
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="ARCHIVES">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              {ARCHIVED_PROJECTS.length}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Indexed Repositories
            </span>
          </MangaPanel>
        </div>

        {/* Interactive Filter Control Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#23252C]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F4F2ED] uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#D71936]" />
            <span>FILTER ARCHIVES ({filteredProjects.length} OF {TOTAL_PROJECTS_COUNT}):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D71936] text-white border-[#D71936] shadow-noir font-bold'
                      : 'bg-[#14151B] text-[#9DA6B8] border-[#23252C] hover:text-[#F4F2ED] hover:border-[#D71936]'
                  } focus:outline-none focus:ring-2 focus:ring-[#D71936]`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* UNIFORM 8-PROJECT CSS GRID — EQUAL TREATMENT FOR ALL WORKS   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: 'easeOut',
                  }}
                  className="flex flex-col h-full"
                >
                  <MangaPanel
                    variant={isEven ? 'default' : 'wash'}
                    tag={`WORK 0${idx + 1}`}
                    notch={isEven ? 'top-right' : 'bottom-right'}
                    className="p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:border-[#D71936] hover:shadow-noir-lg flex flex-col justify-between h-full"
                  >
                    {/* Oversized Decorative Chapter Index Backdrop */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-6 -right-2 font-display text-8xl sm:text-9xl text-[#090A0E] opacity-[0.05] pointer-events-none select-none z-0"
                    >
                      0{idx + 1}
                    </div>

                    <div className="relative z-10 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Artwork Schematics Preview */}
                        <div
                          className="relative group cursor-pointer shadow-noir overflow-hidden border-2 border-[#090A0E] mb-4 aspect-[16/9] w-full bg-[#090A0E]"
                          onClick={() => handleOpenModal(project)}
                        >
                          <ProjectEditorialArtwork projectId={project.id} />
                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 bg-[#090A0E]/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                            <span className="font-mono text-xs text-white font-bold tracking-widest uppercase border border-white px-3.5 py-2 flex items-center gap-2 bg-[#090A0E]">
                              <Eye className="w-4 h-4 text-[#D71936]" />
                              <span>INSPECT SPECIFICATION</span>
                            </span>
                          </div>
                        </div>

                        {/* Project Index & Maturity */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#090A0E]/15 pb-2 mb-2">
                          <span className="font-mono text-xs font-bold text-[#D71936]">
                            INDEX 0{idx + 1}
                          </span>
                          <TechBadge
                            name={project.maturity}
                            variant={project.liveUrl ? 'accent' : 'muted'}
                            size="sm"
                          />
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="font-display text-3xl sm:text-4xl text-[#090A0E] uppercase tracking-wide leading-none">
                            {project.title}
                          </h3>
                          <p className="font-mono text-xs text-[#3A3F4A] mt-1 font-semibold">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Problem Context Callout if available */}
                        {project.problemStatement && (
                          <div className="mt-3 p-2.5 bg-white/90 border-l-4 border-[#D71936] text-xs font-sans text-[#3A3F4A] leading-relaxed shadow-sm">
                            <span className="font-mono text-[9px] font-bold text-[#D71936] uppercase tracking-wider block mb-0.5">
                              CHALLENGE CONTEXT
                            </span>
                            {project.problemStatement}
                          </div>
                        )}

                        {/* Summary */}
                        <p className="font-sans text-xs sm:text-sm text-[#090A0E] leading-relaxed font-medium mt-3">
                          {project.summary}
                        </p>

                        {/* Top 2 Documented Features */}
                        <div className="space-y-1 py-2">
                          {project.keyFeatures.slice(0, 2).map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-[#3A3F4A]">
                              <span className="text-[#D71936] font-bold">▶</span>
                              <span className="font-sans font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techStack.slice(0, 6).map((tech) => (
                            <TechBadge
                              key={tech}
                              name={tech}
                              variant="default"
                              size="sm"
                              className="hover:border-[#D71936] transition-colors"
                            />
                          ))}
                          {project.techStack.length > 6 && (
                            <span className="px-1.5 py-0.5 font-mono text-[10px] text-[#747C8B] bg-white border border-[#23252C]">
                              +{project.techStack.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#090A0E]/15 mt-auto">
                        {project.liveUrl && (
                          <InkButton
                            variant="primary"
                            size="sm"
                            href={project.liveUrl}
                            target="_blank"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            LIVE DEMO
                          </InkButton>
                        )}

                        {project.githubUrl && (
                          <InkButton
                            variant="secondary"
                            size="sm"
                            href={project.githubUrl}
                            target="_blank"
                            icon={<Github className="w-3.5 h-3.5" />}
                          >
                            GITHUB
                          </InkButton>
                        )}

                        <InkButton
                          variant="accent"
                          size="sm"
                          onClick={() => handleOpenModal(project)}
                          icon={<Eye className="w-3.5 h-3.5" />}
                        >
                          DEEP DIVE
                        </InkButton>
                      </div>
                    </div>
                  </MangaPanel>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Detail Modal / Drawer */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
