export interface IRoot {
  FakeData: IQuiz[];
}

export interface ITaskHeader {
  image: string;
  title: string;
  id?: string;
}

export interface IQuiz {
  image: string;
  title: string;
  id?: string;
  data: IQuizQuestion[];
}

export interface IQuizQuestion {
  id: number;
  title: string;
  variants: string[];
  correctAnswer: number;
  completed: boolean;
}

export interface IQuizContextType {
  currentQuiz: string;
  setCurrentQuiz: React.Dispatch<React.SetStateAction<string>>;
}
