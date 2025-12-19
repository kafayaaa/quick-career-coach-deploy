"use client";
export const dynamic = "force-static";

import { LoadingScreen } from "@/components/LoadingScreen";
import RecomendationCard from "@/components/RecomendationCard";
import { useCV } from "@/context/CVContext";
import { motion, easeOut } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SkillGapResult() {
  const { analyzeResult, setAnalyzeResult, loading, setLoading } = useCV();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedData = localStorage.getItem("analysisData");
      if (!storedData) {
        alert("No data found");
        router.push("/");
        setLoading(false);
        return;
      }
      const parsedData = JSON.parse(storedData);
      setAnalyzeResult(parsedData);
      setLoading(false);
    };
    fetchData();
  }, [router, setAnalyzeResult, setLoading]);

  if (loading) return <LoadingScreen />;

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // jeda antar card
        delayChildren: 0.1, // delay sebelum animasi dimulai
      },
    },
  };

  const item = {
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
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      <motion.div variants={item} className="w-full h-full">
        <RecomendationCard priority="match" title="Matched Skills">
          {analyzeResult?.skills_gap.matched_skills.map((item, index) => (
            <li key={index} className="text-xs font-light">
              {item}
            </li>
          ))}
        </RecomendationCard>
      </motion.div>

      <motion.div variants={item} className="w-full h-full">
        <RecomendationCard priority="miss" title="Missing Skills">
          {analyzeResult?.skills_gap.missing_skills.map((item, index) => (
            <li key={index} className="text-xs font-light">
              {item}
            </li>
          ))}
        </RecomendationCard>
      </motion.div>

      <motion.div variants={item} className="w-full h-full">
        <RecomendationCard priority="nice" title="Nice to have Skills">
          {analyzeResult?.skills_gap.nice_to_have_skills.map((item, index) => (
            <li key={index} className="text-xs font-light">
              {item}
            </li>
          ))}
        </RecomendationCard>
      </motion.div>
    </motion.div>
  );
}
