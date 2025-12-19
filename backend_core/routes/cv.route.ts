import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { parseCV } from "../controllers/cv-parse.controller.js";
import { analyzeCV } from "../controllers/cv-analyze.controller.js";
import { downloadPDF } from "../controllers/download-pdf.controller.js";

const router = Router();

router.post("/upload", upload.single("cv"), parseCV);
router.post("/analyze", analyzeCV);
router.post("/download-pdf", downloadPDF);

export default router;
