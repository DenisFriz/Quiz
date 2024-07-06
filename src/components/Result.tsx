import { Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import type { IQuizQuestion } from "../types/GlobalTypes";
import { Link } from "react-router-dom";

const ItemContainer = styled(Paper)(() => ({
  padding: "10px",
  textAlign: "start",
  fontSize: "22px",
}));

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "start",
  margin: "20px 0px 10px",
  padding: "5px",
  "&.Item-correct": {
    backgroundColor: theme.palette.success.main,
  },
  "&.Item-incorrect": {
    backgroundColor: theme.palette.error.main,
  },
}));

interface IResult {
  correctAnswers: number;
  allQuestions: number;
  data: IQuizQuestion[] | null;
  userAnswers: number[];
}

const Result = ({
  correctAnswers,
  allQuestions,
  data,
  userAnswers,
}: IResult) => {
  const handleCheckCorrect = (item: IQuizQuestion, index: number) => {
    if (item.correctAnswer == index) {
      return "Item-correct";
    } else if (userAnswers[index] == index) {
      return "Item-incorrect";
    } else {
      return "";
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h2">
        Your result{" "}
        <span>
          {correctAnswers} / {allQuestions}
        </span>
      </Typography>
      <Link to="/Quiz">
        <Button variant="contained" color="secondary">
          GO
        </Button>
      </Link>
      <Stack spacing={2}>
        {data &&
          data.map((item, index) => (
            <ItemContainer key={index}>
              {index + 1 + ") "}
              {item.title}
              {item.variants.map((answer, index) => (
                <Item key={index} className={handleCheckCorrect(item, index)}>
                  {index + 1 + ") "}
                  {answer}
                </Item>
              ))}
            </ItemContainer>
          ))}
      </Stack>
    </Box>
  );
};

export default Result;
