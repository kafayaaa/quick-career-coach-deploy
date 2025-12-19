import { model } from "../services/gemini.js";
import { extractJSON } from "./extractJson.js";

export async function aiAnalyzeCVNew(cvData: string, targetRole: string) {
  try {
    const prompt = `
            You are an expert resume reviewer, HR specialist, ATS optimizer, career development advisor, and skill gap analyst.

            Your goal:
            - Analyze the user’s CV.
            - Compare their skills with the target job role.
            - Return results strictly in valid JSON only.

            IMPORTANT RULES:
            - Output JSON ONLY.
            - No markdown.
            - No backticks.
            - No text before or after JSON.
            - The JSON must follow EXACTLY the structure below.
            - Analysis only from submitted data
            - Do not create or enter data other than the data sent (CV)

            Here is the CV data:
            ${JSON.stringify(cvData, null, 2)}

            Target role: "${targetRole}"

            Evaluate the CV on these categories:
            - ATS compatibility
            - Formatting
            - Contact information
            - Education
            - Skills
            - Work experience
            - Projects
            - Achievements
            - Certifications
            - Keywords
            - Professional summary / headline

            For each category, provide score (0–100), description (why), and 3–5 clear recommendations.

            Also compute the overall score (average of all section scores).

            After that, perform SKILL GAP ANALYSIS:
            - score: overall score from comparing skills from CV with skills required by target role between 0–100
            - matched_skills: skills the user already has for the target role from CV
            - missing_skills: required but missing
            - nice_to_have_skills: optional but beneficial

            For every missing skill, generate:
            - learning_path:
                - fundamentals: list of learning modules
                - intermediate: list of learning modules
                - advanced: list of learning modules
            Each module contains:
                - title
                - desc
                - rec_courses: list of recommended online courses with both free and paid containing:
                    - title
                    - desc
                    - paid (true/false)
                    - url
                    - duration
            - practice_projects: list of hands-on mini project ideas

            OUTPUT JSON STRUCTURE (must match exactly):

            {
            "cv": {
                "results": {
                "ats": { "score": number, "desc": string, "recommend": string[] },
                "formatting": { "score": number, "desc": string, "recommend": string[] },
                "contact": { "score": number, "desc": string, "recommend": string[] },
                "education": { "score": number, "desc": string, "recommend": string[] },
                "skills": { "score": number, "desc": string, "recommend": string[] },
                "experience": { "score": number, "desc": string, "recommend": string[] },
                "projects": { "score": number, "desc": string, "recommend": string[] },
                "achievements": { "score": number, "desc": string, "recommend": string[] },
                "certifications": { "score": number, "desc": string, "recommend": string[] },
                "keywords": { "score": number, "desc": string, "recommend": string[] },
                "summary": { "score": number, "desc": string, "recommend": string[] },
                "overall": { "score": number }
                },
                "recommendations": {
                "high": string[],
                "medium": string[],
                "low": string[],
                "tips": string[],
                "next_steps": string[]
                }
            }, 
            "skills_gap": {
                "score": number,
                "matched_skills": string[],
                "missing_skills": string[],
                "nice_to_have_skills": string[],
                "recommendations": [
                {
                    "skill": string,
                    "practice_projects": string[]
                    "learning_path": {
                        "fundamentals": [
                            {
                            "title": string,
                            "desc": string,
                            "rec_courses": [
                                {
                                "title": string,
                                "desc": string,
                                "paid": boolean,
                                "url": string,
                                "duration": string
                                }
                            ]
                            }
                        ],
                        "intermediate": [
                            {
                            "title": string,
                            "desc": string,
                            "rec_courses": [
                                {
                                "title": string,
                                "desc": string,
                                "paid": boolean,
                                "url": string,
                                "duration": string
                                }
                            ]
                            }
                        ],
                        "advanced": [
                            {
                            "title": string,
                            "desc": string,
                            "rec_courses": [
                                {
                                "title": string,
                                "desc": string,
                                "paid": boolean,
                                "url": string,
                                "duration": string
                                }
                            ]
                            }
                        ]
                    },
                }
                ]
            }
            }

            Ensure the JSON is 100% valid and complete.
        `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("AI Error analyzing CV:", error);
    throw error;
  }
}
