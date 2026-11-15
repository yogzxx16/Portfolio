import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FEATURED_PROJECTS,
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
import { ExternalLink, Github, Eye, Filter, Archive } from 'lucide-react';

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

  // Dynamically filter featured projects
  const filteredFeaturedProjects = useMemo(() => {
    if (activeFilter === 'All') return FEATURED_PROJECTS;
    if (activeFilter === 'Deployed Applications') {
      return FEATURED_PROJECTS.filter((p) => p.maturity === 'Deployed Application');
    }
    if (activeFilter === 'Full-Stack Projects') {
      return FEATURED_PROJECTS.filter((p) => p.maturity === 'Full-Stack Prototype');
    }
    if (activeFilter === 'Hackathon Prototypes') {
      return FEATURED_PROJECTS.filter((p) => p.maturity === 'Hackathon Prototype');
    }
    if (activeFilter === 'Conceptual UI') {
      return FEATURED_PROJECTS.filter((p) => p.maturity === 'Conceptual UI');
    }
    return FEATURED_PROJECTS;
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
      className="relative py-16 sm:py-24 border-b-2 border-[#23252C] bg-[#090A0E] text-[#F4F2ED] overflow-hidden"
    >
      {/* Anchor for alternative hash */}
      <div id="my-creations" className="absolute -top-20" />
      {/* Background Screentone Dot Matrix Texture */}
      <div className="absolute inset-0 bg-screentone-dark opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <ChapterHeader
          number="03"
          title="MY CREATIONS"
          kanji="制作物"
          subtitle="A curated portfolio of full-stack platforms, accessible utilities, AI-integrated workflows, and responsive web products."
          theme="dark"
        />

        {/* Dynamic Metrics Header Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MangaPanel variant="noir" tag="VOLUME METRIC">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              {TOTAL_PROJECTS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Total Documented Works
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="EDITORIAL">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              {FEATURED_PROJECTS.length}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Featured Spreads
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="PUBLIC ACCESS">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#D71936] block">
              {PUBLIC_DEMOS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Public Live Demos
            </span>
          </MangaPanel>

          <MangaPanel variant="noir" tag="ARCHIVES">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F2ED] block">
              {ARCHIVED_PROJECTS.length}
            </span>
            <span className="font-mono text-xs text-[#9DA6B8]">
              Indexed Experiments ({DEPLOYED_APPLICATIONS_COUNT} Deployed)
            </span>
          </MangaPanel>
        </div>

        {/* Interactive Filter Control Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#23252C]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F4F2ED] uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#D71936]" />
            <span>FILTER ARCHIVES:</span>
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

        {/* Featured Project Spreads Stream */}
        <div className="space-y-16 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredFeaturedProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <MangaPanel
                    variant={isEven ? 'default' : 'wash'}
                    tag={`SPREAD 0${idx + 1}`}
                    notch={isEven ? 'top-right' : 'bottom-right'}
                    className="p-6 sm:p-8 relative overflow-hidden"
                  >
                    {/* Oversized Decorative Chapter Index Backdrop */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-6 -right-2 font-display text-8xl sm:text-9xl text-[#090A0E] opacity-[0.05] pointer-events-none select-none z-0"
                    >
                      0{idx + 1}
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Side: Artwork Schematics */}
                      <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div
                          className="relative group cursor-pointer shadow-noir overflow-hidden border-2 border-[#090A0E]"
                          onClick={() => handleOpenModal(project)}
                        >
                          <ProjectEditorialArtwork projectId={project.id} />
                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 bg-[#090A0E]/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                            <span className="font-mono text-xs text-white font-bold tracking-widest uppercase border border-white px-3.5 py-2 flex items-center gap-2 bg-[#090A0E]">
                              <Eye className="w-4 h-4 text-[#D71936]" />
                              <span>INSPECT ARCHITECTURE // SPEC</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Narrative Specifications */}
                      <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Project Index & Maturity */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#090A0E]/15 pb-2">
                          <span className="font-mono text-xs font-bold text-[#D71936]">
                            ACT 0{idx + 1} // {project.chapterIndex}
                          </span>
                          <TechBadge
                            name={project.maturity}
                            variant={project.liveUrl ? 'accent' : 'muted'}
                            size="sm"
                          />
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#090A0E] uppercase tracking-wide leading-[0.9]">
                            {project.title}
                          </h3>
                          <p className="font-mono text-xs sm:text-sm text-[#3A3F4A] mt-1 font-semibold">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Problem Context Callout if available */}
                        {project.problemStatement && (
                          <div className="p-3 bg-white/90 border-l-4 border-[#D71936] text-xs font-sans text-[#3A3F4A] leading-relaxed shadow-sm">
                            <span className="font-mono text-[9px] font-bold text-[#D71936] uppercase tracking-wider block mb-0.5">
                              CHALLENGE CONTEXT
                            </span>
                            {project.problemStatement}
                          </div>
                        )}

                        {/* Summary */}
                        <p className="font-sans text-sm sm:text-base text-[#090A0E] leading-relaxed font-medium">
                          {project.summary}
                        </p>

                        {/* Top 3 Documented Features */}
                        <div className="space-y-1.5 py-1">
                          {project.keyFeatures.slice(0, 3).map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-[#3A3F4A]">
                              <span className="text-[#D71936] font-bold">▶</span>
                              <span className="font-sans font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techStack.map((tech) => (
                            <TechBadge
                              key={tech}
                              name={tech}
                              variant="default"
                              size="sm"
                              className="hover:border-[#D71936] transition-colors"
                            />
                          ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
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
                    </div>
                  </MangaPanel>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Compact Archived Projects Index */}
        <div className="mt-16">
          <MangaPanel variant="noir" tag="COMPACT ARCHIVE INDEX" notch="none">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#23252C]">
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-[#D71936]" />
                <h4 className="font-display text-2xl text-[#F4F2ED] uppercase tracking-wide">
                  SUPPLEMENTARY WORKS & EXPERIMENTS ({ARCHIVED_PROJECTS.length})
                </h4>
              </div>
              <span className="font-mono text-xs text-[#9DA6B8] hidden sm:inline">
                REPOSITORIES
              </span>
            </div>

            {/* Responsive Table / Card Stream */}
            <div className="divide-y divide-[#23252C]">
              {ARCHIVED_PROJECTS.map((archiveProj) => (
                <div
                  key={archiveProj.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl text-[#F4F2ED] uppercase">
                        {archiveProj.title}
                      </span>
                      <TechBadge name={archiveProj.maturity} variant="noir" size="sm" />
                    </div>
                    <p className="text-xs text-[#9DA6B8] font-sans max-w-2xl">
                      {archiveProj.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {archiveProj.techStack.map((tech) => (
                        <TechBadge key={tech} name={tech} variant="noir" size="sm" />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {archiveProj.liveUrl && (
                      <InkButton
                        variant="primary"
                        size="sm"
                        href={archiveProj.liveUrl}
                        target="_blank"
                        icon={<ExternalLink className="w-3 h-3" />}
                      >
                        DEMO
                      </InkButton>
                    )}
                    <InkButton
                      variant="secondary"
                      size="sm"
                      href={archiveProj.githubUrl}
                      target="_blank"
                      icon={<Github className="w-3 h-3" />}
                    >
                      CODE
                    </InkButton>
                    <InkButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal(archiveProj)}
                    >
                      INFO
                    </InkButton>
                  </div>
                </div>
              ))}
            </div>
          </MangaPanel>
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
