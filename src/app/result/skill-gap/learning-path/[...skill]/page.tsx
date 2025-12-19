"use client";
export const dynamic = "force-static";

import { use } from "react";
import { useCV } from "@/context/CVContext";
import SkillGapRecommendation from "@/components/SkillGapRecommendation";
import Slugify from "@/utils/slugify";
import { motion, easeOut } from "framer-motion";

interface PageProps {
  params: Promise<{ skill: string[] }>;
}

export default function SkillGapRecomendationsItem({ params }: PageProps) {
  const resolvedParams = use(params);
  const { analyzeResult } = useCV();

  const slug = resolvedParams.skill.at(-1);

  const recommendation = analyzeResult?.skills_gap?.recommendations?.find(
    (item) => Slugify(item.skill) === slug
  );

  // Jika recommendation tidak ketemu
  if (!recommendation) {
    return <div>No recommendation found</div>;
  }

  const fundamentals = recommendation.learning_path?.fundamentals ?? [];
  const intermediate = recommendation.learning_path?.intermediate ?? [];
  const advance = recommendation.learning_path?.advanced ?? [];

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // jeda antar card
        delayChildren: 0.1, // delay sebelum animasi dimulai
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col gap-5"
    >
      <motion.div variants={itemVariants}>
        <SkillGapRecommendation category="Fundamental" data={fundamentals} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SkillGapRecommendation category="Intermediate" data={intermediate} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SkillGapRecommendation category="Advance" data={advance} />
      </motion.div>
    </motion.div>
  );
}
