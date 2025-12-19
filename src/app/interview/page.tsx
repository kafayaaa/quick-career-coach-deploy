"use client";
export const dynamic = "force-static";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { useInterview } from "@/context/InterviewContext";
import { NewCV } from "@/types/cv";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Interview() {
  const { loading, setLoading } = useCV();
  const { setQuestion } = useInterview();
  const [level, setLevel] = useState("junior");
  const router = useRouter();
  const [newCV] = useState<NewCV | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("newCV");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  console.log("Stored Data:", newCV);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const stored = localStorage.getItem("newCV");
      const parsedCV = stored ? JSON.parse(stored) : null;

      const response = await fetch("/api/interview/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCV: parsedCV, level }),
      });

      const questionsAI = await response.json();
      console.log("Interview Questions:", questionsAI);

      if (!response.ok) {
        alert("Failed: " + questionsAI.error);
        return;
      }

      if (questionsAI.success) {
        setQuestion(questionsAI.data);

        localStorage.setItem("questionData", JSON.stringify(questionsAI.data));

        setLoading(false);
        router.push("/interview/question");
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 py-10 md:py-20">
      <div className="max-w-10/12 md:max-w-4xl p-20 flex flex-col items-center gap-10 text-sm md:text-base bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/interview.svg"}
            alt="resume"
            width={300}
            height={300}
            className="mb-5"
          />
          <h1 className="text-xl md:text-2xl font-extrabold">Mock Interview</h1>
          <p className="">
            In this session, you can practice mock interviews with our
            AI-powered system.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center text-center"
        >
          <label htmlFor="level">Select your level</label>
          <select
            name="level"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-3 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 focus:border-zinc-50 focus:dark:border-zinc-600 focus:outline-none rounded"
          >
            <option value="junior">Junior</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
          </select>
          <button
            type="submit"
            className="px-5 py-3 flex items-center bg-sky-500 text-white font-bold rounded-md hover:bg-sky-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
