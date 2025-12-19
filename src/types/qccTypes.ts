export interface CVReview {
  score: number;
  topSuggestions: string[];
  allSuggestions: Suggestion[];
}
export interface Suggestion {
  id: number;
  title: string;
  detail: string;
  example?: string;
}

export interface MockInterview {
  targetRole: string;
  questions: InterviewQuestion[];
  finalSummary?: InterviewSummary;
}
export interface InterviewQuestion {
  id: number;
  type: "Behavioral" | "Technical";
  question: string;
  userAnswer?: string;
  feedback?: Feedback;
}
export interface Feedback {
  strengths: string;
  improve: string;
  score: number;
}
export interface InterviewSummary {
  totalScore: number;
  percentage: number;
  bestAnswerId: number;
  focusAreas: string[];
}

export interface SkillGapAnalysis {
  extractedSkills: string[];
  reviewedSkills: string[];
  targetRole: string;
  roleRequiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  bonusSkills?: string[];
  learningPath: LearningPathItem[];
}
export interface LearningPathItem {
  skill: string;
  priority: "High" | "Medium" | "Low";
  course: string;
  duration: string;
}
