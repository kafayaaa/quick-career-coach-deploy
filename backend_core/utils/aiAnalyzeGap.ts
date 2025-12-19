import { model } from "../services/gemini.js";

export async function aiAnalyzeGap(updated: any, targetRole: string) {
  try {
    const prompt = `
        You are an AI specialized in career development and skill gap analysis.

        The user wants to know what skills they lack for the target job role.
        Your job is to compare the user's current skills with the typical requirements.

        Return your ENTIRE RESPONSE strictly in valid JSON ONLY.
        Do NOT include explanation outside JSON.
        Do NOT include markdown.  
        Do NOT include backticks.  
        Do NOT include text before or after JSON.

        ===========================
        USER SKILLS:
        Hard Skills: ${JSON.stringify(updated.hard_skill)}
        Soft Skills: ${JSON.stringify(updated.soft_skill)}

        TARGET ROLE:
        ${targetRole}
        ===========================

        Your task:
        1. Identify the following:
        - matched_skills: skills user already has that match the target role ✓
        - missing_skills: skills required for the role but user doesn't have ✗
        - nice_to_have_skills: optional or bonus skills

        2. For EACH missing skill, provide:
        {
            "skill": "",
            "learning_path": {
                "fundamentals": "",
                "intermediate": "",
                "advanced": ""
            },
            "recommended_courses": {
                "free": {
                    "title": "",
                    "url": ""
                    "provider": ""
                },
                "paid":{
                    "title": "",
                    "url": ""
                    "provider": ""
                },
            },
            "estimated_time_to_learn": "example: 2–3 months",
            "practice_projects": ["project example"]
        }

        3. Output must be VALID JSON ONLY.
        NO explanation outside JSON.

        Your JSON output MUST follow this structure:
        {
        "matched_skills": [],
        "missing_skills": [],
        "nice_to_have_skills": [],
        "recommendations": [
            {
                "skill": "",
                "learning_path": { ... },
                "recommended_courses": { ... },
                "estimated_time_to_learn": "",
                "practice_projects": []
            }
        ]
        }

        Make sure the JSON is valid.
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("AI Error Analyzing Gap: ", error);
    throw error;
  }
}
