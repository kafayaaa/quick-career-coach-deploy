import { FaRegCircleCheck } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  title: string;
  score: number;
  children: React.ReactNode;
}

export default function OverviewCard({ title, score, children }: Props) {
  let status = "";
  if (score < 50) {
    status = "fail";
  } else if (score <= 75) {
    status = "warning";
  } else {
    status = "pass";
  }
  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:scale-105 transition-all duration-300 ease-out">
      <div className="flex items-center gap-2">
        {children}
        <p className="text-xs">{title}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {status === "pass" ? (
            <>
              <FaRegCircleCheck className="text-emerald-500" />
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light">
                Pass Checked
              </p>
            </>
          ) : status === "warning" ? (
            <>
              <RiErrorWarningLine className="text-lg text-amber-500" />
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light">
                Warning
              </p>
            </>
          ) : status === "fail" ? (
            <>
              <VscError className="text-rose-500" />
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light">
                Fail
              </p>
            </>
          ) : null}
        </div>
        <p
          className={`font-bold ${
            status === "pass"
              ? "text-emerald-500"
              : status === "warning"
              ? "text-amber-500"
              : status === "fail"
              ? "text-red-500"
              : ""
          }`}
        >
          {score}
        </p>
      </div>
      <LinearProgress
        value={score}
        variant="determinate"
        className="!h-1.5 !bg-zinc-300 dark:!bg-zinc-500 rounded-full"
        classes={{
          bar: `${
            status === "pass"
              ? "!bg-emerald-500"
              : status === "warning"
              ? "!bg-amber-500"
              : status === "fail"
              ? "!bg-rose-500"
              : ""
          } !rounded-full`,
        }}
      />
      {status === "pass" ? (
        <p className="text-[0.7rem] text-zinc-700 dark:text-zinc-400">
          Looking good! No major issues found.
        </p>
      ) : status === "warning" ? (
        <p className="text-[0.7rem] text-zinc-700 dark:text-zinc-400">
          Some improvements recommended.
        </p>
      ) : status === "fail" ? (
        <p className="text-[0.7rem] text-zinc-700 dark:text-zinc-400">
          Critical issues need attention.
        </p>
      ) : null}
    </div>
  );
}
