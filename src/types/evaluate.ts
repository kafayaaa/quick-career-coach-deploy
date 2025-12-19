export interface Evaluate {
  overallScore: number;
  questions: Question[];
  summary: string;
}

interface Question {
  questionNumber: number;
  questionType: string;
  score: number;
  strengths: string[];
  improvements: string[];
  betterAnswerExample: string;
}
