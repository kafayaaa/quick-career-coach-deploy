import { FaRegCircleCheck } from "react-icons/fa6";
import {
  FcAnswers,
  FcApproval,
  FcBriefcase,
  FcBusinessContact,
  FcCollect,
  FcDocument,
  FcGraduationCap,
  FcOpenedFolder,
  FcOrganization,
  FcRating,
  FcSearch,
} from "react-icons/fc";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";

interface Props {
  title: string;
  desc: string;
  score: number;
  children: React.ReactNode;
}

export default function DetailResult({ title, desc, score, children }: Props) {
  let status = "";
  if (score < 50) {
    status = "fail";
  } else if (score <= 75) {
    status = "warning";
  } else {
    status = "pass";
  }
  return (
    <div
      className={`w-full p-5 flex justify-center items-start gap-2 rounded-xl border dark:border-l-4 dark:border-r-0 dark:border-y-0 hover:scale-102 transition-all duration-300 ease-out ${
        status === "pass"
          ? "bg-emerald-50 dark:bg-zinc-700 border-emerald-200"
          : status === "warning"
          ? "bg-amber-50 dark:bg-zinc-700 border-amber-200"
          : status === "fail"
          ? "bg-rose-50 dark:bg-zinc-700 border-rose-200"
          : ""
      }`}
    >
      <div className="">
        {status === "pass" ? (
          <FaRegCircleCheck className="text-lg text-emerald-500" />
        ) : status === "warning" ? (
          <RiErrorWarningLine className="text-xl text-amber-500" />
        ) : status === "fail" ? (
          <VscError className="text-lg text-rose-500" />
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {title === "Education" ? (
            <FcGraduationCap />
          ) : title === "Formatting" ? (
            <FcDocument />
          ) : title === "Contact Information" ? (
            <FcBusinessContact />
          ) : title === "Skill Section" ? (
            <FcCollect />
          ) : title === "Work Experience" ? (
            <FcOrganization />
          ) : title === "ATS Compatibility" ? (
            <FcAnswers />
          ) : title === "Keywords" ? (
            <FcSearch />
          ) : title === "Professional Summary" ? (
            <FcBriefcase />
          ) : title === "Projects" ? (
            <FcOpenedFolder />
          ) : title === "Achievements" ? (
            <FcRating />
          ) : title === "Certifications" ? (
            <FcApproval />
          ) : (
            ""
          )}
          <p className="text-sm font-semibold">{title}</p>
        </div>
        <p className="text-xs">{desc}</p>
        <div className="">
          <p className="text-xs font-semibold">Recomendations:</p>
          <ul className="list-disc list-outside ml-4">{children}</ul>
        </div>
      </div>
      <div className="">
        <p
          className={`font-bold
            ${
              status === "pass"
                ? "text-emerald-500"
                : status === "warning"
                ? "text-amber-500"
                : status === "fail"
                ? "text-rose-500"
                : ""
            }
            `}
        >
          {score}
        </p>
      </div>
    </div>
  );
}
