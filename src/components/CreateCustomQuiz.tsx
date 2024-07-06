import { useState } from "react";
import type { IQuizQuestion } from "../types/GlobalTypes";
import { Box, Button, TextField } from "@mui/material";
import Alerts from "../UI-UX/Alerts";
import { useServerData } from "../Contexts/QuizContext";
import QuestionItem from "./QuestionItem";

const layout: IQuizQuestion[] = [
  {
    id: 0,
    title: "",
    variants: ["", "", ""],
    correctAnswer: 0,
    completed: false,
  },
];

type QuizData = {
  title: string;
  imgLink: string;
  data: IQuizQuestion[];
};

type AlertInfo = {
  message: string;
  isShow: boolean;
};
export type CustomQuizAlerts = {
  alertQuestion: AlertInfo;
  alertQuiz: AlertInfo;
  alertTitle: AlertInfo;
  alertImg: AlertInfo;
  alertSubmit: AlertInfo;
};

const CreateCustomQuiz = () => {
  const { updateData } = useServerData();
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    imgLink: "",
    data: [...layout],
  });
  const [customQuizAlerts, setCustomQuizAlerts] = useState<CustomQuizAlerts>({
    alertQuestion: { isShow: false, message: "" },
    alertQuiz: { isShow: false, message: "" },
    alertTitle: { isShow: false, message: "" },
    alertImg: { isShow: false, message: "" },
    alertSubmit: { isShow: false, message: "" },
  });

  const [isCanADD, setIsCanADD] = useState(false);

  const handleSubmit = async () => {
    if (quizData.title.length < 10) {
      setCustomQuizAlerts((prev) => ({
        ...prev,
        alertTitle: {
          isShow: true,
          message: "Incorrect title",
        },
      }));
    } else if (quizData.imgLink.length < 20) {
      setCustomQuizAlerts((prev) => ({
        ...prev,
        alertImg: {
          isShow: true,
          message: "Incorrect image link",
        },
      }));
    } else {
      try {
        if (quizData.data && quizData.data.length > 0) {
          const data = {
            title: quizData.title,
            image: quizData.imgLink,
            data: quizData.data,
          };
          const response = await fetch("https://localhost:3000/FakeData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const result = await response.json();
            updateData(result);
            setCustomQuizAlerts((prev) => ({
              ...prev,
              alertQuiz: {
                isShow: true,
                message: "Add new Quiz",
              },
            }));
          } else {
            throw new Error("An error occurred while sending new data");
          }
        }
      } catch (error) {
        console.error(error);
        setCustomQuizAlerts((prev) => ({
          ...prev,
          alertSubmit: {
            isShow: true,
            message: "Failed to send a new Quiz to the server.",
          },
        }));
      }
    }
  };

  const handleClickDelete = (index: number) => {
    const newTemplate = quizData.data.filter((item) => item.id !== index);
    if (newTemplate) {
      setQuizData((prev) => {
        const updatedTemplate = newTemplate.map((question, i) => ({
          ...question,
          id: i,
        }));
        return {
          ...prev,
          data: updatedTemplate,
        };
      });
    }
  };

  const handleAdd = () => {
    setQuizData((prev) => {
      return {
        ...prev,
        data: [
          ...prev.data,
          {
            id: prev.data.length,
            title: "",
            variants: ["", "", ""],
            correctAnswer: 0,
            completed: false,
          },
        ],
      };
    });
    setCustomQuizAlerts((prev) => ({
      ...prev,
      alertQuestion: {
        isShow: true,
        message: "Add new question",
      },
    }));
  };

  const handleChangeTitle = (title: string) => {
    setQuizData((prev) => {
      return {
        ...prev,
        title,
      };
    });
  };

  const handleInputIMG = (link: string) => {
    setQuizData((prev) => {
      return {
        ...prev,
        imgLink: link,
      };
    });
  };

  return (
    <div>
      {customQuizAlerts.alertQuestion.isShow && (
        <Alerts
          color="success"
          closeAlert={setCustomQuizAlerts}
          alertName="alertQuestion"
        >
          {customQuizAlerts.alertQuestion.message}
        </Alerts>
      )}
      {customQuizAlerts.alertQuiz.isShow && (
        <Alerts
          color="success"
          closeAlert={setCustomQuizAlerts}
          alertName="alertQuiz"
        >
          {customQuizAlerts.alertQuiz.message}
        </Alerts>
      )}
      {customQuizAlerts.alertTitle.isShow && (
        <Alerts
          color="error"
          closeAlert={setCustomQuizAlerts}
          alertName="alertTitle"
        >
          {customQuizAlerts.alertTitle.message}
        </Alerts>
      )}
      {customQuizAlerts.alertImg.isShow && (
        <Alerts
          color="error"
          closeAlert={setCustomQuizAlerts}
          alertName="alertImg"
        >
          {customQuizAlerts.alertImg.message}
        </Alerts>
      )}
      {customQuizAlerts.alertSubmit.isShow && (
        <Alerts
          color="error"
          closeAlert={setCustomQuizAlerts}
          alertName="alertSubmit"
        >
          {customQuizAlerts.alertSubmit.message}
        </Alerts>
      )}
      <TextField
        error={customQuizAlerts.alertTitle.isShow}
        id="filled-multiline-flexible"
        label="Title of quiz"
        multiline
        fullWidth
        maxRows={4}
        variant="filled"
        value={quizData.title}
        onChange={(e) => handleChangeTitle(e.target.value)}
      />
      <TextField
        error={customQuizAlerts.alertImg.isShow}
        id="filled-multiline-flexible"
        label="Enter img link"
        multiline
        fullWidth
        maxRows={4}
        variant="filled"
        value={quizData.imgLink}
        onChange={(e) => handleInputIMG(e.target.value)}
      />
      {quizData.data.map((item, index) => (
        <div key={index}>
          <QuestionItem
            setQuizData={setQuizData}
            data={quizData.data}
            setIsCanADD={setIsCanADD}
            templateData={item}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => handleClickDelete(item.id)}
            color="error"
          >
            Delete {" " + (item.id + 1)}
          </Button>
        </div>
      ))}
      <Box>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={isCanADD}
          color="secondary"
        >
          Add new question
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="secondary">
          Upload
        </Button>
      </Box>
    </div>
  );
};

export default CreateCustomQuiz;
