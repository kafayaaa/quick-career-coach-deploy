import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  image: string;
}

export default function WhyGrid({ title, desc, image }: Props) {
  return (
    <div className="w-full flex flex-col items-center border border-zinc-200 dark:border-zinc-600 rounded-xl shadow-lg">
      <div className="w-full p-5 bg-zinc-50 dark:bg-zinc-700 hover:bg-white dark:hover:bg-zinc-600 rounded-xl">
        <Image
          src={image}
          alt="resume"
          width={300}
          height={300}
          className="max-w-8/12 h-40  mx-auto"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="font-bold">{title}</p>
        <p className="w-full text-sm">{desc}</p>
      </div>
    </div>
  );
}
