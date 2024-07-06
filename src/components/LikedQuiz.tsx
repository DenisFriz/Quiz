import type { ITaskHeader } from "../types/GlobalTypes";
import { Box, Button, Stack, styled } from "@mui/material";

const Item = styled(Box)(() => ({
  width: "50px",
  height: "50px",
  "& > img": {
    objectFit: "cover",
    maxWidth: "100%",
    height: "auto",
  },
}));

interface ILikedQuiz {
  data: ITaskHeader[] | null;
  setLikedQuiz: React.Dispatch<React.SetStateAction<ITaskHeader[] | null>>;
}

const LikedQuiz = ({ data, setLikedQuiz }: ILikedQuiz) => {
  const handleClickUnLike = (title: string) => {
    if (data) {
      const updatedData = data.filter((item) => item.title !== title);
      setLikedQuiz(updatedData);
    }
  };
  return (
    <Stack>
      {data?.map((item) => (
        <Stack key={item.title} direction="row" columnGap={2} flexWrap="wrap">
          <Item>
            <img src={item.image} alt={item.title} />
          </Item>
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            {item.title}
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClickUnLike(item.title)}
            >
              Unlike
            </Button>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default LikedQuiz;
