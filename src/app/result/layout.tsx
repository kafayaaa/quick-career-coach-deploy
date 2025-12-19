"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // jeda antar card
      delayChildren: 0.1, // delay sebelum animasi dimulai
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

interface Props {
  children: React.ReactNode;
}

export default function ResultLayout({ children }: Props) {
  const pathname = usePathname();
  const isCV = pathname.startsWith("/result/cv");
  const isSkill = pathname.startsWith("/result/skill-gap");
  return (
    <div className="w-full max-w-11/12 md:max-w-4xl min-h-screen pt-25 md:pt-40 pb-15 md:pb-20 mx-auto flex flex-col items-center justify-start">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex items-end justify-between border-b border-zinc-200 dark:border-zinc-700"
      >
        <motion.div
          variants={item}
          className={`w-full py-3 flex items-center justify-center cursor-pointer hover:border-b-4 hover:border-sky-500 transition-all duration-200 ease-out
                ${
                  isCV ? "border-b-4 border-sky-500 text-sky-500 font-bold" : ""
                }
            `}
        >
          <Link href="/result/cv/overview">CV</Link>
        </motion.div>
        <motion.div
          variants={item}
          className={`w-full py-3 flex items-center justify-center cursor-pointer hover:border-b-4 hover:border-sky-500 transition-all duration-200 ease-out
                ${
                  isSkill
                    ? "border-b-4 border-sky-500 text-sky-500 font-bold"
                    : ""
                }
            `}
        >
          <Link href="/result/skill-gap/result">Skill Gap</Link>
        </motion.div>
      </motion.div>
      {children}
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <p className="text-sm">Ready to Mock Interview?</p>
        <Link
          href="/interview"
          className="px-5 py-2 rounded bg-sky-500 text-zinc-50 font-bold hover:scale-110 transition-all duration-300 ease-out"
        >
          Go
        </Link>
      </div>
    </div>
  );
}
