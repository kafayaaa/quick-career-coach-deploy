import Image from "next/image";
import { useState } from "react";

interface Props {
  step: number;
  title: string;
  desc: string;
  img: string;
  children: React.ReactNode;
}

export default function Step({ step, title, desc, img, children }: Props) {
  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    setHidden(!hidden);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={handleHidden}
        className="w-full md:w-1/3 flex items-center gap-2 p-5 text-sky-600 dark:text-sky-50 rounded-2xl border-2 dark:border border-sky-300 dark:border-sky-50/50 bg-sky-50 dark:bg-zinc-800"
      >
        {children}
        <div className="flex flex-col items-start">
          <span className="text-xs font-light">Step {step}</span>
          <p className="font-semibold">{title}</p>
        </div>
      </button>
      <div
        className={`${
          hidden ? "hidden" : ""
        } w-full md:w-2/3 block md:absolute md:right-0 md:top-0 md:pl-5 transition-all duration-300 ease-out`}
      >
        <div className="w-full p-3 md:p-8 rounded-2xl border border-sky-100 shadow-lg dark:bg-zinc-800">
          <Image
            src={img}
            alt="upload"
            width={100}
            height={100}
            className="mx-auto"
          />
          <div className="w-full p-2 text-sm mt-2">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
