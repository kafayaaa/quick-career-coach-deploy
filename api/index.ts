import dotenv from "dotenv";
dotenv.config();

import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import cvRouter from "./routes/cv.route";
import interviewRouter from "./routes/interview.route";
import skillRouter from "./routes/skill.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cv", cvRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/skill", skillRouter);

// app.listen(process.env., () => {
//   console.log(`Server running on http://localhost:${process.env.PORT}`);
// });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 BACKEND ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

export default app;
