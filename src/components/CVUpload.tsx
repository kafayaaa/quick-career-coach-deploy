"use client";

import { supabase } from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoDocumentText } from "react-icons/io5";

interface CVFile {
  id?: number;
  file_name: string;
  file_url: string;
  uploaded_at?: string;
}

export default function CVUpload({ userId }: { userId?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<CVFile[]>([]);

  useEffect(() => {
    if (!userId) return;
    const fetchFiles = async () => {
      if (!userId) return;
      const { data } = await supabase
        .from("cv_files")
        .select("*")
        .eq("user_id", userId)
        .order("uploaded_at", { ascending: false });

      if (data) setUploadedFiles(data);
    };
    fetchFiles();
  }, [userId]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const fileName = `${Date.now()}_${file.name}`;

      const { error: storageError } = await supabase.storage
        .from("cv-uploads")
        .upload(fileName, file);

      if (storageError) throw storageError;

      const { data: publicUrlData } = supabase.storage
        .from("cv-uploads")
        .getPublicUrl(fileName);

      const fileUrl = publicUrlData.publicUrl;

      if (userId) {
        const { error: dbError } = await supabase.from("cv_files").insert({
          user_id: userId,
          file_name: file.name,
          file_url: fileUrl,
        });
        if (dbError) throw dbError;

        const { data } = await supabase
          .from("cv_files")
          .select("*")
          .eq("user_id", userId)
          .order("uploaded_at", { ascending: false });

        if (data) setUploadedFiles(data);
      }

      alert("Upload successful!");
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed upload file: " + err.message);
      } else {
        alert("Failed upload file");
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
      <div
        {...getRootProps()}
        className={`w-full h-40 p-10 flex flex-col items-center justify-center gap-2 border-2 border-dashed cursor-pointer transition-all rounded-xl ${
          isDragActive ? "border-sky-400" : "border-zinc-500"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-xl">File selected: {file.name}</p>
        ) : isDragActive ? (
          <p className="text-xl">Drop the file here...</p>
        ) : (
          <>
            <h2 className="flex items-center text-xl text-center font-bold">
              <IoDocumentText />
              Upload Your CV
            </h2>
            <p className="text-xl">[Click or Drag & Drop]</p>
          </>
        )}
      </div>
      <p>Supported: PDF, DOCX (max 5MB)</p>
      <button
        disabled={!file || uploading}
        onClick={uploadFile}
        className="bg-sky-400 text-zinc-50 py-2 px-4 rounded-md cursor-pointer disabled:bg-zinc-500 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 w-full">
          <h3 className="text-lg font-semibold mb-2">CV Uploaded:</h3>
          <ul className="flex flex-col gap-2">
            {uploadedFiles.map((cv) => (
              <li key={cv.id}>
                <a
                  href={cv.file_url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {cv.file_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
