import { model } from "../services/gemini.js";

export async function aiEvaluate(submissions: any[]) {
  try {
    const prompt = `
          You are an expert interview evaluator. Evaluate the candidate's answers carefully.

          Return your ENTIRE RESPONSE strictly in valid JSON ONLY.
          Do NOT include explanation outside JSON.
          Do NOT include markdown.
          Do NOT include backticks.
          Do NOT include text before or after JSON.

          Here are the candidate's submissions:

          ${submissions
            .map(
              (s, i) => `
          Question ${i + 1} (${s.type}):
          ${s.question}

          Answer:
          ${s.answer}
          `
            )
            .join("\n")}

          Your JSON output MUST follow this EXACT structure:

          {
            "overallScore": number, 
            "questions": [
              {
                "questionNumber": number,
                "questionType": "behavioral" | "technical" | "situational",
                "score": number,
                "strengths": string[],
                "improvements": string[],
                "betterAnswerExample": string
              }
            ],
            "summary": string
          }

          Scoring rules per question:
          - Score from 1–100.
          - Consider Structure, Content Quality, Communication Clarity, Technical Accuracy (if applicable).

          Evaluation guidelines:
          1. Strengths:
            - What the candidate did well
            - Positive behaviors or clarity
            - Strong examples, metrics, or reasoning

          2. Improvements:
            - What was missing
            - What could be clearer
            - What should be added for a better answer

          3. Better Answer Example:
            - Provide a rewritten answer that is clearer, more structured, and more impressive
            - Use STAR method for behavioral questions when helpful

          4. Summary:
            - A concise overall interview performance overview
            - Mention consistency, communication style, depth of knowledge, and confidence indicators
          }

    `;
    const result = await model.generateContent(prompt);
    let aiResponse = result.response.text().trim();
    aiResponse = aiResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 2️⃣ Sometimes Gemini adds trailing commas — remove them safely
    aiResponse = aiResponse.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

    // 3️⃣ Validate JSON
    const parsed = JSON.parse(aiResponse);
    return parsed;
  } catch (error) {
    console.error("AI Error Evaluating Submissions: ", error);
    throw error;
  }
}
