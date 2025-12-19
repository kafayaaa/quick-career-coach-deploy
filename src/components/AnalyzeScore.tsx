type Props = {
  title: string;
  score: number;
  desc: string;
};

export const AnalyzeScore = ({ title, score, desc }: Props) => {
  const valueColor = (value: number) => {
    if (value < 50) return "text-red-500";
    if (value < 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <li className="list-disc">
      <div className="w-full flex justify-between items-center">
        <h2>{title}</h2>
        <p className={`${valueColor(score)} font-extrabold text-lg`}>{score}</p>
      </div>
      <p className="w-full text-justify">{desc}</p>
    </li>
  );
};
