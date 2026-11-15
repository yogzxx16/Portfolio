import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FEATURED_PROJECTS,
  ARCHIVED_PROJECTS,
  TOTAL_PROJECTS_COUNT,
  DEPLOYED_PROJECTS_COUNT,
} from '../../data/projects';
import { ProjectRecord } from '../../types';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { InkButton } from '../common/InkButton';
import { HalftoneOverlay } from '../common/HalftoneOverlay';
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
    <section id="creations" className="relative py-16 sm:py-24 border-b-2 border-[#151515]">
      <HalftoneOverlay density="medium" opacity="very-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <ChapterHeader
          number="03"
          title="MY CREATIONS"
          kanji="制作物"
          subtitle="A curated portfolio of full-stack platforms, accessible utilities, AI-integrated workflows, and responsive web products."
        />

        {/* Dynamic Metrics Header Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MangaPanel variant="default" tag="VOLUME METRIC">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#151515] block">
              {TOTAL_PROJECTS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#55524E]">
              Total Documented Works
            </span>
          </MangaPanel>

          <MangaPanel variant="wash" tag="EDITORIAL">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#151515] block">
              {FEATURED_PROJECTS.length}
            </span>
            <span className="font-mono text-xs text-[#55524E]">
              Featured Spreads
            </span>
          </MangaPanel>

          <MangaPanel variant="default" tag="PUBLIC ACCESS">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#E53935] block">
              {DEPLOYED_PROJECTS_COUNT}
            </span>
            <span className="font-mono text-xs text-[#55524E]">
              Live Deployed Apps
            </span>
          </MangaPanel>

          <MangaPanel variant="ink" tag="ARCHIVES">
            <span className="font-mono text-3xl sm:text-4xl font-black text-[#F4F0E8] block">
              {ARCHIVED_PROJECTS.length}
            </span>
            <span className="font-mono text-xs text-[#A5A19B]">
              Indexed Experiments
            </span>
          </MangaPanel>
        </div>

        {/* Interactive Filter Control Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#151515]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#151515] uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#E53935]" />
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
                      ? 'bg-[#151515] text-[#F4F0E8] border-[#151515] shadow-manga-red'
                      : 'bg-[#FAF8F5] text-[#151515] border-[#151515] hover:bg-[#EAE5DC]'
                  } focus:outline-none focus:ring-2 focus:ring-[#E53935]`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Project Spreads Stream */}
        <div className="space-y-12 mb-16">
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
                    variant="default"
                    tag={`SPREAD 0${idx + 1}`}
                    notch={isEven ? 'top-right' : 'bottom-right'}
                    className="p-6 sm:p-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Side: Artwork Schematics */}
                      <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative group cursor-pointer" onClick={() => handleOpenModal(project)}>
                          <ProjectEditorialArtwork projectId={project.id} />
                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 bg-[#151515]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                            <span className="font-mono text-xs text-white font-bold tracking-widest uppercase border border-white px-3 py-1.5 flex items-center gap-2">
                              <Eye className="w-4 h-4 text-[#E53935]" />
                              <span>INSPECT FULL SPECIFICATION</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Narrative Specifications */}
                      <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Project Index & Maturity */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#151515]/20 pb-2">
                          <span className="font-mono text-xs font-bold text-[#E53935]">
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
                          <h3 className="font-display text-3xl sm:text-4xl text-[#151515] uppercase tracking-wide">
                            {project.title}
                          </h3>
                          <p className="font-mono text-xs text-[#55524E] mt-0.5">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Summary */}
                        <p className="font-sans text-sm sm:text-base text-[#151515] leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Top 3 Documented Features */}
                        <div className="space-y-1.5 py-1">
                          {project.keyFeatures.slice(0, 3).map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-[#55524E]">
                              <span className="text-[#E53935] font-bold">▶</span>
                              <span className="font-sans">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techStack.map((tech) => (
                            <TechBadge key={tech} name={tech} variant="default" size="sm" />
                          ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          {project.liveUrl && (
                            <InkButton
                              variant="accent"
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
                            variant="primary"
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
          <MangaPanel variant="wash" tag="COMPACT ARCHIVE INDEX" notch="none">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#151515]/20">
              <div className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-[#151515]" />
                <h4 className="font-display text-2xl text-[#151515] uppercase tracking-wide">
                  SUPPLEMENTARY WORKS & EXPERIMENTS ({ARCHIVED_PROJECTS.length})
                </h4>
              </div>
              <span className="font-mono text-xs text-[#A5A19B] hidden sm:inline">
                REPOSITORIES
              </span>
            </div>

            {/* Responsive Table / Card Stream */}
            <div className="divide-y divide-[#151515]/20">
              {ARCHIVED_PROJECTS.map((archiveProj) => (
                <div
                  key={archiveProj.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl text-[#151515] uppercase">
                        {archiveProj.title}
                      </span>
                      <TechBadge name={archiveProj.maturity} variant="muted" size="sm" />
                    </div>
                    <p className="text-xs text-[#55524E] font-sans max-w-2xl">
                      {archiveProj.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {archiveProj.techStack.map((tech) => (
                        <TechBadge key={tech} name={tech} variant="default" size="sm" />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {archiveProj.liveUrl && (
                      <InkButton
                        variant="secondary"
                        size="sm"
                        href={archiveProj.liveUrl}
                        target="_blank"
                        icon={<ExternalLink className="w-3 h-3" />}
                      >
                        DEMO
                      </InkButton>
                    )}
                    <InkButton
                      variant="primary"
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
