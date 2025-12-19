interface Props {
  count: number;
  title: string;
  children: React.ReactNode;
}

export default function Notif({ count, title, children }: Props) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <p className="font-light text-zinc-800 dark:text-zinc-300">
        <span className="mr-1 font-semibold">{count}</span>
        {title}
      </p>
    </div>
  );
}
