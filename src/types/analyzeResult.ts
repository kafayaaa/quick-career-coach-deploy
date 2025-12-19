export interface AnalyzeResult {
  cv: {
    results: {
      ats: SectionResult;
      formatting: SectionResult;
      contact: SectionResult;
      education: SectionResult;
      skills: SectionResult;
      experience: SectionResult;
      projects: SectionResult;
      achievements: SectionResult;
      certifications: SectionResult;
      keywords: SectionResult;
      summary: SectionResult;
      overall: { score: number };
    };
    recommendations: {
      high: string[];
      medium: string[];
      low: string[];
      tips: string[];
      next_steps: string[];
    };
  };
  skills_gap: {
    score: number;
    matched_skills: string[];
    missing_skills: string[];
    nice_to_have_skills: string[];
    recommendations: SkillRecommendation[];
  };
}

interface SectionResult {
  score: number;
  desc: string;
  recommend: string[];
}

interface SkillRecommendation {
  skill: string;
  learning_path: LearningPath;
  practice_projects: string[];
}

interface LearningPath {
  fundamentals: LearningPathItem[];
  intermediate: LearningPathItem[];
  advanced: LearningPathItem[];
}

export interface LearningPathItem {
  title: string;
  desc: string;
  rec_courses: Course[];
}

interface Course {
  title: string;
  desc: string;
  paid: boolean;
  url: string;
  duration: string;
}
