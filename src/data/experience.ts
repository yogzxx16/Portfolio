import { ExperienceRecord } from '../types';

export const EXPERIENCES_DATA: ExperienceRecord[] = [
  {
    period: 'May 2026 – June 2026',
    role: 'Full Stack Web Development Intern',
    organization: 'Decode Labs',
    type: 'Internship',
    status: 'Completed',
    responsibilities: [
      'Engineered interactive frontend components and user workflows using React',
      'Integrated RESTful APIs for client-server data synchronization',
      'Diagnosed and debugged production issues to enhance stability',
      'Executed web deployments through Vercel and Render platforms',
      'Participated in structured code reviews and modular component refactoring',
    ],
    technologies: ['React', 'Node.js', 'REST APIs', 'Vercel', 'Render', 'Git'],
  },
  {
    period: 'December 2025 – January 2026',
    role: 'Full-Stack Web Development Intern',
    organization: 'Future Interns',
    type: 'Internship',
    status: 'Completed',
    responsibilities: [
      'Developed web application features across React frontend and Node.js backend',
      'Handled dynamic DOM manipulation and client-side event processing',
      'Collaborated using Git with branch workflows and merge conflict resolution',
      'Refactored legacy UI components to improve maintainability and responsive behavior',
    ],
    technologies: ['React', 'Node.js', 'JavaScript', 'CSS', 'Git'],
  },
  {
    period: '2026',
    role: 'Google Student Ambassador',
    organization: 'SRM Institute of Science and Technology',
    type: 'Leadership',
    status: 'Completed',
    responsibilities: [
      'Facilitated technical awareness sessions and developer community initiatives on campus',
      'Helped peers discover Google developer technologies, learning paths, and practical resources',
    ],
    technologies: ['Community Leadership', 'Technical Mentorship'],
  },
  {
    period: undefined,
    role: 'Web Development Team Member',
    organization: 'Developer Student Club (DSC)',
    type: 'Community',
    responsibilities: [
      'Contributed as a member of the web development team to campus developer initiatives and collaborative projects',
    ],
    technologies: ['Web Development', 'Collaboration'],
  },
];
