"use client";

import { useInterview } from "@/context/InterviewContext";
import Slugify from "@/utils/slugify";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AnswerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { evaluation, setEvaluation, setLoading } = useInterview();
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className="w-full flex flex-col md:flex-row md:grid md:grid-cols-12 border rounded-xl">
      <div className="w-full md:col-span-2 flex flex-row items-end md:items-stretch md:flex-col text-sm md:border-r rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-scroll md:overflow-clip">
        {evaluation?.questions.map((item, index) => {
          return (
            <div key={index} className="w-full">
              <Link
                href={`/interview/result/answer/${Slugify(
                  item.questionNumber.toString()
                )}`}
                className={`w-full flex items-center justify-center text-center text-xs md:text-sm text-nowrap md:text-wrap py-3 md:py-2 px-3 border-b hover:bg-sky-500 hover:text-zinc-50 ${
                  pathname.includes(item.questionNumber.toString())
                    ? "bg-sky-500 text-zinc-50 font-bold"
                    : ""
                }`}
              >
                <h1>Question #{item.questionNumber}</h1>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="col-span-10 p-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}
