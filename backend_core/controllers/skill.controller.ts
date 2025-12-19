import { Request, Response } from "express";
import { aiParseSkill } from "../utils/aiParseSkill.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import mammoth from "mammoth";
import { sanitizeText } from "../utils/sanitizeText.js";
import { aiAnalyzeGap } from "../utils/aiAnalyzeGap.js";

export const parseSkillCV = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const mimetype = req.file.mimetype;
    const buffer = req.file.buffer;
    let extractedText = "";

    if (mimetype === "application/pdf") {
      const pdfData = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item: any) => ("str" in item ? item.str : ""))
          .join(" ");

        extractedText += pageText + "\n";
      }
    } else if (
      mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value || "";
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    extractedText = sanitizeText(extractedText);
    const aiResult = await aiParseSkill(extractedText);

    if (!aiResult) {
      return res
        .status(500)
        .json({ success: false, error: "AI returned no result" });
    }

    return res.status(200).json({
      success: true,
      data: aiResult,
    });
  } catch (error) {
    console.error("Failed to parse CV:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to parse CV" });
  }
};

export const analyzeGap = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No data provided" });
    }

    const { updated, targetRoleInput } = req.body;

    console.log("Received Data (Updated Skills): ", updated);
    console.log("Received Target Role: ", targetRoleInput);

    const aiData = await aiAnalyzeGap(updated, targetRoleInput);

    if (!aiData) {
      return res.status(500).json({ error: "AI returned no result" });
    }

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error: any) {
    console.error("Error analyzing skill gap:", error);
    return res.status(500).json({ error: error.message });
  }
};
