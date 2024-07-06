import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import type { ITaskHeader } from "../types/GlobalTypes";

const Image = styled(Box)(() => ({
  margin: "0 auto",
  width: "100px",
  height: "100px",
  "& > img": {
    maxWidth: "100%",
    height: "auto",
    objectFit: "cover",
  },
}));

interface IQuizItem {
  title: string;
  image: string;
  setLikedQuiz: React.Dispatch<React.SetStateAction<ITaskHeader[] | null>>;
}
const QuizItem = ({ title, image, setLikedQuiz }: IQuizItem) => {
  const handleClickLike = () => {
    setLikedQuiz((prev) => {
      const updatedLikedQuiz = prev || [];

      const isUnique = updatedLikedQuiz.every((item) => item.title !== title);

      if (isUnique) {
        return [
          ...updatedLikedQuiz,
          {
            image,
            title,
          },
        ];
      } else {
        return updatedLikedQuiz;
      }
    });
  };

  return (
    <Stack textAlign="center">
      <Image>
        <img src={image} />
      </Image>
      <Typography noWrap variant="subtitle1">
        {title}
      </Typography>
      <Link to={`/Quiz/detail/${title}`}>
        <Button variant="contained" color="secondary">
          Start
        </Button>
      </Link>
      <Button
        variant="contained"
        color="error"
        style={{ marginTop: "10px" }}
        onClick={handleClickLike}
      >
        Like
      </Button>
    </Stack>
  );
};

export default QuizItem;
