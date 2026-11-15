import React from 'react';
import { motion, type Variants } from 'motion/react';
import { EXPERIENCES_DATA } from '../../data/experience';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';
import { CERTIFICATIONS_DATA } from '../../data/certifications';
import { ChapterHeader } from '../common/ChapterHeader';
import { MangaPanel } from '../common/MangaPanel';
import { TechBadge } from '../common/TechBadge';
import { HankoStamp } from '../common/HankoStamp';
import { HalftoneOverlay } from '../common/HalftoneOverlay';
import {
  Trophy,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Medal,
  Flag,
} from 'lucide-react';

export const JourneySection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="journey" className="relative py-16 sm:py-24 border-b-2 border-[#151515]">
      <HalftoneOverlay density="medium" opacity="very-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <ChapterHeader
          number="04"
          title="THE JOURNEY"
          kanji="軌跡"
          subtitle="A serialized record of professional internships, community initiatives, competitive hackathons, and technical coursework."
        />

        {/* ARC I — PROFESSIONAL EXPERIENCE */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-[#151515]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E53935]" />
              <h3 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide">
                ARC I // PROFESSIONAL EXP & LEADERSHIP
              </h3>
            </div>
            <span className="font-mono text-xs text-[#55524E] hidden sm:inline uppercase">
              CHRONOLOGY // 実務経験
            </span>
          </div>

          {/* Vertical Editorial Timeline */}
          <div className="relative pl-4 sm:pl-8 border-l-2 border-[#151515] ml-2 sm:ml-4 space-y-10">
            {EXPERIENCES_DATA.map((exp, idx) => {
              const isInternship = exp.type === 'Internship';
              const isLeadership = exp.type === 'Leadership';

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Ink Node */}
                  <div
                    className="absolute -left-[23px] sm:-left-[39px] top-6 w-5 h-5 bg-[#FAF8F5] border-2 border-[#151515] flex items-center justify-center group-hover:bg-[#E53935] transition-colors"
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 bg-[#151515] group-hover:bg-white" />
                  </div>

                  <MangaPanel
                    variant={isInternship ? 'default' : 'wash'}
                    tag={`CHRONICLE 0${idx + 1}`}
                    notch={idx % 2 === 0 ? 'top-right' : 'none'}
                    hoverEffect
                    className="p-6 sm:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#151515]/20">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-[#E53935] uppercase tracking-wider">
                            {exp.type}
                          </span>
                          <span className="text-[#A5A19B]">&bull;</span>
                          <span className="font-mono text-xs text-[#55524E] flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {exp.organization}
                          </span>
                          {exp.status && (
                            <>
                              <span className="text-[#A5A19B]">&bull;</span>
                              <span
                                className={`font-mono text-[10px] font-bold px-1.5 py-0.2 border ${
                                  exp.status === 'Completed'
                                    ? 'bg-[#151515] text-[#FAF8F5] border-[#151515]'
                                    : 'bg-[#E53935] text-white border-[#E53935]'
                                }`}
                              >
                                {exp.status.toUpperCase()}
                              </span>
                            </>
                          )}
                        </div>

                        <h4 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide">
                          {exp.role}
                        </h4>
                      </div>

                      {/* Right Side: Period Stamp */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                        {exp.period ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#151515] font-mono text-xs font-semibold text-[#151515]">
                            <Calendar className="w-3.5 h-3.5 text-[#E53935]" />
                            <span>{exp.period}</span>
                          </div>
                        ) : (
                          <span className="font-mono text-xs text-[#A5A19B] italic">
                            Tenure Period Unspecified
                          </span>
                        )}

                        {isLeadership && (
                          <HankoStamp
                            label="長"
                            subtext="LEAD"
                            shape="circle"
                            color="red"
                            size="sm"
                            angle={-6}
                          />
                        )}
                      </div>
                    </div>

                    {/* Responsibilities & Impact */}
                    <div className="mt-4 space-y-2">
                      <span className="font-mono text-[10px] font-bold text-[#A5A19B] tracking-widest uppercase block mb-1">
                        DOCUMENTED RESPONSIBILITIES & WORKFLOW
                      </span>
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#151515]">
                          <span className="text-[#E53935] font-bold shrink-0 mt-0.5">▶</span>
                          <span className="font-sans leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Tag Flow */}
                    <div className="mt-6 pt-4 border-t border-[#151515]/10 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#55524E] mr-1 uppercase">
                        FOCUS STACK:
                      </span>
                      {exp.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} variant="muted" size="sm" />
                      ))}
                    </div>
                  </MangaPanel>
                </div>
              );
            })}
          </div>
        </div>

        {/* ARC II — HACKATHONS & ACHIEVEMENTS */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-[#151515]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E53935]" />
              <h3 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide">
                ARC II // HACKATHONS & COMPETITIVE STANDINGS
              </h3>
            </div>
            <span className="font-mono text-xs text-[#55524E] hidden sm:inline uppercase">
              HONORS & PROTOTYPES // 競技記録
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {ACHIEVEMENTS_DATA.map((ach, idx) => {
              const isHighlight = Boolean(ach.highlight);

              return (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col">
                  <MangaPanel
                    variant={isHighlight ? 'default' : 'wash'}
                    tag={`RECORD 0${idx + 1}`}
                    notch={idx === 0 ? 'top-right' : idx === 1 ? 'bottom-right' : 'none'}
                    hoverEffect
                    className="h-full flex flex-col justify-between p-6"
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#151515]/20">
                        <div className="flex items-center gap-2">
                          {isHighlight ? (
                            <Trophy className="w-4 h-4 text-[#E53935]" />
                          ) : (
                            <Flag className="w-4 h-4 text-[#55524E]" />
                          )}
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#151515]">
                            {ach.event}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#55524E]">{ach.year}</span>
                      </div>

                      {/* Title & Standing */}
                      <div className="mb-3">
                        <h4 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide">
                          {ach.title}
                        </h4>
                        <div className="inline-block mt-1 font-mono text-xs font-bold px-2 py-0.5 bg-[#FAF8F5] border border-[#151515] text-[#E53935]">
                          {ach.standing}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-[#55524E] leading-relaxed mb-4">
                        {ach.description}
                      </p>
                    </div>

                    {/* Bottom Status Ribbon */}
                    <div className="pt-3 border-t border-[#151515]/10 flex items-center justify-between">
                      {isHighlight ? (
                        <div className="flex items-center gap-1.5 text-[#E53935] font-mono text-xs font-bold">
                          <Medal className="w-4 h-4" />
                          <span>COMPETITIVE FINALIST</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#55524E] font-mono text-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>VERIFIED PARTICIPATION</span>
                        </div>
                      )}

                      {isHighlight && (
                        <HankoStamp
                          label={idx === 0 ? '勝' : '選'}
                          subtext="TOP TIER"
                          shape="square"
                          color="red"
                          size="sm"
                          angle={3}
                        />
                      )}
                    </div>
                  </MangaPanel>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ARC III — CERTIFICATIONS */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-[#151515]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E53935]" />
              <h3 className="font-display text-2xl sm:text-3xl text-[#151515] uppercase tracking-wide">
                ARC III // VERIFIED TECHNICAL CERTIFICATIONS
              </h3>
            </div>
            <span className="font-mono text-xs text-[#55524E] hidden sm:inline uppercase">
              CREDENTIALS // 認定証
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <MangaPanel
                  variant="default"
                  tag={`CERT 0${idx + 1}`}
                  hoverEffect
                  className="h-full flex flex-col justify-between p-5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#A5A19B] font-mono text-[10px]">
                      <span className="flex items-center gap-1.5 text-[#E53935] font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>COURSE RECORD</span>
                      </span>
                      <span>#0{idx + 1}</span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl text-[#151515] uppercase tracking-wide leading-snug">
                      {cert.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-[#55524E] font-sans">
                      <span className="font-mono text-[11px] font-semibold text-[#151515]">
                        ISSUED BY:
                      </span>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#151515]/10 flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-1 text-[#55524E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E53935]" />
                      <span>COMPLETED</span>
                    </div>

                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#E53935] font-bold hover:underline focus:outline-none focus:ring-1 focus:ring-[#E53935]"
                      >
                        <span>VERIFY</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[#A5A19B] text-[10px]">VERIFIED RECORD</span>
                    )}
                  </div>
                </MangaPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};