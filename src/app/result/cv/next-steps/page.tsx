"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import NextStepCard from "@/components/NextStepCard";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiTargetLock } from "react-icons/bi";
import { motion, easeOut } from "framer-motion";

export default function NextSteps() {
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
      className="w-full flex flex-col gap-3"
    >
      <div className="w-full p-5 flex flex-col gap-3 text-sky-900 dark:text-sky-100 border bg-sky-50 dark:bg-zinc-700 border-sky-200 dark:border-none rounded-lg">
        <div className="flex items-center gap-2">
          <BiTargetLock />
          <p className="text-sm font-semibold">Recomended Next Steps</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          {analyzeResult?.cv.recommendations.next_steps.map((item, index) => (
            <motion.div key={item} variants={itemVariants}>
              <NextStepCard number={index + 1} desc={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
