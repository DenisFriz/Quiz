import { createContext } from "react";
import type { IQuiz } from "../types/GlobalTypes";
import { ContextError } from "./QuizContext";

export interface QuizContextType {
  data: IQuiz[] | null;
  updateData: (newData: IQuiz) => void;
  isLoading: boolean;
  errorContext: ContextError;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);
