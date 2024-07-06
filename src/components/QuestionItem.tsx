import {
  TextField,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { IQuizQuestion } from "../types/GlobalTypes";

const Item = styled(Stack)(() => ({
  marginBottom: "10px",
}));
const CustomAnswer = styled(Paper)(() => ({
  padding: "8px",
  marginBottom: "10px",
}));

type QuizData = {
  title: string;
  imgLink: string;
  data: IQuizQuestion[];
};
interface IQuestionItem {
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
  setIsCanADD: React.Dispatch<React.SetStateAction<boolean>>;
  data: IQuizQuestion[];
  templateData: IQuizQuestion;
}

const QuestionItem = ({
  setQuizData,
  setIsCanADD,
  data,
  templateData,
}: IQuestionItem) => {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleAddQuestion = () => {
    if (data.length === 1) {
      const canADD = answers.some((item) => item.trim().length <= 0);
      if (question.trim().length <= 0 || canADD) {
        setIsCanADD(true);
      } else {
        const newQuestion: IQuizQuestion = {
          id: 0,
          title: question,
          variants: answers,
          correctAnswer: correctAnswer,
          completed: false,
        };

        setQuizData((prev) => {
          return {
            ...prev,
            data: [newQuestion],
          };
        });
        setIsCanADD(false);
      }
    } else {
      const canADD = answers.some((item) => item.trim().length <= 0);
      if (question.trim().length <= 0 || canADD) {
        setIsCanADD(true);
      } else {
        setQuizData((prev) => {
          return {
            ...prev,
            data: [
              ...prev.data.map((item) => {
                if (item.id === prev.data.length - 1) {
                  return {
                    id: item.id,
                    title: question,
                    variants: answers,
                    correctAnswer: correctAnswer,
                    completed: false,
                  };
                } else {
                  return item;
                }
              }),
            ],
          };
        });
        setIsCanADD(false);
      }
    }
  };

  return (
    <Item>
      <TextField
        id="filled-multiline-flexible"
        label="Question"
        multiline
        fullWidth
        maxRows={4}
        variant="filled"
        value={templateData.title || question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <CustomAnswer>
        <Stack direction="row">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Correct Answer
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={templateData.correctAnswer || correctAnswer}
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            >
              <FormControlLabel
                value={0}
                control={<Radio color="success" />}
                label="1"
              />
              <FormControlLabel
                value={1}
                control={<Radio color="success" />}
                label="2"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="success" />}
                label="3"
              />
            </RadioGroup>
          </FormControl>
          <Stack flexGrow="1" columnGap={2}>
            {answers.map((answer, index) => (
              <TextField
                key={index}
                id={`answer${index}`}
                label={`Answer ${index + 1}`}
                multiline
                fullWidth
                maxRows={4}
                variant="filled"
                value={templateData.variants[index] || answer}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />
            ))}
          </Stack>
        </Stack>
      </CustomAnswer>
      <Button variant="contained" onClick={handleAddQuestion} color="secondary">
        Confirm
      </Button>
    </Item>
  );
};

export default QuestionItem;
