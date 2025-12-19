"use client";

import { Evaluate } from "@/types/evaluate";
import { Question } from "@/types/question";
import { createContext, useContext, useState } from "react";

interface InterviewContextType {
  question: Question[] | [];
  setQuestion: (data: Question[] | []) => void;
  evaluation: Evaluate | null;
  setEvaluation: (data: Evaluate | null) => void;
  answer: string[] | [];
  setAnswer: (data: string[] | []) => void;
  role: string;
  setRole: (data: string) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined
);

export const InterviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [question, setQuestion] = useState<Question[] | []>([]);
  const [evaluation, setEvaluation] = useState<Evaluate | null>(null);
  const [answer, setAnswer] = useState<string[] | []>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider
      value={{
        question,
        setQuestion,
        answer,
        setAnswer,
        evaluation,
        setEvaluation,
        role,
        setRole,
        loading,
        setLoading,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within a InterviewProvider");
  }
  return context;
};
