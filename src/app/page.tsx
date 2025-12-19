"use client";
export const dynamic = "force-static";

import CVUploadParser from "@/components/CVUploadParser";
import WhyGrid from "@/components/WhyGrid";
import { FaFileUpload } from "react-icons/fa";
import { FaFileCircleCheck, FaListCheck, FaStar } from "react-icons/fa6";
import Step from "@/components/Step";
import { LuFileSearch } from "react-icons/lu";
import { IoChatbubbles } from "react-icons/io5";
import ButtonScroll from "@/components/ButtonScroll";

export default function Home() {
  return (
    <div className="relative w-full mx-auto flex flex-col min-h-screen items-center justify-center">
      <div
        id="home"
        className="relative flex h-screen w-full max-w-10/12 md:max-w-7xl flex-col items-center md:items-start justify-center"
      >
        <div className="hidden md:block absolute inset-0 right-0 bg-[url('/hero.webp')] bg-contain md:bg-size-[500px] bg-no-repeat bg-center md:bg-right drop-shadow-2xl"></div>
        <div className="hidden md:block absolute right-1/3 w-60 shadow-xl">
          <div className="w-full py-3 bg-background dark:bg-zinc-700">
            <h1 className="font-bold text-center">Fullstack Developer</h1>
          </div>
          <div className="w-full py-3 bg-emerald-100">
            <ul className="list-disc text-xs text-emerald-900 list-inside ml-3">
              <li className="">Mastering several languages</li>
              <li className="">Have a leadership ability</li>
              <li className="">Have a problem-solving ability</li>
            </ul>
          </div>
          <div className="w-full py-3 bg-rose-100">
            <ul className="list-disc text-xs text-rose-900 list-inside ml-3">
              <li className="">Lack of project experience</li>
              <li className="">Do not have a working experience</li>
            </ul>
          </div>
          <div className="w-full p-3 bg-background dark:bg-zinc-700">
            <p className="text-xs">
              You have to improve your skills and your experiences through many
              projects
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="absolute -right-20 -translate-y-10 p-5 w-60 flex flex-col items-center gap-2 shadow-xl bg-background dark:bg-zinc-700">
            <p className="text-center font-bold">Your overall score</p>
            <div className="flex items-center text-3xl">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-zinc-400" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  items-center md:items-start gap-1.5 text-3xl md:text-5xl leading-tight tracking-wide bg-linear-to-b from-sky-400 to-sky-700 bg-clip-text text-transparent font-black font-playfair-display uppercase mb-5 ">
          <h1>QUICK</h1>
          <h1>CAREER COACH</h1>
        </div>
        <div className="w-full text-left md:max-w-5/12 mb-10">
          <p className="text-xs md:text-lg text-justify md:text-left">
            An AI-based application that helps job seekers improve their CVs,
            prepare for interviews, and identify skills they need to develop for
            their target position.
          </p>
        </div>
        <div className="w-9/12 md:w-4/12 flex flex-col justify-center items-center gap-5 z-10">
          <CVUploadParser />
        </div>
      </div>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center gap-5 md:gap-10 mb-20 bg-zinc-100 dark:bg-zinc-800">
        <div className="w-full max-w-10/12 md:max-w-7xl py-10 flex flex-col items-center justify-center gap-5 md:gap-20">
          <h1 className="text-center text-xl md:text-3xl font-bold">
            Why You Have To Choose Us?
          </h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
            <WhyGrid
              title="Get Instant & Accurate CV Feedback"
              desc="Without waiting long, you will immediately get a complete CV analysiswith concrete suggestions, examples of improvements, and easy-to-implement priorities."
              image="/resume.svg"
            />
            <WhyGrid
              title="Real Interview Practice"
              desc="AI provides realistic interview questions tailored to the position, then clearly assesses the user's answers—from strengths and weaknesses to examples of better answers."
              image="/interview.svg"
            />
            <WhyGrid
              title="Know what skills are still lacking"
              desc="The skill gap analysis feature helps users understand what skills they need to learn for their desired position, complete with learning recommendations."
              image="/know.svg"
            />
          </div>
          <ButtonScroll />
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-10/12 md:max-w-7xl flex flex-col items-center gap-5 md:gap-20 mb-20">
          <div className="flex flex-col md:flex-row md:gap-2 items-center text-xl md:text-3xl">
            <h1>How</h1>
            <h1 className="font-bold text-sky-500">Quick Career Coach</h1>
            <h1>improve you</h1>
          </div>
          <div className="relative w-full self-start flex flex-col items-center gap-2">
            <Step
              step={1}
              title="Upload Your CV"
              desc="Upload your newest CV to get started. You can upload a PDF or DOCX file."
              img="/upload.svg"
            >
              <FaFileUpload className="text-3xl dark:text-sky-500" />
            </Step>
            <Step
              step={2}
              title="Analyze Your CV"
              desc="AI will extract your information from your CV and what job you are applying for. AI will analyzing it for you."
              img="/search.svg"
            >
              <LuFileSearch className="text-3xl dark:text-sky-500" />
            </Step>
            <Step
              step={3}
              title="Show Your Results"
              desc="Now you can see your CV analysis and get instant feedback from what job you are applying for. It will also provide you with concrete suggestions, examples of improvements, and easy-to-implement priorities. You can also download your CV analysis as a PDF."
              img="/document.svg"
            >
              <FaFileCircleCheck className="text-3xl dark:text-sky-500" />
            </Step>
            <Step
              step={4}
              title="Mock Interview"
              desc="AI will provide realistic interview questions tailored to the position."
              img="/interview.svg"
            >
              <IoChatbubbles className="text-3xl dark:text-sky-500" />
            </Step>
            <Step
              step={5}
              title="Checking Your Answer"
              desc="AI will clearly assess the your answers—from strengths and weaknesses to examples of better answers."
              img="/choose.svg"
            >
              <FaListCheck className="text-3xl dark:text-sky-500" />
            </Step>
          </div>
          <ButtonScroll />
        </div>
      </div>
      {/* <UploadSection /> */}
    </div>
  );
}
