"use client";

import { useInterview } from "@/context/InterviewContext";
import Slugify from "@/utils/slugify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AnswerIndex() {
  const { evaluation } = useInterview();
  const router = useRouter();

  useEffect(() => {
    if (!evaluation?.questions.length) return;

    const firstAnswerSlug = Slugify(
      evaluation.questions[0].questionNumber.toString()
    );

    // Ganti redirect() → replace()
    router.replace(`/interview/result/answer/${firstAnswerSlug}`);
  }, [evaluation, router]);

  return null; // tidak render apapun
}
