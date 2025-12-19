"use client";

import { useCV } from "@/context/CVContext";
import Slugify from "@/utils/slugify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LearningPathIndex() {
  const { analyzeResult } = useCV();
  const router = useRouter();

  useEffect(() => {
    if (!analyzeResult?.skills_gap?.recommendations?.length) return;

    const firstSkillSlug = Slugify(
      analyzeResult.skills_gap.recommendations[0].skill
    );

    // Ganti redirect() → replace()
    router.replace(`/result/skill-gap/learning-path/${firstSkillSlug}`);
  }, [analyzeResult, router]);

  return null; // tidak render apapun
}
