import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  href: string;
  activePath: string;
  children: React.ReactNode;
}

export default function AnalyzeTab({
  title,
  href,
  activePath,
  children,
}: Props) {
  const isActive = activePath.startsWith(href);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className={`min-w-fit flex items-center text-xs text-nowrap gap-2 border-b-2 pb-3 px-3 hover:text-sky-500 hover:border-sky-500 ${
          isActive ? "text-sky-500 border-sky-500" : "border-transparent"
        }`}
      >
        {children}
        <p>{title}</p>
      </Link>
    </motion.div>
  );
}
