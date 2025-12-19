"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useInterview } from "@/context/InterviewContext";
import Slugify from "@/utils/slugify";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
  MdOutlineChatBubbleOutline,
  MdOutlineMarkChatRead,
  MdOutlineThumbUpOffAlt,
} from "react-icons/md";

export default function DetailedResult() {
  const {
    question,
    setQuestion,
    evaluation,
    setEvaluation,
    loading,
    setLoading,
  } = useInterview();

  const [answer, setAnswer] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("interviewAnswers");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed parsing answers:", e);
      return [];
    }
  });

  const router = useRouter();
  const params = useParams();

  const slug = Array.isArray(params.answer)
    ? params.answer.at(-1)
    : params.answer;

  useEffect(() => {
    setLoading(true);

    const evaluationLS = localStorage.getItem("evaluation");
    const questionLS = localStorage.getItem("questionData");

    if (!evaluationLS || !questionLS) {
      router.push("/");
      return;
    }

    const evaluationParsed = JSON.parse(evaluationLS);
    const questionParsed = JSON.parse(questionLS);

    setEvaluation(evaluationParsed);

    // Ambil array-nya saja
    setQuestion(
      Array.isArray(questionParsed)
        ? questionParsed
        : questionParsed.questions ?? []
    );

    setLoading(false);
  }, [router, setEvaluation, setQuestion, setLoading]);

  // 1️⃣ CEK DULU apakah evaluation sudah ada
  if (!evaluation || !evaluation.questions) return <div>Loading...</div>;

  // 2️⃣ CEK DULU apakah question array valid
  if (!Array.isArray(question) || question.length === 0)
    return <LoadingScreen />;

  const evaluationData = evaluation.questions.find(
    (item) => Slugify(item.questionNumber.toString()) === slug
  );

  if (!evaluationData) return <div>Invalid question</div>;
  if (loading) return <LoadingScreen />;

  const questionType = question.find(
    (item) => item.type === evaluationData.questionType
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col pb-5 border-b">
        <div className="w-full flex justify-between">
          <h2 className="font-bold">
            {questionType?.type === "behavioral"
              ? "Behavioral"
              : questionType?.type === "technical"
              ? "Technical"
              : "Situational"}{" "}
            Question
          </h2>
          <h1
            className={`font-bold ${
              evaluationData.score < 50
                ? "text-rose-500"
                : evaluationData.score <= 75
                ? "text-amber-500"
                : "text-emerald-500"
            }`}
          >
            {evaluationData.score}
          </h1>
        </div>
        <p className="text-justify text-sm md:text-base">
          {questionType?.question}
        </p>
      </div>
      <div className="flex flex-col gap-2 pb-5 border-b">
        <div className="">
          <div className="flex items-center gap-2 text-sky-500">
            <MdOutlineChatBubbleOutline />
            <h2 className="font-bold">Your Answer:</h2>
          </div>
          <p className="text-justify text-sm md:text-base">
            {questionType?.type === "behavioral"
              ? answer[0]
              : questionType?.type === "technical"
              ? answer[1]
              : answer[2]}
          </p>
        </div>
        <div className="flex flex-col text-xs md:text-sm">
          <div className="flex items-center gap-2 text-sky-500">
            <MdOutlineThumbUpOffAlt />
            <p className="font-semibold">Strengths:</p>
          </div>
          <ul className="list-disc ml-4 md:text-justify">
            {evaluationData.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-emerald-500">
            <MdOutlineMarkChatRead />
            <h2 className="font-bold">Better Answer:</h2>
          </div>
          <p className="text-justify text-sm md:text-base">
            {evaluationData.betterAnswerExample}
          </p>
        </div>
        <div className="flex flex-col text-xs md:text-sm">
          <div className="flex items-center gap-2 text-emerald-500">
            <FaArrowTrendUp />
            <p className="font-semibold">Improvements:</p>
          </div>
          <ul className="list-disc ml-4 text-justify">
            {evaluationData.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
