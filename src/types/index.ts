export type ProjectMaturity = 
  | 'Deployed Application' 
  | 'Full-Stack Prototype' 
  | 'Hackathon Prototype' 
  | 'Conceptual UI' 
  | 'Utility Tool';

export interface ProjectRecord {
  id: string;
  title: string;
  subtitle: string;
  chapterIndex: string;
  maturity: ProjectMaturity;
  isFeatured: boolean;
  summary: string;
  techStack: string[];
  keyFeatures: string[];
  technicalNotes?: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface SkillItem {
  name: string;
  tier?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  editorialLabel: string;
  skills: SkillItem[];
}

export interface ExperienceRecord {
  period: string;
  role: string;
  organization: string;
  type: 'Internship' | 'Leadership' | 'Community';
  status: 'Completed' | 'Active';
  responsibilities: string[];
  technologies: string[];
}

export interface AchievementRecord {
  title: string;
  event: string;
  year: string;
  standing: string;
  description: string;
  highlight?: string;
}

export interface CertificationRecord {
  title: string;
  issuer: string;
  verificationUrl?: string;
}

export interface ProfileData {
  name: string;
  displayTitle: string;
  professionalPositioning: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  education: {
    institution: string;
    campus: string;
    degree: string;
    period: string;
    gpa: string;
  };
  introduction: string;
  interests: string[];
}
