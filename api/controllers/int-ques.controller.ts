import { Request, Response } from "express";
import { aiQuestion } from "../utils/aiQuestion";
import { aiEvaluate } from "../utils/aiEvaluate";

export const questions = async (req: Request, res: Response) => {
  try {
    if (!req) return res.status(400).json({ error: "No data provided" });
    const data = req.body;
    console.log("CV Data: ", data.newCV);
    console.log("Level Data: ", data.level);

    const aiData = await aiQuestion(data.newCV, data.level);
    console.log(aiData);

    if (!aiData) {
      return res.status(500).json({ error: "AI returned no result" });
    }

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const evaluate = async (req: Request, res: Response) => {
  const { submissions } = req.body;
  if (!submissions) return res.status(400).json({ error: "No data provided" });
  console.log("Submissions Data: ", submissions);

  try {
    const evaluation = await aiEvaluate(submissions);
    console.log("AI Evaluation Result: ", evaluation);
    return res.status(200).json(evaluation);
  } catch (error: any) {
    console.error("Error evaluating answers:", error);
    return res.status(500).json({ error: error.message });
  }
};
