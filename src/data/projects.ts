import { ProjectRecord } from '../types';

export const PROJECTS_DATA: ProjectRecord[] = [
  {
    id: 'skillswap',
    title: 'SkillSwap',
    subtitle: 'Peer-to-Peer Skill Exchange Platform',
    chapterIndex: 'WORK 01',
    maturity: 'Deployed Application',
    isFeatured: true,
    summary:
      'A platform that lets users exchange skills rather than pay for courses, featuring collaborative learning spaces and interactive gamification.',
    problemStatement:
      'High costs and one-way learning models create barriers for students and self-taught learners seeking practical peer-to-peer knowledge exchange.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'JavaScript',
      'Firebase',
      'Tailwind CSS',
      'Jitsi Meet API',
      'Context API',
      'Motion',
    ],
    keyFeatures: [
      'Peer skill matching algorithm and swap requests workflow',
      'Real-time in-app messaging and collaborative chat',
      'Integrated live video sessions powered by Jitsi Meet API',
      'Gamification system with XP points, coins, badges, daily streaks, and leaderboards',
      'AI-assisted interactive practice quizzes for skill validation',
    ],
    technicalNotes:
      'Designed with Firebase real-time listeners for instant synchronization across chats and swap states, paired with Context API for state management.',
    githubUrl: 'https://github.com/yogzxx16/skillswap-app',
    liveUrl: 'https://skillswap-learnnearn-in.web.app',
  },
  {
    id: 'pulse-link',
    title: 'Pulse-Link',
    subtitle: 'Emergency Blood Donor Matching Prototype',
    chapterIndex: 'WORK 02',
    maturity: 'Full-Stack Prototype',
    isFeatured: true,
    summary:
      'Full-stack emergency healthcare system connecting immediate blood recipients with compatible, registered donors nearby.',
    problemStatement:
      'Critical time delays during medical emergencies when hospitals or patients struggle to rapidly identify and contact compatible blood donors in their immediate geographical vicinity.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'REST APIs',
      'JWT',
      'bcryptjs',
    ],
    keyFeatures: [
      'Secure donor onboarding and authentication with JWT & bcryptjs',
      'Blood group compatibility mapping algorithm',
      'Donor discovery directory and proximity-based location tracking',
      'Protected API endpoints for recipient requests and donor status updates',
    ],
    technicalNotes:
      'Built with Node.js and Express backend connected to MongoDB via Mongoose, providing role-protected endpoints and data sanitation.',
    githubUrl: 'https://github.com/yogzxx16/Pulse-Link',
  },
  {
    id: 'outreachiq',
    title: 'OutreachIQ',
    subtitle: 'AI-Powered B2B Sales Engine Prototype',
    chapterIndex: 'WORK 03',
    maturity: 'Hackathon Prototype',
    isFeatured: true,
    summary:
      'Buildathon Top 8 finalist prototype developed to automate B2B competitor research, lead scoring, and personalized outreach workflows.',
    problemStatement:
      'Sales teams and founders spend excessive hours manually researching competitor landscapes, qualification criteria, and drafting custom pitch decks for prospects.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'AI Integrations',
      'REST APIs',
    ],
    keyFeatures: [
      'Automated competitor research aggregation',
      'Algorithmic lead qualification and scoring pipeline',
      'Dynamic pitch deck outline generation using AI',
      'CRM integration schemas and sales pipeline lead tracking',
    ],
    technicalNotes:
      'Created under competitive hackathon constraints, integrating rapid AI API endpoints with responsive React and Node.js.',
    githubUrl: 'https://github.com/yogzxx16/OutreachIQ-buildthaon',
  },
  {
    id: 'medreminder',
    title: 'MedReminder',
    subtitle: 'Accessible Medication Management for Seniors',
    chapterIndex: 'WORK 04',
    maturity: 'Deployed Application',
    isFeatured: true,
    summary:
      'Accessible, high-contrast medication management web application tailored for elderly users with voice-guided interaction.',
    problemStatement:
      'Complex medication schedules and small, unreadable digital interfaces frequently cause senior citizens to miss crucial prescription dosages.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'CSS',
      'JavaScript',
      'Web Speech API',
      'localStorage',
    ],
    keyFeatures: [
      'Voice-guided interactions using the browser Web Speech API',
      'Multilingual audio-visual reminders and notification cues',
      'Scheduled dosage alerts and medicine adherence tracking',
      'High-contrast accessible UI with oversized tap targets',
      'Client-side persistence via localStorage for offline availability',
    ],
    technicalNotes:
      'Engineered with pure client-side React, CSS, and browser Web Speech synthesis and recognition APIs, without external backend dependencies.',
    githubUrl: 'https://github.com/yogzxx16/DEV-DYNAMOS-MedReminder',
    liveUrl: 'https://dev-dynamos-med-reminder.vercel.app',
  },
  {
    id: 'cineverse',
    title: 'CineVerse',
    subtitle: 'Responsive TMDB Movie Discovery App',
    chapterIndex: 'WORK 05',
    maturity: 'Deployed Application',
    isFeatured: true,
    summary:
      'Movie exploration experience providing instant search, genre curation, and personalized watchlists powered by the TMDB API.',
    problemStatement:
      'Movie catalog browsers are often cluttered, slow to respond to search queries, and fail to retain offline user watchlists on mobile devices.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'TMDB API',
      'React Router DOM',
    ],
    keyFeatures: [
      'Debounced search input for efficient API querying',
      'Dynamic genre filtering and sorting mechanisms',
      'Community reviews, metadata display, and star rating visualization',
      'Persistent client-side watchlist stored in browser storage',
      'Comprehensive movie detail views with responsive layout',
    ],
    technicalNotes:
      'Built with Vite and React Router DOM, utilizing custom hooks for TMDB API consumption with cancellation and debouncing.',
    githubUrl: 'https://github.com/yogzxx16/Cineverse',
    liveUrl: 'https://cineverse-yogzxx16.vercel.app',
  },
  {
    id: 'spotify-ai',
    title: 'Spotify AI',
    subtitle: 'UX-Focused Conceptual Redesign',
    chapterIndex: 'WORK 06',
    maturity: 'Conceptual UI',
    isFeatured: true,
    summary:
      'Conceptual landing page exploring audio streaming ergonomics, sleek typographic hierarchy, and AI-themed abstract wave visuals.',
    problemStatement:
      'Exploring how audio streaming interfaces can communicate intelligent AI curation and aesthetic pacing through fluid typography and wave micro-interactions.',
    imagePlaceholder: undefined,
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Vercel',
    ],
    keyFeatures: [
      'Distinctive call-to-action hierarchy and fluid navigation',
      'AI-themed abstract waveform visuals and interactive micro-interactions',
      'Mobile-first responsive layout with fast Next.js page delivery',
    ],
    technicalNotes:
      'Conceptual frontend exploration focusing purely on interface ergonomics and design craftsmanship; does not interface with Spotify APIs or live LLMs.',
    githubUrl: 'https://github.com/yogzxx16/Spotify-redesign',
    liveUrl: 'https://spotify-redesign-yogesh.vercel.app',
  },
  {
    id: 'ecommerce-app',
    title: 'E-Commerce Web Application',
    subtitle: 'Frontend Storefront & Cart Management',
    chapterIndex: 'ARCHIVE 01',
    maturity: 'Deployed Application',
    isFeatured: false,
    summary:
      'Frontend e-commerce storefront featuring live product browsing, detailed product specification pages, and global cart state.',
    problemStatement:
      'Designing an ultra-responsive storefront shopping workflow with real-time cart state management without external framework overhead.',
    imagePlaceholder: undefined,
    techStack: [
      'React',
      'Vite',
      'Context API',
      'Tailwind CSS',
      'Vercel',
    ],
    keyFeatures: [
      'Live product data listings and category filtering',
      'Individual product detail pages with specification breakdowns',
      'Global shopping cart management utilizing React Context API',
      'Responsive interface optimized for mobile and desktop checkout flows',
    ],
    githubUrl: 'https://github.com/yogzxx16/E-commerce-frontend',
    liveUrl: 'https://yogz-e-commerce-website.vercel.app',
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    subtitle: 'Lightweight Client-Side CRUD Application',
    chapterIndex: 'ARCHIVE 02',
    maturity: 'Utility Tool',
    isFeatured: false,
    summary:
      'Lightweight, dependency-free productivity tool implementing complete client-side task lifecycle management and browser persistence.',
    problemStatement:
      'Heavy task management apps burden simple daily to-do workflows; building a dependency-free vanilla JS alternative that boots instantly.',
    imagePlaceholder: undefined,
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6)',
      'localStorage',
    ],
    keyFeatures: [
      'Add, mark complete, edit, and delete task items',
      'State persistence across browser sessions using localStorage',
      'Clean zero-dependency implementation focused on DOM fundamentals',
    ],
    githubUrl: 'https://github.com/yogzxx16/Task-Manager',
  },
];

// Computed data helpers
export const FEATURED_PROJECTS = PROJECTS_DATA.filter((p) => p.isFeatured);
export const ARCHIVED_PROJECTS = PROJECTS_DATA.filter((p) => !p.isFeatured);
export const TOTAL_PROJECTS_COUNT = PROJECTS_DATA.length;
export const PUBLIC_DEMOS_COUNT = PROJECTS_DATA.filter((p) => Boolean(p.liveUrl)).length;
export const DEPLOYED_APPLICATIONS_COUNT = PROJECTS_DATA.filter((p) => p.maturity === 'Deployed Application').length;
