import { BiTargetLock } from "react-icons/bi";
import { FaRegCircleCheck, FaRegLightbulb, FaRegStar } from "react-icons/fa6";
import { MdOutlineThumbUp } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { VscError } from "react-icons/vsc";
interface Props {
  priority: string;
  title: string;
  children: React.ReactNode;
}

export default function RecomendationCard({
  priority,
  title,
  children,
}: Props) {
  return (
    <div
      className={`w-full h-full p-5 flex flex-col gap-2 rounded-lg border dark:border-l-4 dark:border-r-0 dark:border-y-0 hover:scale-103 transition-all duration-300 ease-out
                ${
                  priority === "low" || priority === "match"
                    ? "bg-emerald-50 dark:bg-zinc-700 border-emerald-200 text-emerald-900 dark:text-zinc-50"
                    : priority === "medium"
                    ? "bg-amber-50 dark:bg-zinc-700 border-amber-200 text-amber-900 dark:text-zinc-50"
                    : priority === "high" || priority === "miss"
                    ? "bg-rose-50 dark:bg-zinc-700 border-rose-200 text-rose-900 dark:text-zinc-50"
                    : priority === "tips" || priority === "nice"
                    ? "bg-sky-50 dark:bg-zinc-700 border-sky-200 text-sky-900 dark:text-zinc-50"
                    : ""
                }
              `}
    >
      <div
        className={`flex items-center gap-2 ${
          priority === "low" || priority === "match"
            ? "dark:text-emerald-200"
            : priority === "medium"
            ? "dark:text-amber-200"
            : priority === "high" || priority === "miss"
            ? "dark:text-rose-200"
            : priority === "tips" || priority === "nice"
            ? "dark:text-sky-200"
            : ""
        }`}
      >
        {priority === "low" ? (
          <FaRegLightbulb />
        ) : priority === "medium" ? (
          <SlBadge />
        ) : priority === "high" ? (
          <BiTargetLock />
        ) : priority === "tips" ? (
          <FaRegStar />
        ) : priority === "match" ? (
          <FaRegCircleCheck />
        ) : priority === "miss" ? (
          <VscError />
        ) : priority === "nice" ? (
          <MdOutlineThumbUp />
        ) : null}
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <ul className="flex flex-col gap-1 text-xs list-disc list-outside ml-4">
        {children}
      </ul>
    </div>
  );
}
