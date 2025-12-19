"use client";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

export default function UploadSection() {
  return (
    <div
      id="upload-cv"
      className="w-full h-screen flex flex-col items-center justify-center gap-15 md:gap-30"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl text-center font-bold">
          3 Step to Career Success
        </h2>
        <ol className="list-decimal text-base md:text-xl">
          <li>
            <p className="flex items-center gap-1">
              Upload CV <MdArrowRightAlt /> Get feedback
            </p>
          </li>
          <li>Practice mock interview</li>
          <li>Identify skill gaps</li>
        </ol>
      </div>
      <div>
        <Link href="/skill-gap" className="px-3 py-2 rounded bg-sky-500">
          Check your skill gap
        </Link>
      </div>
    </div>
  );
}
