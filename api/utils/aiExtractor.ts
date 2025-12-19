import { model } from "../services/gemini";
import { AICVData, AICVDataSchema } from "../types/ai-cv";
import { extractJSON } from "./extractJson";

export async function aiExtractCV(rawText: string): Promise<AICVData> {
  try {
    const prompt = `
You are an expert CV extraction engine specialized in CV formats.

Your task is to extract structured data from the CV text EXACTLY into valid JSON. 
Your output MUST be:
- Valid JSON only (no explanation, no markdown, no comments, no backticks)
- The structure must match the schema below exactly.

--------------------------------------
CV EXTRACTION RULES (EXTREMELY IMPORTANT)
--------------------------------------

1. CLASSIFICATION OF EXPERIENCE VS ACHIEVEMENTS
   - All job responsibilities, tasks, daily duties, job descriptions, and activities 
     performed in a role MUST go into "experience".
   - ONLY accomplishments with measurable impact, quantifiable results, improvements, 
     awards, recognitions, or explicitly written achievements may go into "achievements".
   - If the CV does NOT list achievements explicitly, keep "achievements": [].
   - When unsure, ALWAYS classify into "experience", NOT "achievements".

2.  CV FORMAT HANDLING
   - Do NOT generate degrees that are not written.
   - Many CVs list jobdesk as bullet points: ALL must go to "experience".

3. ZERO HALLUCINATION POLICY
   - Extract ONLY what clearly exists in the CV.
   - If something is not mentioned, set:
     - null for strings
     - [] for arrays

4. DATA NORMALIZATION RULES
   - "name" must be exactly the full name, not other fields.
   - "email" must be exactly the email, not social media usernames.
   - "phone" must include only digits and optional +62 country code.
   - "links" must include ONLY URLs if present.
   - "bio" or "headline" must be brief, based on CV text ONLY.

5. OUTPUT FORMAT RULES
   - Output JSON ONLY.
   - No extra text or explanation.
   - No formatting or backticks.
   - Ensure the JSON is not wrapped in triple backticks.

--------------------------------------
OUTPUT JSON SCHEMA (USE EXACTLY THIS)
--------------------------------------

{
  "name": string | null,
  "email": string | null,
  "phone": string | null,
  "address": string | null,
  "bio": string | null,
  "headline": string | null,
  "education": string[],
  "experience": string[],
  "hardSkills": string[],
  "softSkills": string[],
  "languages": string[],
  "tools": string[],
  "projects": string[],
  "achievements": string[],
  "certifications": string[],
  "links": string[]
}

--------------------------------------
NOW PROCESS THE FOLLOWING CV TEXT:
--------------------------------------

"""
${rawText}
"""

`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();
    const jsonString = extractJSON(aiResponse);
    const parsed = JSON.parse(jsonString);
    const validated = AICVDataSchema.parse(parsed);

    return validated;
  } catch (error) {
    console.error("AI extraction error:", error);

    // fallback → kosong
    return {
      name: null,
      email: null,
      phone: null,
      address: null,
      bio: null,
      headline: null,
      education: [],
      experience: [],
      hardSkills: [],
      softSkills: [],
      languages: [],
      tools: [],
      projects: [],
      achievements: [],
      certifications: [],
      links: [],
    };
  }
}
