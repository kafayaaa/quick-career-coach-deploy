"use client";
export const dynamic = "force-static";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useInterview } from "@/context/InterviewContext";
import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface InterviewQuestion {
  type: "behavioral" | "technical" | "situational";
  question: string;
}

interface QuestionData {
  questions: InterviewQuestion[];
}

export default function Question() {
  // Load questions from localStorage once
  const [data] = useState<QuestionData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("questionData");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("JSON error:", e);
      return null;
    }
  });

  // store user answers
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("interviewAnswers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(false);
  const total = data?.questions?.length || 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState((1 / total) * 100);
  const { setEvaluation } = useInterview();
  const router = useRouter();

  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const updateProgress = (index: number) => {
    setProgress(((index + 1) / total) * 100);
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    // jika Tab
    if (e.key === "Tab") {
      e.preventDefault();

      if (e.shiftKey) {
        // Shift + Tab -> pindah ke previous
        // pindah index ke prev
        setCurrentIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          updateProgress(newIndex);
          return newIndex;
        });

        // beri fokus ke tombol previous jika ada
        prevBtnRef.current?.focus();
      } else {
        // Tab -> pindah ke next
        setCurrentIndex((prev) => {
          const newIndex = Math.min(
            prev + 1,
            (data?.questions?.length || 1) - 1
          );
          updateProgress(newIndex);
          return newIndex;
        });

        // beri fokus ke tombol next jika ada
        nextBtnRef.current?.focus();
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const isAllAnswersValid = data?.questions.every((_, index) => {
    const answer = answers[index] || "";
    return answer.trim().length >= 50;
  });

  const handleSubmit = async () => {
    if (!data) return;

    const payload = data.questions.map((q, index) => ({
      question: q.question,
      type: q.type,
      answer: answers[index] || "",
    }));

    try {
      setLoading(true);
      const res = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissions: payload }),
      });

      const evaluation = await res.json();

      if (!evaluation || typeof evaluation !== "object") {
        console.error("Invalid evaluation:", evaluation);
        return;
      }

      if (!evaluation) {
        console.error("Missing criteria in evaluation:", evaluation);
        return;
      }

      localStorage.setItem("evaluation", JSON.stringify(evaluation));
      setEvaluation(evaluation);
      setLoading(false);
      router.push("/interview/result/answer");
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("interviewAnswers", JSON.stringify(answers));
    }
  }, [answers]);

  if (!data) return <LoadingScreen />;
  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="w-full flex flex-col gap-10 text-sm md:text-base">
        <LinearProgress
          value={progress}
          variant="determinate"
          className="!h-1.5 !bg-zinc-300 dark:!bg-zinc-500 rounded-full"
          classes={{
            bar: `!bg-sky-500 rounded-full`,
          }}
        />
        <div className="flex flex-col gap-5">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data?.questions?.map((item, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 flex flex-col justify-between gap-5"
                  aria-hidden={currentIndex !== index}
                >
                  <div className="w-full h-full max-w-3xl p-5 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                    <p className="font-semibold mb-2 capitalize">
                      {item.type} Question:
                    </p>
                    <p className="mb-4">{item.question}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <textarea
                      className="w-full min-h-32 p-3 border border-zinc-200 rounded-lg focus:outline-none"
                      placeholder="Type your answer here..."
                      value={answers[index] || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleTextareaKeyDown(e, index)}
                      maxLength={1000}
                      required
                    />
                    <div className="w-full flex justify-between text-end text-xs text-zinc-500">
                      <p>Type min 50 characters</p>
                      {/* Real-time Character Counter */}
                      <p className="">
                        {answers[index]?.trim().length || 0} / 1000 characters
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-5 mx-auto">
            <button
              ref={prevBtnRef}
              disabled={currentIndex === 0}
              className="p-4 bg-sky-400 hover:bg-sky-500 text-white rounded-full disabled:bg-zinc-300 dark:disabled:bg-zinc-700 cursor-pointer"
              onClick={() => {
                setCurrentIndex((prev) => {
                  const newIndex = prev - 1;
                  updateProgress(newIndex);
                  return newIndex;
                });
              }}
            >
              <FaAngleLeft />
            </button>

            <button
              ref={nextBtnRef}
              disabled={currentIndex === data.questions.length - 1}
              className="p-4 bg-sky-400 hover:bg-sky-500 text-white rounded-full disabled:bg-zinc-300 dark:disabled:bg-zinc-700 cursor-pointer"
              onClick={() => {
                setCurrentIndex((prev) => {
                  const newIndex = prev + 1;
                  updateProgress(newIndex);
                  return newIndex;
                });
              }}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !isAllAnswersValid}
          className="px-6 py-3 bg-sky-400 hover:bg-sky-500 text-white rounded-lg disabled:bg-zinc-300 dark:disabled:bg-zinc-700 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Evaluating..." : "Submit All Answers"}
        </button>
      </div>
    </>
  );
}
