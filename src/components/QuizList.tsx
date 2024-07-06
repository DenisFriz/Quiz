import { Box, Paper, Skeleton, Stack } from "@mui/material";
import QuizItem from "./QuizItem";
import { useState } from "react";
import type { ITaskHeader } from "../types/GlobalTypes";
import LikedQuiz from "./LikedQuiz";
import { useServerData } from "../Contexts/QuizContext";
import Error from "./Error";

const SkeletonListItem = () => {
  return (
    <Box>
      <Skeleton
        animation={"wave"}
        variant="circular"
        width={100}
        height={100}
        sx={{ marginBottom: "10px" }}
      />
      <Skeleton
        animation={"wave"}
        variant="rectangular"
        width={100}
        height={40}
        sx={{ borderRadius: "10px" }}
      />
    </Box>
  );
};

const QuizList = () => {
  const [likedQuiz, setLikedQuiz] = useState<ITaskHeader[] | null>(null);
  const { isLoading, errorContext, data } = useServerData();

  if (isLoading)
    return (
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          display: "flex",
          columnGap: "24px",
          rowGap: "20px",
          flexWrap: "wrap",
        }}
      >
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </Paper>
    );

  if (errorContext.isError)
    return (
      <Error
        error={errorContext}
        resetErrorBoundary={() => (window.location.href = "/Quiz")}
      />
    );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        justifyContent: "space-between",
        columnGap: "24px",
        rowGap: "20px",
        flexWrap: "nowrap",
      }}
    >
      <Stack direction="row" flexWrap={"wrap"} spacing={3}>
        {data &&
          data.map((item, index) => (
            <QuizItem
              key={index}
              title={item.title}
              image={item.image}
              setLikedQuiz={setLikedQuiz}
            />
          ))}
      </Stack>
      <Box width="300px">
        <LikedQuiz data={likedQuiz} setLikedQuiz={setLikedQuiz} />
      </Box>
    </Paper>
  );
};

export default QuizList;
