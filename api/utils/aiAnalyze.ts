import { model } from "../services/gemini";
import { extractJSON } from "./extractJson";

export async function aiAnalyzeCV(cvData: string, targetRole: string) {
  try {
    const prompt = `
            You are an expert resume reviewer, HR specialist, and ATS optimization analyst.

            Return your ENTIRE RESPONSE strictly in valid JSON ONLY.
            Do NOT include explanation outside JSON.
            Do NOT include markdown.
            Do NOT include backticks.  
            Do NOT include text before or after JSON.

            Here is the CV data:

            ${JSON.stringify(cvData, null, 2)}

            Target role: "${targetRole}"


            Evaluate the CV based on the following categories and scoring weights:

            =====================================================
            1. Content Quality (40%)
            - Distinguish achievements vs responsibilities
            - Identify missing quantifiable results (numbers, %, impact)
            - Evaluate relevance to the target role
            - Check use of action verbs (led, built, improved, etc.)

            2. Structure & Format (30%)
            - Section clarity and organization
            - Consistent formatting (bullets, spacing, tense)
            - Optimal length (1–2 pages)
            - Completeness of contact information

            3. ATS Optimization (20%)
            - Use of standard section headers (Experience, Skills, Education)
            - Keyword density relevant to the target role
            - ATS readability (no images, weird formatting)

            4. Skills & Keywords (10%)
            - Relevance of skills listed
            - Missing industry-standard terminology
            - Balance between technical & soft skills
            =====================================================

            ### OUTPUT REQUIREMENTS:

            1. **Category Scores (0–100)**  
            Provide a score for each category + a short justification.

            2. **5–7 Concrete, actionable suggestions**  
            Each suggestion must include:
            - Category (Content, Format, ATS, Skills, etc.)
            - Description of the issue
            - Exact example of improvement (rewrite or add)
            - Priority level: High / Medium / Low impact

            Example format:
            - **Issue:** Experience lacks measurable results  
                **Suggestion:** Add numbers to quantify impact  
                **Example:** “Managed team” → “Led a team of 5 engineers, increasing delivery speed by 18%”  
                **Priority:** High

            3. **Missing sections or weaknesses**  
            Identify if CV lacks:
            - Achievements
            - Summary/headline
            - Skills breakdown
            - Technical tools
            - Certifications
            - Projects relevant to target role

            4. **Final Summary (short)**  
            A clear bullet-point summary of the most important improvements.

            Make the tone professional, concise, and helpful.

            Your JSON output MUST follow this structure:

            {
            "scores": {
                "contentQuality": { "score": number, "justification": string },
                "structureFormat": { "score": number, "justification": string },
                "atsOptimization": { "score": number, "justification": string },
                "skillsKeywords": { "score": number, "justification": string },
                "totalScore": { "score": number, "justification": string }
            },
            "suggestions": [
                {
                "issue": string,
                "suggestion": string,
                "example": string,
                "priority": "High" | "Medium" | "Low"
                }
            ],
            "missingSections": [string],
            "summary": [string]
            }

            Make sure the JSON is valid.
        `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("AI Error analyzing CV:", error);
    throw error;
  }
}
