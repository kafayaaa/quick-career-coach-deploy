"use client";

import DetailResult from "@/components/DetailResult";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, easeOut } from "framer-motion";

export default function DetailedResultLayout() {
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
        staggerChildren: 0.2, // jeda antar card
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
      className="w-full flex flex-col gap-3"
    >
      <motion.div variants={item}>
        <DetailResult
          title="ATS Compatibility"
          score={analyzeResult?.cv.results.ats.score || 0}
          desc={analyzeResult?.cv.results.ats.desc || ""}
        >
          {analyzeResult?.cv.results.ats.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Formatting"
          score={analyzeResult?.cv.results.formatting.score || 0}
          desc={analyzeResult?.cv.results.formatting.desc || ""}
        >
          {analyzeResult?.cv.results.formatting.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Contact Information"
          score={analyzeResult?.cv.results.contact.score || 0}
          desc={analyzeResult?.cv.results.contact.desc || ""}
        >
          {analyzeResult?.cv.results.contact.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Education"
          score={analyzeResult?.cv.results.education.score || 0}
          desc={analyzeResult?.cv.results.education.desc || ""}
        >
          {analyzeResult?.cv.results.education.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Skill Section"
          score={analyzeResult?.cv.results.skills.score || 0}
          desc={analyzeResult?.cv.results.skills.desc || ""}
        >
          {analyzeResult?.cv.results.skills.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Work Experience"
          score={analyzeResult?.cv.results.experience.score || 0}
          desc={analyzeResult?.cv.results.experience.desc || ""}
        >
          {analyzeResult?.cv.results.experience.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Projects"
          score={analyzeResult?.cv.results.projects.score || 0}
          desc={analyzeResult?.cv.results.projects.desc || ""}
        >
          {analyzeResult?.cv.results.projects.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Achievements"
          score={analyzeResult?.cv.results.achievements.score || 0}
          desc={analyzeResult?.cv.results.achievements.desc || ""}
        >
          {analyzeResult?.cv.results.achievements.recommend.map(
            (item, index) => (
              <li key={index} className="text-xs">
                {item}
              </li>
            )
          )}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Certifications"
          score={analyzeResult?.cv.results.certifications.score || 0}
          desc={analyzeResult?.cv.results.certifications.desc || ""}
        >
          {analyzeResult?.cv.results.certifications.recommend.map(
            (item, index) => (
              <li key={index} className="text-xs">
                {item}
              </li>
            )
          )}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Keywords"
          score={analyzeResult?.cv.results.keywords.score || 0}
          desc={analyzeResult?.cv.results.keywords.desc || ""}
        >
          {analyzeResult?.cv.results.keywords.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>

      <motion.div variants={item}>
        <DetailResult
          title="Professional Summary"
          score={analyzeResult?.cv.results.summary.score || 0}
          desc={analyzeResult?.cv.results.summary.desc || ""}
        >
          {analyzeResult?.cv.results.summary.recommend.map((item, index) => (
            <li key={index} className="text-xs">
              {item}
            </li>
          ))}
        </DetailResult>
      </motion.div>
    </motion.div>
  );
}
