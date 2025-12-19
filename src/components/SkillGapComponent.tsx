// src/components/SkillGap/SkillGapContent.tsx
"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useCV } from "@/context/CVContext";
import { SkillRecommendation } from "@/types/gapTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SkillGapContent() {
  const router = useRouter();
  const { skillGap, setSkillGap } = useCV();

  useEffect(() => {
    // Karena ini sudah pasti di Client (SSR: false),
    // kita tidak butuh lagi pengecekan isMounted.
    if (!skillGap) {
      const saved = localStorage.getItem("skillGap");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSkillGap(parsed);
        } catch (error) {
          router.push("/skill-gap");
        }
      } else {
        router.push("/skill-gap");
      }
    }
  }, [skillGap, setSkillGap, router]);

  if (!skillGap) return <LoadingScreen />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center mb-2 justify-start gap-10">
      <div className="w-full max-w-2xl flex flex-col gap-10 my-20">
        <div>
          <h2 className="font-bold text-xl text-center mb-2">Matched Skills</h2>
          <ul className="list-disc ml-6">
            {skillGap.matched_skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <section>
          <h2 className="text-xl font-bold text-center mb-2">Missing Skills</h2>
          <ul className="list-disc pl-6">
            {skillGap.missing_skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-center mb-2">Nice To Have</h2>
          <ul className="list-disc pl-6">
            {skillGap.nice_to_have_skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-lg text-center mb-2">
            Recommendations
          </h2>
          {skillGap.recommendations.map(
            (rec: SkillRecommendation, i: number) => (
              <div key={i} className="border p-4 rounded-lg mt-4">
                <h3 className="font-bold text-xl">{rec.skill}</h3>
                <div className="mt-3">
                  <h4 className="font-semibold">Learning Path</h4>
                  {Array.isArray(rec.learning_path?.fundamentals) && (
                    <div>
                      <h5 className="font-medium mt-2">Fundamentals:</h5>
                      <ul className="list-disc ml-6">
                        {rec.learning_path.fundamentals.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(rec.learning_path?.advanced) && (
                    <div>
                      <h5 className="font-medium mt-2">Advanced:</h5>
                      <ul className="list-disc ml-6">
                        {rec.learning_path.advanced.map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {/* ... sisa konten UI (Courses, Projects) tetap sama ... */}
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}
