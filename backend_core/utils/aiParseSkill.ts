import { model } from "../services/gemini";

export async function aiParseSkill(rawText: string) {
  try {
    const prompt = `
        You will extract ONLY the skills that appear inside the user's CV content.

        Rules:
        - Hard skills = technical abilities, tools, software, programming languages, methodologies, analytics skills, concrete measurable abilities.
        - Soft skills = behavioral or interpersonal abilities (communication, teamwork, leadership, problem-solving, etc).
        - NO examples, NO extra fields, NO explanation, NO commentary.
        - If a category has no skills mentioned, return an empty array.

        Here is a CV file in base64 format:
        ${rawText}

        Your task:
        1. Extract **only HARD SKILLS** actually written in the CV.
        2. Extract **only SOFT SKILLS** actually written in the CV.
        3. Do NOT infer or guess any skill.
        4. Do NOT add skills that are not explicitly present.
        5. Do NOT include job responsibilities, experience, tools, or technologies that are not directly mentioned.

        2. Do not take:
        ❌ work experience
        ❌ education
        ❌ summary
        ❌ projects
        ❌ hobbies
        ❌ certifications
        ❌ statistics or other figures
        ❌ any other content

        3. The output format **MUST be valid JSON**, no other text.

        Format output STRICTLY as JSON:
        {
        "hard_skill": [],
        "soft_skill": []
        }

        Now extract the skills from the CV above.
        Just return JSON.
    `;

    const result = await model.generateContent(prompt);

    const raw = result.response.text().trim();

    const cleaned = raw.replace(/```json|```/g, "");

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error parsing Skill CV:", error);
    throw error;
  }
}
