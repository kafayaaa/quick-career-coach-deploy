"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SkillResult() {
  const router = useRouter();
  const {
    skill,
    setSkill,
    skillGap,
    setSkillGap,
    targetRole,
    setTargetRole,
    loading,
    setLoading,
  } = useCV();

  // Lazy initialization (tidak update state di useEffect)
  const [hardSkillsInput, setHardSkillsInput] = useState(
    () => skill?.hard_skill?.join(", ") || ""
  );

  const [softSkillsInput, setSoftSkillsInput] = useState(
    () => skill?.soft_skill?.join(", ") || ""
  );

  const [targetRoleInput, setTargetRoleInput] = useState(
    () => targetRole || ""
  );

  // Load skill from localStorage if context is empty
  useEffect(() => {
    if (!skill) {
      const saved = localStorage.getItem("extractedSkill");

      if (saved) {
        const parsed = JSON.parse(saved);
        setSkill(parsed);

        // Sync input manually only once, but inside microtask
        Promise.resolve().then(() => {
          setHardSkillsInput(parsed.hard_skill?.join(", ") || "");
          setSoftSkillsInput(parsed.soft_skill?.join(", ") || "");
        });
      } else {
        router.push("/skill-gap");
      }
    }
  }, [skill, setSkill, router]);

  if (!skill) return <LoadingScreen />;

  const handleAnalyze = async () => {
    const updated = {
      hard_skill: hardSkillsInput.split(",").map((s) => s.trim()),
      soft_skill: softSkillsInput.split(",").map((s) => s.trim()),
    };

    setSkill(updated);
    setTargetRole(targetRoleInput);

    localStorage.setItem("extractedSkill", JSON.stringify(updated));

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/skill/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updated, targetRoleInput }),
      });

      const analysis = await response.json();
      console.log("AI Analysis Result:", analysis);

      if (!response.ok) {
        alert("Failed: " + analysis.error);
        return;
      }

      if (analysis.success) {
        setSkillGap(analysis.data);
        const skillGapLS = localStorage.setItem(
          "skillGap",
          JSON.stringify(analysis.data)
        );
        console.log("Extracted Skill Gap in Context: ", skillGap);
        console.log("Extracted Skill Gap in Local Storage: ", skillGapLS);
        setLoading(false);
        alert("Skill Gap Analyzed!");
        router.push("/skill-gap-result");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error analyzing CV:", error);
        alert("Failed to analyze Skill Gap: " + error.message);
      } else {
        console.error("Unknown error analyzing Skill Gap:", error);
        alert("Failed to analyze Skill Gap.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10 px-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center">Skill Result</h1>

        {/* TARGET ROLE */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Target Role</h2>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Input your target role here..."
            value={targetRoleInput}
            onChange={(e) => setTargetRoleInput(e.target.value)}
          />
        </div>

        {/* HARD SKILL */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Hard Skills</h2>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={hardSkillsInput}
            onChange={(e) => setHardSkillsInput(e.target.value)}
          />
        </div>

        {/* SOFT SKILL */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Soft Skills</h2>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={softSkillsInput}
            onChange={(e) => setSoftSkillsInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleAnalyze}
          className={`mt-6 w-full ${
            loading
              ? "bg-zinc-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          } text-zinc-50  p-2 rounded `}
        >
          {loading ? "Analyzing..." : "Analyze Skill Gap"}
        </button>
      </div>
    </div>
  );
}
