"use client";

import LearningPathItem from "@/components/LearningPathItem";
import { useCV } from "@/context/CVContext";
import Slugify from "@/utils/slugify";
import { motion, easeOut } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SkillGapRecomendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { analyzeResult, setAnalyzeResult, setLoading } = useCV();
  const router = useRouter();
  const pathname = usePathname();

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <p className="text-xs">
        Upgrade yourself by learning the following materials
      </p>
      <div className="w-full flex flex-col md:flex-row md:grid md:grid-cols-12 border rounded-xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:col-span-2 flex flex-row items-end md:items-stretch md:flex-col text-sm md:border-r rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-scroll md:overflow-clip"
        >
          {analyzeResult?.skills_gap.recommendations.map((item, index) => {
            return (
              <motion.div key={index} variants={itemVariants}>
                <LearningPathItem
                  title={item.skill}
                  link={Slugify(item.skill)}
                  activePath={pathname}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <div className="col-span-10 p-5 flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}
