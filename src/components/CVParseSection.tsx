import { FaCirclePlus } from "react-icons/fa6";

type Props = {
  title: string;
  plus?: boolean;
  onAdd?: () => void;
  children: React.ReactNode;
};

export default function CVParseSection({
  title,
  plus,
  onAdd,
  children,
}: Props) {
  return (
    <div className="w-full px-4 py-5 rounded-xl bg-white dark:bg-zinc-800 shadow-lg">
      <div className="w-full flex items-center justify-center">
        <h2 className="text-lg md:text-xl text-center font-bold">{title}</h2>
        {plus && (
          <button onClick={onAdd} type="button">
            <FaCirclePlus className="ml-2 text-2xl cursor-pointer hover:text-sky-500" />
          </button>
        )}
      </div>
      <div className="w-full flex flex-col gap-10 mt-3">{children}</div>
    </div>
  );
}
