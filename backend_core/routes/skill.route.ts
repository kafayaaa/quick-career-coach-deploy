import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { parseSkillCV, analyzeGap } from "../controllers/skill.controller.js";

const router = Router();

router.post("/upload", upload.single("cv"), parseSkillCV);
router.post("/analyze", analyzeGap);

export default router;
