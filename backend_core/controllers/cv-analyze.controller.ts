import { Request, Response } from "express";
import { aiAnalyzeCV } from "../utils/aiAnalyze.js";
import { aiAnalyzeCVNew } from "../utils/aiAnalyzeNew.js";

export const analyzeCV = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      alert("No data provided");
      return res.status(400).json({ error: "No data provided" });
    }
    const data = req.body;
    console.log("Received Data: ", data);

    // const aiData = await aiAnalyzeCV(data, data.targetRole);
    const aiData = await aiAnalyzeCVNew(data, data.targetRole);
    console.log(aiData);

    if (!aiData) {
      return res.status(500).json({ error: "AI returned no result" });
    }

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error: unknown) {
    console.error("Error analyzing CV:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return res.status(500).json({ error: errorMessage });
  }
};
