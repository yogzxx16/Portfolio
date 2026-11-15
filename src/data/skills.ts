import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    editorialLabel: '言語',
    skills: [
      { name: 'JavaScript (ES6+)' },
      { name: 'Python' },
      { name: 'C' },
      { name: 'C++' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    editorialLabel: '表層開発',
    skills: [
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    editorialLabel: '深層基盤',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    editorialLabel: 'データベース',
    skills: [
      { name: 'MongoDB' },
      { name: 'Firebase Firestore' },
      { name: 'PostgreSQL' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    editorialLabel: '開発環境',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Vercel' },
      { name: 'Render' },
      { name: 'Firebase Hosting' },
      { name: 'Postman' },
    ],
  },
  {
    id: 'additional',
    title: 'Additional Capabilities',
    editorialLabel: '応用技術',
    skills: [
      { name: 'Prompt Engineering' },
      { name: 'Pandas' },
      { name: 'Microsoft Excel' },
    ],
  },
];
