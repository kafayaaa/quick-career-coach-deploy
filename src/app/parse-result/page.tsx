"use client";
export const dynamic = "force-static";

import ActionButton from "@/components/ActionButton";
import CVParseSection from "@/components/CVParseSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import TableField from "@/components/TableField";
import { useCV } from "@/context/CVContext";
import { useInterview } from "@/context/InterviewContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

export default function ParseResult() {
  const { result, setResult, analyzeResult, setAnalyzeResult } = useCV();
  const { setRole } = useInterview();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    headline: "",
    education: [] as string[],
    experience: [] as string[],
    hardSkills: "",
    softSkills: "",
    languages: "",
    tools: "",
    projects: [] as string[],
    achievements: [] as string[],
    certifications: [] as string[],
    links: "",
    targetRole: "",
  });

  const [loading, setLoading] = useState(false);

  const [pdfUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("uploadedCV") || "";
    }
    return "";
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const storedData = localStorage.getItem("extractedText");

      if (!storedData) {
        alert("No extracted data found.");
        router.push("/");
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(storedData);

      // update context
      setResult(parsedData);

      // update formData
      setFormData({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        address: parsedData.address || "",
        bio: parsedData.bio || "",
        headline: parsedData.headline || "",
        education: parsedData.education || [],
        experience: parsedData.experience || [],
        hardSkills: parsedData.hardSkills || "",
        softSkills: parsedData.softSkills || "",
        languages: parsedData.languages || "",
        tools: parsedData.tools || "",
        projects: parsedData.projects || [],
        achievements: parsedData.achievements || [],
        certifications: parsedData.certifications || [],
        links: parsedData.links || "",
        targetRole: "",
      });

      setLoading(false);
    };

    fetchData();
  }, [router, setResult]);

  const addArrayField = (fieldName: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""], // Tambah field kosong
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setRole(formData.targetRole);
  };

  const handleArrayChange = (
    field: keyof typeof formData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...(prev[field] as string[])];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
    if (!formData) {
      alert("No data found");
      return;
    }

    localStorage.setItem("newCV", JSON.stringify(formData));
    setLoading(true);

    try {
      const response = await fetch("/api/cv/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const analysis = await response.json();
      // console.log("AI Analysis Result:", analysis);
      console.log("AI Analysis Result New:", analysis);

      if (!response.ok) {
        alert("Failed: " + analysis.error);
        return;
      }

      if (analysis.success) {
        setAnalyzeResult(analysis.data);
        console.log(analyzeResult);
        localStorage.setItem("analysisData", JSON.stringify(analysis.data));
        console.log("ANALYSIS DATA:", analysis.data);
        alert("Analysis completed!");
        router.push("/result/cv/overview");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error analyzing CV:", error);
        alert("Failed to analyze CV: " + error.message);
      } else {
        console.error("Unknown error analyzing CV:", error);
        alert("Failed to analyze CV.");
      }
    }

    setLoading(false);
  };

  if (!result) return <LoadingScreen />;
  return (
    <div className="w-full max-w-11/12 md:max-w-7xl min-h-screen flex flex-col md:flex-row gap-10 py-20 mt-5 md:mt-15 mx-auto">
      <div className="relative w-full h-full md:w-1/2">
        {pdfUrl && (
          <div className="block md:fixed md:top-45 md:left-2/12 w-full md:w-1/3 md:h-[calc(100vh-15rem)] px-4">
            <iframe
              src={pdfUrl}
              className="w-full h-full border rounded-lg"
            ></iframe>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-10">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2">Your CV</h1>
          <p className="text-sm md:text-base">
            Please correct your CV if there are any mistakes.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-11/12 md:max-w-xl flex flex-col items-center gap-6 md:gap-20"
        >
          <CVParseSection title="Personal Info">
            <TableField
              title="Name"
              fieldName="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TableField
              title="Email"
              fieldName="email"
              value={formData.email}
              inputType="email"
              onChange={handleChange}
            />
            <TableField
              title="Phone"
              fieldName="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TableField
              title="Address"
              fieldName="address"
              value={formData.address}
              isTextArea={true}
              onChange={handleChange}
            />
            <TableField
              title="Links"
              fieldName="links"
              value={formData.links}
              isTextArea={true}
              onChange={handleChange}
            />
            <TableField
              title="Headline"
              fieldName="headline"
              value={formData.headline}
              onChange={handleChange}
            />
            <TableField
              title="Bio"
              fieldName="bio"
              value={formData.bio}
              isTextArea={true}
              onChange={handleChange}
            />
          </CVParseSection>
          <CVParseSection
            title="Education"
            plus={true}
            onAdd={() => addArrayField("education")}
          >
            {formData.education.map((edu, i) => (
              <TableField
                key={i}
                title={`Education ${i + 1}`}
                fieldName={`education-${i}`}
                value={edu}
                onChange={(e) =>
                  handleArrayChange("education", i, e.target.value)
                }
              />
            ))}
          </CVParseSection>

          <CVParseSection title="Skills">
            <TableField
              title="Hard Skills"
              fieldName="hardSkills"
              value={formData.hardSkills}
              onChange={handleChange}
            />
            <TableField
              title="Soft Skills"
              fieldName="softSkills"
              value={formData.softSkills}
              onChange={handleChange}
            />
            <TableField
              title="Languages"
              fieldName="languages"
              value={formData.languages}
              onChange={handleChange}
            />
            <TableField
              title="Tools"
              fieldName="tools"
              value={formData.tools}
              onChange={handleChange}
            />
          </CVParseSection>

          <CVParseSection
            title="Experiences"
            plus={true}
            onAdd={() => addArrayField("experience")}
          >
            {formData.experience.map((exp, i) => (
              <TableField
                key={i}
                title={`Experience ${i + 1}`}
                fieldName={`experience-${i}`}
                value={exp}
                onChange={(e) =>
                  handleArrayChange("experience", i, e.target.value)
                }
              />
            ))}
          </CVParseSection>

          <CVParseSection
            title="Projects"
            plus={true}
            onAdd={() => addArrayField("projects")}
          >
            {formData.projects.map((proj, i) => (
              <TableField
                key={i}
                title={`Project ${i + 1}`}
                fieldName={`projects-${i}`}
                value={proj}
                onChange={(e) =>
                  handleArrayChange("projects", i, e.target.value)
                }
              />
            ))}
          </CVParseSection>

          <CVParseSection
            title="Achievements"
            plus={true}
            onAdd={() => addArrayField("achievements")}
          >
            {formData.achievements.map((ach, i) => (
              <TableField
                key={i}
                title={`Achievement ${i + 1}`}
                fieldName={`achievements-${i}`}
                value={ach}
                onChange={(e) =>
                  handleArrayChange("achievements", i, e.target.value)
                }
              />
            ))}
          </CVParseSection>

          <CVParseSection
            title="Certifications"
            plus={true}
            onAdd={() => addArrayField("certifications")}
          >
            {formData.certifications.map((ach, i) => (
              <TableField
                key={i}
                title={`Certification ${i + 1}`}
                fieldName={`certifications-${i}`}
                value={ach}
                onChange={(e) =>
                  handleArrayChange("certifications", i, e.target.value)
                }
              />
            ))}
          </CVParseSection>
          <CVParseSection title="What job do you want to apply for?">
            <TableField
              title=""
              fieldName="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
            />
          </CVParseSection>
          <ActionButton disabled={loading} type="submit">
            {loading ? (
              <div className="flex items-center">
                <LuLoaderCircle className="animate-spin" />
                <p>Analyzing your CV...</p>
              </div>
            ) : (
              <p>Analyze CV</p>
            )}
          </ActionButton>
        </form>
      </div>
    </div>
  );
}
