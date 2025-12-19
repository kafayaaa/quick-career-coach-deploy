import { model } from "../services/gemini.js";

export async function aiQuestion(newCV: any, level: string) {
  try {
    const prompt = `
            You are an experienced HR interviewer.

            Return your ENTIRE RESPONSE strictly in valid JSON ONLY.
            Do NOT include explanation outside JSON.
            Do NOT include markdown.
            Do NOT include backticks.  
            Do NOT include text before or after JSON.            

            Generate 3 mock interview questions for the role: ${newCV.targetRole}.

            Use this format:
            1. Behavioral question (use STAR format)
            2. Technical question (role-specific)
            3. Situational question (problem-solving)

            Context about the candidate:
            ${newCV}

            Role level: ${level}

            Requirements:
            - Questions must be realistic, commonly asked, and aligned with the candidate’s background.
            - Question #1 MUST require STAR-formatted answer.
            - Question #2 MUST reflect real technical knowledge for the target role.
            - Question #3 MUST be a scenario that tests judgment, critical thinking, or problem solving.

           Your JSON output MUST follow this structure:
            {
            "questions": [
                {"type": "behavioral", "question": "..."},
                {"type": "technical", "question": "..."},
                {"type": "situational", "question": "..."}
            ]
            }

            Make sure the JSON is valid.
        `;
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("AI Error Generating Question: ", error);
    throw error;
  }
}
