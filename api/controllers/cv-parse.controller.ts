import { Request, Response } from "express";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import mammoth from "mammoth";
import { aiExtractCV } from "../utils/aiExtractor";
import { sanitizeText } from "../utils/sanitizeText";

export const parseCV = async (req: Request, res: Response) => {
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
    const aiData = await aiExtractCV(extractedText);
    console.log(aiData);

    function sanitizeAIOutput(ai: any) {
      const clean = JSON.stringify(ai)
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/[<>]/g, "");

      return JSON.parse(clean);
    }

    const cleanedAI = sanitizeAIOutput(aiData);
    console.log(cleanedAI);

    return res.status(200).json({
      success: true,
      fileType: mimetype.includes("pdf") ? "pdf" : "docx",
      rawText: extractedText,
      extractedByAI: cleanedAI,
    });
  } catch (error: unknown) {
    console.error("PARSER ERROR:", error);

    // Cek apakah error adalah instance dari Error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return res.status(500).json({ error: errorMessage });
  }
};
