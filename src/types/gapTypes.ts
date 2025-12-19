export interface SkillAnalysisResponse {
  matched_skills: string[];
  missing_skills: string[];
  nice_to_have_skills: string[];
  recommendations: SkillRecommendation[];
}

export interface SkillRecommendation {
  skill: string;
  learning_path: LearningPath;
  recommended_courses: RecommendedCourses;
  estimated_time_to_learn: string;
  practice_projects: string[];
}

export interface LearningPath {
  fundamentals?: string[];
  intermediate?: string[];
  advanced?: string[];
}

export interface RecommendedCourses {
  free?: CourseResource[];
  paid?: CourseResource[];
}

export interface CourseResource {
  title: string;
  url: string;
  provider: string;
}
