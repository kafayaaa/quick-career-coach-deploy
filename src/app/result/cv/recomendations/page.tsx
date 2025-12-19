"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import RecomendationCard from "@/components/RecomendationCard";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, easeOut } from "framer-motion";

export default function DetailedResult() {
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
      className="w-full flex flex-col gap-5"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div variants={item} className="w-full h-full">
          <RecomendationCard priority="high" title="High Priority">
            {analyzeResult?.cv.recommendations.high.map((item, index) => (
              <li key={index} className="text-xs font-light">
                {item}
              </li>
            ))}
          </RecomendationCard>
        </motion.div>

        <motion.div variants={item} className="w-full h-full">
          <RecomendationCard priority="medium" title="Medium Priority">
            {analyzeResult?.cv.recommendations.medium.map((item, index) => (
              <li key={index} className="text-xs font-light">
                {item}
              </li>
            ))}
          </RecomendationCard>
        </motion.div>

        <motion.div variants={item} className="w-full h-full">
          <RecomendationCard priority="low" title="Low Priority">
            {analyzeResult?.cv.recommendations.low.map((item, index) => (
              <li key={index} className="text-xs font-light">
                {item}
              </li>
            ))}
          </RecomendationCard>
        </motion.div>
      </div>
      <div className="w-full">
        <motion.div variants={item} className="w-full h-full">
          <RecomendationCard priority="tips" title="Industry-Specific Tips">
            {analyzeResult?.cv.recommendations.tips.map((item, index) => (
              <li key={index} className="text-xs font-light">
                {item}
              </li>
            ))}
          </RecomendationCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
