import Link from "next/link";

interface Props {
  title: string;
  link: string;
  activePath: string;
}

export default function LearningPathItem({ title, link, activePath }: Props) {
  const isActive = activePath.includes(link);
  return (
    <Link
      href={`/result/skill-gap/learning-path/${link}`}
      className={`w-full flex items-center justify-center text-center text-xs md:text-sm text-nowrap md:text-wrap py-3 md:py-2 px-3 border-b hover:bg-sky-500 hover:text-zinc-50 ${
        isActive ? "bg-sky-500 text-zinc-50 font-bold" : ""
      }`}
    >
      <h1>{title}</h1>
    </Link>
  );
}
