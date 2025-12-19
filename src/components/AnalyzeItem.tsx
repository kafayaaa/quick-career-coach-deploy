type Props = {
  title: string;
  classProps?: string;
  classTitle?: string;
  children: React.ReactNode;
};

export const AnalyzeItem = ({
  title,
  classProps,
  classTitle,
  children,
}: Props) => {
  return (
    <div
      className={`w-full flex flex-col items-center gap-2 ${classProps} px-4 py-6 rounded-xl shadow-lg`}
    >
      <h2 className={`text-base md:text-lg font-bold ${classTitle}`}>
        {title}
      </h2>
      {children}
    </div>
  );
};
