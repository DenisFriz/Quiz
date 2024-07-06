import React, { useContext, useEffect, useState } from "react";
import { QuizContext, QuizContextType } from "./AllContexts";
import type { IQuiz } from "../types/GlobalTypes";

type ServerResponse<T> = {
  success: boolean;
  errorMessage: string;
  data: T | null;
};

const fetchData = async (url: string): Promise<ServerResponse<IQuiz[]>> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    const data = await response.json();
    return { success: true, errorMessage: "", data: data };
  } catch (error) {
    console.error("Произошла ошибка при загрузке данных:", error);
    return {
      success: false,
      errorMessage: (error as Error).message,
      data: null,
    };
  }
};

export type ContextError = Error & {
  isError: boolean;
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<IQuiz[]>([]);
  const [errorContext, isErrorContext] = useState<ContextError>({
    isError: false,
    name: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        setIsLoading(true);
        const result = await fetchData("https://localhost:3000/FakeData");
        if (!result.success || result.data === null) {
          throw new Error(
            "An error occurred while loading data from the server."
          );
        }
        setData(result.data);
        isErrorContext({ isError: false, name: "", message: "" });
      } catch (error) {
        isErrorContext({
          isError: true,
          name: "ContextError",
          message: (error as Error).message,
        });
        console.error("Произошла ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromServer();
  }, []);

  const updateData = (newData: IQuiz) => {
    setData((prev) => [...prev, newData]);
  };

  const context = {
    data,
    updateData,
    isLoading,
    errorContext,
  };

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}

export const useServerData = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useServerData must be used within a DataProvider");
  }
  return context;
};
