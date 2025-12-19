"use client";
export const dynamic = "force-static";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useInterview } from "@/context/InterviewContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InterviewSummary() {
  const { evaluation, setEvaluation, loading, setLoading } = useInterview();

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const evaluationLS = localStorage.getItem("evaluation");

    if (!evaluationLS) {
      router.push("/");
      return;
    }

    const evaluationParsed = JSON.parse(evaluationLS);

    setEvaluation(evaluationParsed);

    setLoading(false);
  }, [router, setEvaluation, setLoading]);

  // 1️⃣ CEK DULU apakah evaluation sudah ada
  if (!evaluation) return <div>Loading...</div>;

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full p-5 md:text-justify text-sm md:text-base">
      {evaluation.summary}
    </div>
  );
}
