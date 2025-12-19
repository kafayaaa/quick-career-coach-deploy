"use client";
export const dynamic = "force-static";

import { useCV } from "@/context/CVContext";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuLoaderCircle } from "react-icons/lu";
import ActionButton from "./ActionButton";

export default function CVUploadParser() {
  const router = useRouter();
  const { setResult } = useCV();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a PDF or DOCX file!");
      return;
    }
    setUploading(true);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Simpan BASE64 ke localStorage
      localStorage.setItem("CVname", file.name);
      localStorage.setItem("uploadedCV", base64);

      const form = new FormData();
      form.append("cv", file);

      const res = await fetch("/api/cv/upload", {
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
        setResult(result);
        localStorage.setItem(
          "extractedText",
          JSON.stringify(result.extractedByAI)
        );
        console.log("Extracted text:", result.text);
        alert("Upload + parse successful!");
        setFile(null);
        router.push("/parse-result");
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <>
      <div className="w-full p-5 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <div
          {...getRootProps()}
          className={`w-full h-28 md:h-40 p-5 md:p-10 flex flex-col items-center justify-center gap-2 border-dashed cursor-pointer transition-all rounded-xl ${
            isDragActive
              ? "border-4 border-sky-400"
              : "border-2 border-zinc-500"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-xs md:text-base">File selected: {file.name}</p>
          ) : isDragActive ? (
            <p className="text-xs md:text-base">Drop your CV here...</p>
          ) : (
            <>
              <p className="text-xs md:text-base">
                <span className="font-bold text-sky-500">Click</span> or{" "}
                <span className="font-bold text-sky-500">Drag & Drop</span> your{" "}
                <span className="font-bold text-sky-500">PDF</span> or{" "}
                <span className="font-bold text-sky-500">DOCX</span> CV here to
                get analyze score
              </p>
            </>
          )}
        </div>
      </div>

      <ActionButton disabled={!file || uploading} onClick={uploadFile}>
        {uploading ? (
          <div className="flex items-center">
            <LuLoaderCircle className="animate-spin ml-2" />
            <p>Analyzing your CV...</p>
          </div>
        ) : (
          <p>Analyze CV</p>
        )}
      </ActionButton>
    </>
  );
}
