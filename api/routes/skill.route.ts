import { Router } from "express";
import { upload } from "../middleware/upload";
import { parseSkillCV, analyzeGap } from "../controllers/skill.controller";

const router = Router();

router.post("/upload", upload.single("cv"), parseSkillCV);
router.post("/analyze", analyzeGap);

export default router;
