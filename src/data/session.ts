import { CVReview, MockInterview, SkillGapAnalysis } from "../types/qccTypes";

export const cvReview: CVReview = {
  score: 0,
  topSuggestions: [],
  allSuggestions: [],
};

export const mockInterview: MockInterview = {
  targetRole: "",
  questions: [],
};

export const skillGapAnalysis: SkillGapAnalysis = {
  extractedSkills: [],
  reviewedSkills: [],
  targetRole: "",
  roleRequiredSkills: [],
  matchedSkills: [],
  missingSkills: [],
  bonusSkills: [],
  learningPath: [],
};
