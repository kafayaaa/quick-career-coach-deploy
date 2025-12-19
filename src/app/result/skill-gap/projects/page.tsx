"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { motion, easeOut } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuWrench } from "react-icons/lu";

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

export default function PracticeProjects() {
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
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {analyzeResult?.skills_gap.recommendations.map((item, index) => (
        <motion.div
          variants={itemVariants}
          key={index}
          className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-5 border hover:scale-103 transition-all duration-300 ease-out"
        >
          <div className="w-full flex justify-center items-center gap-2 mb-2 text-sky-500">
            <LuWrench />
            <h3 className="text-base text-center font-semibold">
              {item.skill}
            </h3>
          </div>
          <ul className="list-disc">
            {item.practice_projects.map((project, index) => (
              <li key={index} className="text-sm ml-4">
                {project}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
