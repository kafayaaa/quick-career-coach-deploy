interface Props {
  number: number;
  desc: string;
}

export default function NextStepCard({ number, desc }: Props) {
  return (
    <div className="w-full px-3 py-2 flex items-center gap-3 bg-zinc-50 dark:bg-zinc-600 border dark:border-l-4 dark:border-r-0 dark:border-y-0 border-sky-200 rounded-lg hover:scale-102 transition-all duration-300 ease-out">
      <div className="size-9 flex items-center justify-center bg-sky-50 dark:bg-zinc-700 border border-sky-200 dark:border-none rounded-full">
        <p className="text-xs">{number}</p>
      </div>
      <p className="text-xs">{desc}</p>
    </div>
  );
}
