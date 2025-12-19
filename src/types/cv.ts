export interface AICVExtraction {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  headline: string;
  education: string[];
  experience: string[];
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  tools: string[];
  projects: string[];
  achievements: string[];
  links: string[];
}

export interface NewCV {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  headline: string;
  education: string[];
  experience: string[];
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  tools: string[];
  projects: string[];
  achievements: string[];
  links: string[];
  targetRole: string;
}

export interface CVResult {
  success: boolean;
  fileType: string;
  rawText: string;
  extractedByAI: AICVExtraction;
}

export interface CVSkill {
  hard_skill: string[];
  soft_skill: string[];
}
