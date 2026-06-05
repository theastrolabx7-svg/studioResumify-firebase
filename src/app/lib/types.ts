export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  linkedIn?: string;
  portfolioWebsite?: string;
  profilePhoto?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gradeOrCGPA?: string;
}

export interface Experience {
  id: string;
  companyName: string;
  jobTitle: string;
  duration: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  projectName: string;
  description: string;
  technologiesUsed?: string[];
}

export interface Certification {
  id: string;
  certificateName: string;
  organization: string;
}

export interface ResumeCustomization {
  shellType: 'minimal' | 'sidebar' | 'modern-accent' | 'blueprint';
  colorPairing: 'classic-blue' | 'elegant-emerald' | 'royal-indigo' | 'slate-gray' | 'midnight-gold';
  typography: 'inter-grotesk' | 'serif-classic' | 'mono-modern';
  spacingDensity: 'compact' | 'standard' | 'spacious';
  borderStyle: 'none' | 'thick-top' | 'full-shell' | 'accent-left';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  education: Education[];
  experience: Experience[];
  skills: {
    technicalSkills: string[];
    softSkills: string[];
  };
  projects: Project[];
  certifications: Certification[];
  languages: { language: string; proficiency?: string }[];
  customization: ResumeCustomization;
}

export const defaultCustomization: ResumeCustomization = {
  shellType: 'modern-accent',
  colorPairing: 'classic-blue',
  typography: 'inter-grotesk',
  spacingDensity: 'standard',
  borderStyle: 'thick-top',
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  },
  professionalSummary: '',
  education: [],
  experience: [],
  skills: {
    technicalSkills: [],
    softSkills: [],
  },
  projects: [],
  certifications: [],
  languages: [],
  customization: defaultCustomization,
};
