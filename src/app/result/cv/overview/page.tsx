"use client";
export const dynamic = "force-static";

import { LoadingScreen } from "@/components/LoadingScreen";
import OverviewCard from "@/components/OverviewCard";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FcAnswers,
  FcApproval,
  FcBriefcase,
  FcBusinessContact,
  FcCollect,
  FcDocument,
  FcGraduationCap,
  FcOpenedFolder,
  FcOrganization,
  FcRating,
  FcSearch,
} from "react-icons/fc";
import { motion, easeOut } from "framer-motion";

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

export default function Overview() {
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
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      <motion.div variants={item}>
        <OverviewCard
          title="ATS Compatibility"
          score={analyzeResult?.cv.results.ats.score || 0}
        >
          <FcAnswers />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Formatting"
          score={analyzeResult?.cv.results.formatting.score || 0}
        >
          <FcDocument />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Contact Information"
          score={analyzeResult?.cv.results.contact.score || 0}
        >
          <FcBusinessContact />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Education"
          score={analyzeResult?.cv.results.education.score || 0}
        >
          <FcGraduationCap />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Skill Section"
          score={analyzeResult?.cv.results.skills.score || 0}
        >
          <FcCollect />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Work Experience"
          score={analyzeResult?.cv.results.experience.score || 0}
        >
          <FcOrganization />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Projects"
          score={analyzeResult?.cv.results.projects.score || 0}
        >
          <FcOpenedFolder />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Achievements"
          score={analyzeResult?.cv.results.achievements.score || 0}
        >
          <FcRating />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Certifications"
          score={analyzeResult?.cv.results.certifications.score || 0}
        >
          <FcApproval />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Keywords"
          score={analyzeResult?.cv.results.keywords.score || 0}
        >
          <FcSearch />
        </OverviewCard>
      </motion.div>

      <motion.div variants={item}>
        <OverviewCard
          title="Professional Summary"
          score={analyzeResult?.cv.results.summary.score || 0}
        >
          <FcBriefcase />
        </OverviewCard>
      </motion.div>
    </motion.div>
  );
}
