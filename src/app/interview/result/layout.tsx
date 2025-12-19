"use client";

import AnalyzeTab from "@/components/AnalyzeTab";
import CircularWithValueLabel from "@/components/CircularBar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useInterview } from "@/context/InterviewContext";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineSummarize } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";

export default function InterviewResult({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cvName, setCvName] = useState<string | null>(null);
  const { evaluation, setEvaluation, loading, setLoading } = useInterview();
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    {
      title: "Answer Evaluated",
      href: "/interview/result/answer",
      icon: <TbMessageQuestion />,
    },
    {
      title: "Interview Summary",
      href: "/interview/result/summary",
      icon: <MdOutlineSummarize />,
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
      const storedData = localStorage.getItem("evaluation");
      if (!storedData) {
        alert("No data found");
        router.push("/");
        setLoading(false);
        return;
      }
      const parsedData = JSON.parse(storedData);
      setEvaluation(parsedData);
      setLoading(false);
    };
    fetchData();
  }, [router, setEvaluation, setLoading]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full max-w-11/12 md:max-w-4xl min-h-screen pt-25 md:pt-40 pb-15 md:pb-20 mx-auto flex flex-col items-center justify-start gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
        className="w-full p-5 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-30 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md"
      >
        <div className="w-full flex flex-col items-center md:items-start gap-5">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-xl">Interview Result</h1>
              {/* <button
              onClick={handleDownload}
              className="cursor-pointer p-2 rounded text-zinc-50 bg-sky-400 hover:bg-sky-600 "
            >
              <MdFileDownload />
            </button> */}
            </div>
            <div className="flex items-center gap-1">
              <h2 className="text-sm">{cvName}</h2>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-50 flex flex-col items-center gap-2 ">
          <div className="w-2/3">
            <CircularWithValueLabel value={evaluation?.overallScore || 0} />
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
  );
}
