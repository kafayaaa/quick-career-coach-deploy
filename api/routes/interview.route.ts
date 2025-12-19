import { Router } from "express";
import { evaluate, questions } from "../controllers/int-ques.controller";

const router = Router();

router.post("/questions", questions);
router.post("/evaluate", evaluate);

export default router;
