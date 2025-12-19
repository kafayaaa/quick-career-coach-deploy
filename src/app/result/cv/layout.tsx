"use client";
export const dynamic = "force-static";

import AnalyzeTab from "@/components/AnalyzeTab";
import CircularWithValueLabel from "@/components/CircularBar";
import { LoadingScreen } from "@/components/LoadingScreen";
import Notif from "@/components/Notif";
import { useCV } from "@/context/CVContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { BiTargetLock } from "react-icons/bi";
import {
  FaChartColumn,
  FaRegCircleCheck,
  FaRegLightbulb,
} from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";
import type { AnalyzeResult } from "@/types/analyzeResult";
import { motion } from "framer-motion";
import { MdFileDownload } from "react-icons/md";

interface CategorizedResults {
  fail: string[];
  warning: string[];
  pass: string[];
}

export default function AnalyzeResult({
  children,
}: {
  children: React.ReactNode;
}) {
  const { analyzeResult, setAnalyzeResult, setLoading } = useCV();
  const [cvName, setCvName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    {
      title: "Overview",
      href: "/result/cv/overview",
      icon: <FaChartColumn />,
    },
    {
      title: "Detailed Result",
      href: "/result/cv/detailed-result",
      icon: <LuClipboardList />,
    },
    {
      title: "Recomendations",
      href: "/result/cv/recomendations",
      icon: <FaRegLightbulb />,
    },
    {
      title: "Next Steps",
      href: "/result/cv/next-steps",
      icon: <BiTargetLock />,
    },
  ];

  useEffect(() => {
    // memastikan jalan hanya di client & setelah render
    requestAnimationFrame(() => {
      const name = localStorage.getItem("CVname");
      setCvName(name);
    });
  }, []);

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

  const handleDownload = async () => {
    if (!analyzeResult) return alert("No analysis result");

    const response = await fetch("/api/cv/download-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analyzeResult),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-analysis.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const FAIL = "fail";
  const WARNING = "warning";
  const PASS = "pass";

  function getCategory(score: number) {
    if (score < 50) return FAIL;
    if (score <= 75) return WARNING;
    return PASS;
  }

  function categorizeCvResults(
    analyzeResult: AnalyzeResult
  ): CategorizedResults {
    if (!analyzeResult) return { fail: [], warning: [], pass: [] };

    const categorized: CategorizedResults = {
      fail: [],
      warning: [],
      pass: [],
    };

    const results = analyzeResult.cv.results;

    Object.entries(results).forEach(([key, value]) => {
      if (key === "overall") return;

      const category = getCategory(value.score);
      categorized[category].push(key);
    });

    return categorized;
  }

  const categories = categorizeCvResults(analyzeResult as AnalyzeResult);

  if (!cvName) return;
  if (!analyzeResult) return <LoadingScreen />;

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
          className="w-full p-5 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-30 bg-zinc-50 dark:bg-zinc-800 rounded-b-xl shadow-md"
        >
          <div className="w-full flex flex-col items-center md:items-start gap-5">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-xl">CV Analysis Result</h1>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer p-2 rounded text-zinc-50 bg-sky-400 hover:bg-sky-600 "
                >
                  <MdFileDownload />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <h2 className="text-sm">{cvName}</h2>
              </div>
            </div>
            <div className="w-full flex justify-between md:justify-start items-center md:gap-20 text-xs md:text-sm">
              <Notif count={categories.pass.length} title="Pass">
                <FaRegCircleCheck className="text-lg text-emerald-500" />
              </Notif>
              <Notif count={categories.warning.length} title="Warnings">
                <RiErrorWarningLine className="text-xl text-amber-500" />
              </Notif>
              <Notif count={categories.fail.length} title="Issues">
                <VscError className="text-lg text-rose-500" />
              </Notif>
            </div>
          </div>
          <div className="w-1/2 md:w-50 flex flex-col items-center gap-2 ">
            <div className="w-2/3">
              <CircularWithValueLabel
                value={analyzeResult.cv.results.overall.score}
              />
            </div>
            <p className="text-sm font-light">Overall Score</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
            type: "keyframes",
            ease: "easeOut",
          }}
          className="w-full flex flex-col items-center p-5 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md overflow-clip md:overflow-hidden"
        >
          <div className="w-full flex items-end gap-5 md:gap-10 border-b border-zinc-200 dark:border-zinc-700 overflow-scroll md:overflow-hidden">
            {tabs.map((tab) => (
              <AnalyzeTab key={tab.href} activePath={pathname} {...tab}>
                {tab.icon}
              </AnalyzeTab>
            ))}
          </div>
          <div className="w-full pt-5">{children}</div>
        </motion.div>
      </div>
    </>
  );
}
