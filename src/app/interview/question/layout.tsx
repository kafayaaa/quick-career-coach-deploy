"use client";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-11/12 md:max-w-3xl min-h-screen mx-auto pt-25 md:pt-0 pb-15 md:pb-0 flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl md:text-4xl font-bold">Interview Questions</h1>
      <div className="w-full">{children}</div>
    </div>
  );
}
