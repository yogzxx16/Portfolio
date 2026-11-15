import React from 'react';

export interface ProjectEditorialArtworkProps {
  projectId: string;
  imageSrc?: string;
  className?: string;
}

export const ProjectEditorialArtwork: React.FC<ProjectEditorialArtworkProps> = ({
  projectId,
  imageSrc,
  className = '',
}) => {
  // If a real verified screenshot URL is provided in the future, render image
  if (imageSrc) {
    return (
      <div className={`relative w-full aspect-[16/10] overflow-hidden border-2 border-[#151515] ${className}`}>
        <img
          src={imageSrc}
          alt={`Screenshot preview for ${projectId}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Bespoke Manga Editorial Vector Treatments for each featured project
  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden border-2 border-[#151515] bg-[#FAF8F5] select-none ${className}`}
      aria-label={`Editorial manga illustration for ${projectId}`}
    >
      {/* Background Screentone Pattern */}
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

      {/* Speedline Corner Marks */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[#A5A19B] tracking-widest uppercase">
        SPEC // VISUAL MATRIX
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-[#E53935] font-bold">
        <span>●</span>
        <span>CONCEPT TREATMENT</span>
      </div>

      {/* Project-Specific SVG Art */}
      <div className="w-full h-full p-6 flex items-center justify-center">
        {projectId === 'skillswap' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Split Screen Swap Frame */}
            <rect x="30" y="30" width="160" height="170" fill="#EAE5DC" stroke="#151515" strokeWidth="2" />
            <rect x="210" y="30" width="160" height="170" fill="#151515" stroke="#151515" strokeWidth="2" />

            {/* User A Skills */}
            <rect x="45" y="45" width="130" height="20" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
            <text x="55" y="59" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
              LEARNING: PYTHON
            </text>
            <circle cx="155" cy="55" r="4" fill="#E53935" />

            {/* Video Call Grid Inset */}
            <rect x="45" y="80" width="130" height="80" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
            <rect x="55" y="90" width="45" height="35" fill="#151515" />
            <rect x="110" y="90" width="55" height="35" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
            <text x="55" y="145" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="8">
              JITSI VIDEO ROOM
            </text>

            {/* Swap Arrows in Center */}
            <g transform="translate(182, 95)">
              <rect x="0" y="0" width="36" height="40" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <path d="M10 15 L26 15 M20 9 L26 15 L20 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M26 27 L10 27 M16 21 L10 27 L16 33" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* User B Skills */}
            <rect x="225" y="45" width="130" height="20" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
            <text x="235" y="59" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
              TEACHING: REACT.JS
            </text>

            {/* Gamification Badge Inset */}
            <g transform="translate(225, 80)">
              <rect width="130" height="80" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
              <text x="12" y="24" fill="#E53935" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                REWARD: +250 XP
              </text>
              <rect x="12" y="36" width="105" height="8" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
              <rect x="12" y="36" width="75" height="8" fill="#E53935" />
              <text x="12" y="60" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8">
                STREAK: 7 DAYS 🔥
              </text>
            </g>
          </svg>
        )}

        {projectId === 'pulse-link' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Emergency Grid Radar */}
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
            <line x1="40" y1="117" x2="360" y2="117" stroke="#151515" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <line x1="200" y1="30" x2="200" y2="205" stroke="#151515" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />

            {/* Blood Drop & Heartbeat ECG Wave */}
            <path
              d="M50 117 L120 117 L135 70 L150 160 L165 95 L180 135 L190 117 L350 117"
              stroke="#E53935"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Blood Type Compatibility Badges */}
            <g transform="translate(60, 45)">
              <rect width="45" height="32" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <text x="22" y="22" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle">
                O-
              </text>
            </g>
            <g transform="translate(115, 45)">
              <rect width="45" height="32" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
              <text x="22" y="22" fill="#151515" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle">
                A+
              </text>
            </g>
            <g transform="translate(170, 45)">
              <rect width="45" height="32" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
              <text x="22" y="22" fill="#151515" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle">
                B+
              </text>
            </g>

            {/* JWT Protected Route Banner */}
            <g transform="translate(60, 145)">
              <rect width="280" height="42" fill="#151515" />
              <text x="14" y="26" fill="#F4F0E8" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
                NODE/EXPRESS: /API/DONORS/MATCH (JWT AUTH)
              </text>
              <rect x="235" y="10" width="32" height="22" fill="#E53935" />
              <text x="251" y="25" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="12" textAnchor="middle">
                LIVE
              </text>
            </g>
          </svg>
        )}

        {projectId === 'outreachiq' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* B2B Sales Radar Funnel */}
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
            <polygon points="60,50 340,50 280,110 120,110" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
            <polygon points="120,110 280,110 240,165 160,165" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
            <rect x="160" y="165" width="80" height="28" fill="#151515" stroke="#151515" strokeWidth="1.5" />

            <text x="200" y="75" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold" textAnchor="middle">
              STAGE 1: COMPETITOR DATA SCRAPE
            </text>
            <text x="200" y="135" fill="#E53935" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold" textAnchor="middle">
              STAGE 2: LEAD SCORING AI (94/100)
            </text>
            <text x="200" y="183" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold" textAnchor="middle">
              DECK GENERATED
            </text>

            {/* Buildathon Top 8 Badge */}
            <g transform="translate(255, 60) rotate(8)">
              <rect width="90" height="30" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <text x="45" y="20" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="14" textAnchor="middle">
                BUILDATHON TOP 8
              </text>
            </g>
          </svg>
        )}

        {projectId === 'medreminder' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Clock Dial & Voice Waves */}
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />

            {/* Digital Medication Clock Display */}
            <rect x="65" y="55" width="150" height="65" fill="#151515" stroke="#151515" strokeWidth="2" />
            <text x="80" y="98" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="24" fontWeight="bold">
              08:30 <tspan fill="#E53935" fontSize="14">AM</tspan>
            </text>
            <text x="80" y="112" fill="#A5A19B" fontFamily="'Space Mono', monospace" fontSize="8">
              SCHEDULED: 100MG ASPIRIN
            </text>

            {/* Voice Audio Synthesis Soundwaves */}
            <g transform="translate(235, 60)">
              <rect width="100" height="55" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
              <line x1="250" y1="88" x2="250" y2="88" stroke="#151515" strokeWidth="3" />
              <line x1="260" y1="78" x2="260" y2="98" stroke="#E53935" strokeWidth="3" />
              <line x1="270" y1="70" x2="270" y2="105" stroke="#151515" strokeWidth="3" />
              <line x1="280" y1="75" x2="280" y2="100" stroke="#E53935" strokeWidth="3" />
              <line x1="290" y1="82" x2="290" y2="93" stroke="#151515" strokeWidth="3" />
              <line x1="300" y1="85" x2="300" y2="90" stroke="#151515" strokeWidth="3" />
              <text x="245" y="107" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="7">
                WEB SPEECH API
              </text>
            </g>

            {/* High Contrast Adherence Buttons */}
            <g transform="translate(65, 135)">
              <rect width="130" height="45" fill="#E53935" stroke="#151515" strokeWidth="2" />
              <text x="65" y="162" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle">
                MEDICINE TAKEN
              </text>
            </g>
            <g transform="translate(205, 135)">
              <rect width="130" height="45" fill="#EAE5DC" stroke="#151515" strokeWidth="2" />
              <text x="70" y="162" fill="#151515" fontFamily="'Bebas Neue', sans-serif" fontSize="18" textAnchor="middle">
                SNOOZE 10 MIN
              </text>
            </g>
          </svg>
        )}

        {projectId === 'cineverse' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Cinema Film Strip Frame */}
            <rect x="40" y="30" width="320" height="175" fill="#151515" stroke="#151515" strokeWidth="2" />

            {/* Film Perforations Top & Bottom */}
            <rect x="50" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="75" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="100" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="125" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="150" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="175" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="200" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="225" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="250" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="275" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="300" y="36" width="12" height="10" fill="#FAF8F5" />
            <rect x="325" y="36" width="12" height="10" fill="#FAF8F5" />

            <rect x="50" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="75" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="100" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="125" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="150" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="175" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="200" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="225" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="250" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="275" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="300" y="189" width="12" height="10" fill="#FAF8F5" />
            <rect x="325" y="189" width="12" height="10" fill="#FAF8F5" />

            {/* Inner Viewport Screen */}
            <rect x="55" y="55" width="290" height="125" fill="#FAF8F5" stroke="#151515" strokeWidth="1.5" />
            {/* Search Bar Wireframe */}
            <rect x="70" y="68" width="180" height="20" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
            <text x="80" y="82" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="8">
              SEARCH TMDB CATALOG...
            </text>
            <rect x="255" y="68" width="70" height="20" fill="#E53935" />
            <text x="270" y="82" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
              FILTER
            </text>

            {/* Movie Poster Cards Row */}
            <rect x="70" y="98" width="55" height="70" fill="#151515" />
            <rect x="135" y="98" width="55" height="70" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
            <rect x="200" y="98" width="55" height="70" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
            <rect x="265" y="98" width="55" height="70" fill="#E53935" />
            <text x="292" y="138" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="16" textAnchor="middle">
              ★ 8.8
            </text>
          </svg>
        )}

        {projectId === 'spotify-ai' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Sleek Dark Abstract Player Frame */}
            <rect x="40" y="30" width="320" height="175" fill="#151515" stroke="#151515" strokeWidth="2" />

            {/* Concentric Audio Disc Rings */}
            <circle cx="120" cy="117" r="55" stroke="#FAF8F5" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.4" />
            <circle cx="120" cy="117" r="35" fill="#EAE5DC" stroke="#151515" strokeWidth="2" />
            <circle cx="120" cy="117" r="10" fill="#E53935" />

            {/* AI Waveform Sound Waves */}
            <g transform="translate(195, 75)">
              <path
                d="M0 40 C 20 10, 30 70, 50 40 C 70 10, 80 70, 100 40 C 120 10, 130 60, 150 40"
                stroke="#E53935"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M0 40 C 20 25, 30 55, 50 40 C 70 25, 80 55, 100 40 C 120 25, 130 50, 150 40"
                stroke="#FAF8F5"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                fill="none"
                opacity="0.6"
              />
            </g>

            {/* Track Info */}
            <text x="195" y="145" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="18" letterSpacing="0.5">
              SYNTHETIC DRIFT // AI PLAYLIST
            </text>
            <text x="195" y="160" fill="#A5A19B" fontFamily="'Space Mono', monospace" fontSize="8">
              NEXT.JS + TAILWIND CONCEPTUAL UI
            </text>

            {/* Player Controls */}
            <circle cx="205" cy="180" r="7" fill="#FAF8F5" />
            <circle cx="230" cy="180" r="9" fill="#E53935" />
            <circle cx="255" cy="180" r="7" fill="#FAF8F5" />
          </svg>
        )}

        {projectId === 'ecommerce-app' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Storefront Window Frame */}
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
            {/* Store Banner */}
            <rect x="55" y="45" width="290" height="28" fill="#151515" />
            <text x="70" y="63" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="10" fontWeight="bold">
              MERN STOREFRONT // REDUX CART
            </text>
            <rect x="280" y="50" width="55" height="18" fill="#E53935" />
            <text x="307" y="63" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" textAnchor="middle" fontWeight="bold">
              CART: 3
            </text>

            {/* Product Card Row */}
            <g transform="translate(55, 85)">
              <rect width="85" height="105" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
              <rect x="10" y="10" width="65" height="45" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="10" y="70" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ITEM #01
              </text>
              <text x="10" y="85" fill="#E53935" fontFamily="'Bebas Neue', sans-serif" fontSize="14">
                $49.00
              </text>
              <rect x="10" y="90" width="65" height="6" fill="#151515" />
            </g>

            <g transform="translate(155, 85)">
              <rect width="85" height="105" fill="#EAE5DC" stroke="#151515" strokeWidth="1.5" />
              <rect x="10" y="10" width="65" height="45" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="10" y="70" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ITEM #02
              </text>
              <text x="10" y="85" fill="#E53935" fontFamily="'Bebas Neue', sans-serif" fontSize="14">
                $79.00
              </text>
              <rect x="10" y="90" width="65" height="6" fill="#151515" />
            </g>

            <g transform="translate(255, 85)">
              <rect width="90" height="105" fill="#151515" stroke="#151515" strokeWidth="1.5" />
              <text x="12" y="24" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                PAYMENT GATEWAY
              </text>
              <rect x="12" y="35" width="66" height="22" fill="#E53935" />
              <text x="45" y="50" fill="#FFFFFF" fontFamily="'Bebas Neue', sans-serif" fontSize="12" textAnchor="middle">
                RAZORPAY
              </text>
              <text x="12" y="75" fill="#A5A19B" fontFamily="'Space Mono', monospace" fontSize="7">
                STATUS: ENCRYPTED
              </text>
              <text x="12" y="90" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                ORDER #8492
              </text>
            </g>
          </svg>
        )}

        {projectId === 'task-manager' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            {/* Kanban Board Frame */}
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
            
            {/* Board Header */}
            <rect x="55" y="45" width="290" height="24" fill="#151515" />
            <text x="70" y="61" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="9" fontWeight="bold">
              KANBAN WORKFLOW ENGINE // DRAG & DROP
            </text>

            {/* 3 Columns: TODO, DOING, DONE */}
            <g transform="translate(55, 80)">
              <rect width="90" height="110" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
              <rect width="90" height="18" fill="#151515" />
              <text x="45" y="13" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" textAnchor="middle" fontWeight="bold">
                TO DO (3)
              </text>
              <rect x="6" y="25" width="78" height="25" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="12" y="38" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="7">
                API Auth Spec
              </text>
              <rect x="6" y="55" width="78" height="25" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="12" y="68" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="7">
                Schema Tests
              </text>
            </g>

            <g transform="translate(155, 80)">
              <rect width="90" height="110" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
              <rect width="90" height="18" fill="#E53935" />
              <text x="45" y="13" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" textAnchor="middle" fontWeight="bold">
                IN PROGRESS (1)
              </text>
              <rect x="6" y="25" width="78" height="35" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="12" y="38" fill="#151515" fontFamily="'Space Mono', monospace" fontSize="7" fontWeight="bold">
                Refine Motion UI
              </text>
              <rect x="12" y="46" width="50" height="4" fill="#E53935" />
            </g>

            <g transform="translate(255, 80)">
              <rect width="90" height="110" fill="#EAE5DC" stroke="#151515" strokeWidth="1" />
              <rect width="90" height="18" fill="#151515" />
              <text x="45" y="13" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="8" textAnchor="middle" fontWeight="bold">
                COMPLETE (8)
              </text>
              <rect x="6" y="25" width="78" height="25" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="12" y="38" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="7">
                ✓ Setup Vite
              </text>
              <rect x="6" y="55" width="78" height="25" fill="#FAF8F5" stroke="#151515" strokeWidth="1" />
              <text x="12" y="68" fill="#55524E" fontFamily="'Space Mono', monospace" fontSize="7">
                ✓ Mongo Connect
              </text>
            </g>
          </svg>
        )}

        {/* Generic Architectural Fallback for Any Unmatched Project */}
        {!['skillswap', 'pulse-link', 'outreachiq', 'medreminder', 'cineverse', 'spotify-ai', 'ecommerce-app', 'task-manager'].includes(projectId) && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none">
            <rect x="40" y="30" width="320" height="175" fill="#FAF8F5" stroke="#151515" strokeWidth="2" />
            <line x1="40" y1="30" x2="360" y2="205" stroke="#151515" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <line x1="40" y1="205" x2="360" y2="30" stroke="#151515" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <rect x="120" y="85" width="160" height="65" fill="#151515" stroke="#151515" strokeWidth="2" />
            <text x="200" y="115" fill="#FFFFFF" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="bold" textAnchor="middle">
              CODE SCHEMATIC
            </text>
            <text x="200" y="133" fill="#E53935" fontFamily="'Space Mono', monospace" fontSize="9" textAnchor="middle">
              {projectId.toUpperCase()}
            </text>
          </svg>
        )}
      </div>

      {/* Bottom Visual Label */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#55524E] border-t border-[#151515]/20 pt-1">
        <span>ARCHITECTURAL VECTOR SCHEMATIC</span>
        <span className="uppercase">{projectId}</span>
      </div>
    </div>
  );
};
