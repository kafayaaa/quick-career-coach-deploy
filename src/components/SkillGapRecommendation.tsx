"use client";

import { LearningPathItem } from "@/types/analyzeResult";
import Link from "next/link";
import { BiTargetLock } from "react-icons/bi";
import { FaDollarSign, FaLink, FaRegHourglass } from "react-icons/fa6";
import { LuCrown } from "react-icons/lu";
import { RiStairsLine } from "react-icons/ri";
import { TbSeeding } from "react-icons/tb";

interface Props {
  category: string;
  data: LearningPathItem[];
}

export default function SkillGapRecommendation({ category, data }: Props) {
  return (
    <div
      className={`w-full flex flex-col items-center p-5 gap-2 rounded-xl border dark:border-l-4 dark:border-r-0 dark:border-y-0 hover:scale-103 transition-all duration-300 ease-out ${
        category === "Fundamental"
          ? "bg-emerald-50 border-emerald-200 dark:bg-zinc-700"
          : category === "Intermediate"
          ? "bg-sky-50 border-sky-200 dark:bg-zinc-700"
          : category === "Advance"
          ? "bg-amber-50 border-amber-200 dark:bg-zinc-700"
          : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          category === "Fundamental"
            ? "text-emerald-900 dark:text-emerald-200"
            : category === "Intermediate"
            ? "text-sky-900 dark:text-sky-200"
            : category === "Advance"
            ? "text-amber-900 dark:text-amber-200"
            : ""
        }`}
      >
        {category === "Fundamental" ? (
          <TbSeeding />
        ) : category === "Intermediate" ? (
          <RiStairsLine />
        ) : category === "Advance" ? (
          <LuCrown />
        ) : null}
        <h1 className="font-bold text-base">{category}</h1>
      </div>

      {/* {fundamentals.length === 0 && (
        <p className="text-sm text-gray-500">No fundamentals found.</p>
      )} */}

      {data.map((item, idx) => (
        <div
          key={idx}
          className="w-full flex flex-col gap-1 text-xs md:text-sm"
        >
          <h1 className="font-semibold text-sm md:text-base">{item.title}</h1>
          <p className="">{item.desc}</p>
          <p className="mt-1 ">Recommended Course:</p>
          <div className="w-full flex flex-col gap-2">
            {item.rec_courses?.map((course, index) => (
              <div
                key={index}
                className={`w-full p-3 rounded-xl border ${
                  category === "Fundamental"
                    ? " border-emerald-200"
                    : category === "Intermediate"
                    ? " border-sky-200"
                    : category === "Advance"
                    ? " border-amber-200"
                    : ""
                }`}
              >
                <p className="font-semibold mb-3 md:mb-2">{course.title}</p>
                <div className="w-full flex flex-col gap-3 md:gap-2">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                    <BiTargetLock />
                    <p>{course.desc}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                    <FaDollarSign />
                    <p>{course.paid ? "Paid" : "Free"}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 overflow-hidden">
                    <FaLink />
                    <Link
                      href={course.url}
                      target="blank"
                      className="truncate text-ellipsis"
                    >
                      {course.url}
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                    <FaRegHourglass />
                    <p>{course.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
