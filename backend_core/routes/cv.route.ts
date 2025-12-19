import { Router } from "express";
import { upload } from "../middleware/upload";
import { parseCV } from "../controllers/cv-parse.controller";
import { analyzeCV } from "../controllers/cv-analyze.controller";
import { downloadPDF } from "../controllers/download-pdf.controller";

const router = Router();

router.post("/upload", upload.single("cv"), parseCV);
router.post("/analyze", analyzeCV);
router.post("/download-pdf", downloadPDF);

export default router;
