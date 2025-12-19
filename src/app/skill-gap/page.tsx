"use client";

import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoDocumentText } from "react-icons/io5";

export const SkillGap = () => {
  const router = useRouter();
  const { setSkill } = useCV();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });
  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a PDF or DOCX file!");
      return;
    }
    setUploading(true);

    try {
      const form = new FormData();
      form.append("cv", file);

      const res = await fetch("http://localhost:5000/api/skill/upload", {
        method: "POST",
        body: form,
      });

      const result = await res.json();
      console.log("UPLOAD RESULT:", result);

      if (!res.ok) {
        alert("Failed: " + result.error);
        setUploading(false);
        return;
      }

      if (result.success) {
        setSkill(result.data);
        localStorage.setItem("extractedSkill", JSON.stringify(result.data));
        console.log("Extracted Skill:", result.data.text);
        alert("Upload + parse successful!");
        setFile(null);
        router.push("/skill-result");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("UPLOAD ERROR:", error);
        alert("Error uploading file: " + error.message);
      } else {
        console.error("UNKNOWN UPLOAD ERROR:", error);
        alert("Unknown error uploading file");
      }
    }

    setUploading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start gap-15 md:gap-30">
      <div className="mt-20 text-center">
        <h1 className="text-3xl">Check Your Skill Gap Here</h1>
        <p>
          Just upload your CV and what role you want to apply for. AI will help
          you identify your skill gap
        </p>
      </div>
      <div className="w-2/3 md:w-full max-w-sm flex flex-col items-center gap-3">
        <div
          {...getRootProps()}
          className={`w-full h-28 md:h-40 p-5 md:p-10 flex flex-col items-center justify-center gap-2 border-2 border-dashed cursor-pointer transition-all rounded-xl ${
            isDragActive ? "border-sky-400" : "border-zinc-500"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-base md:text-xl">File selected: {file.name}</p>
          ) : isDragActive ? (
            <p className="text-base md:text-xl">Drop the file here...</p>
          ) : (
            <>
              <h2 className="flex items-center gap-2 text-base md:text-xl text-center font-bold">
                <IoDocumentText />
                Upload Your CV
              </h2>
              <p className="text-base md:text-xl">[Click or Drag & Drop]</p>
            </>
          )}
        </div>
        <p className="text-sm md:text-base">Supported: PDF, DOCX (max 5MB)</p>

        <button
          disabled={!file || uploading}
          onClick={uploadFile}
          className="bg-sky-400 text-zinc-50 py-2 px-4 rounded-md cursor-pointer disabled:bg-zinc-500 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default SkillGap;
