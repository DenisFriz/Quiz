import { Suspense, useEffect, useState } from "react";
import type { IQuizQuestion } from "../types/GlobalTypes";
import { Box, Paper, Typography, styled } from "@mui/material";
import Timer from "./Timer";
import { lazy } from "react";
import { useServerData } from "../Contexts/QuizContext";
import { useParams } from "react-router-dom";

const LazyResult = lazy(() => import("./Result"));

const Item = styled(Paper)(({ theme }) => ({
  cursor: "pointer",
  padding: "10px",
  marginBottom: "10px",
  maxWidth: "max-content",
  minWidth: "100px",
  transition: ".3s",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    transform: "scale(1.1)",
  },
}));

type UserInfo = {
  isEnd: boolean;
  currentQuestionIndex: number;
  correctAnswered: number;
  answeredQuestions: number;
  userAnswers: number[];
};

const QuizDetail = () => {
  const { quizID } = useParams();
  const { data } = useServerData();
  const [question, setQuestion] = useState<IQuizQuestion | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<IQuizQuestion[] | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    isEnd: false,
    currentQuestionIndex: 0,
    correctAnswered: 0,
    answeredQuestions: 0,
    userAnswers: [],
  });

  useEffect(() => {
    if (data && quizID) {
      const result = data.filter(
        (item) => item.title.toLowerCase() === quizID.toLowerCase()
      );

      setCurrentQuiz(result[0].data);
    }
  }, [data]);

  useEffect(() => {
    if (currentQuiz && currentQuiz.length > 0) {
      setQuestion(currentQuiz[userInfo.currentQuestionIndex]);
    }
  }, [userInfo.currentQuestionIndex, currentQuiz]);

  const handleClickNext = (answer: number) => {
    if (data && currentQuiz && currentQuiz.length > 0) {
      if (userInfo.currentQuestionIndex === currentQuiz.length - 1) {
        setUserInfo((prev) => ({ ...prev, isEnd: true }));
      } else {
        setUserInfo((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      }
    }

    if (answer === question?.correctAnswer) {
      setUserInfo((prev) => ({
        ...prev,
        correctAnswered: prev.correctAnswered + 1,
      }));
    }
    setUserInfo((prev) => ({
      ...prev,
      answeredQuestions: prev.answeredQuestions + 1,
    }));

    setUserInfo((prev) => ({
      ...prev,
      userAnswers: [...prev.userAnswers, answer],
    }));
  };

  const convertSecondsToMin = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${PadTime(min)}:${PadTime(remainSeconds)}`;
  };

  const PadTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  if (!data || !currentQuiz) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        display: "flex",
        columnGap: "15px",
        position: "relative",
      }}
    >
      <Box>
        {userInfo.isEnd ? (
          <Suspense fallback={<></>}>
            <LazyResult
              correctAnswers={userInfo.correctAnswered}
              allQuestions={currentQuiz.length}
              data={currentQuiz}
              userAnswers={userInfo.userAnswers}
            />
          </Suspense>
        ) : (
          <>
            {question && question.title && (
              <Typography variant="h4">
                {question.id + 1 + ")"} {question.title}
              </Typography>
            )}
            {question &&
              question.variants &&
              question.variants.map((item, index) => (
                <Item key={index} onClick={() => handleClickNext(index)}>
                  {index + 1 + ")"} {item}
                </Item>
              ))}
          </>
        )}
      </Box>

      {userInfo.isEnd ? (
        <Box sx={{ height: "auto" }}>
          <Box
            sx={{
              fontSize: "28px",
              position: "sticky",
              top: "0",
            }}
          >
            Elapsed time: {convertSecondsToMin(elapsedTime)}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Timer
            allQuestion={currentQuiz.length}
            complete={userInfo.answeredQuestions}
            isEnd={userInfo.isEnd}
            setElapsedTime={setElapsedTime}
          />
        </Box>
      )}
    </Paper>
  );
};

export default QuizDetail;
