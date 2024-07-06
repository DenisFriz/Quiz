import { Button, Container, Paper, Typography } from "@mui/material";
import { ContextError } from "../Contexts/QuizContext";

interface IError {
  error: ContextError;
  resetErrorBoundary: () => void;
}

const Error = ({ error, resetErrorBoundary }: IError) => {
  return (
    <Container maxWidth="xl">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "150px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "20px", md: "38px" },
            fontWeight: 600,
            marginBottom: "15px",
          }}
        >
          {error.message}
        </Typography>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Reset
        </Button>
      </Paper>
    </Container>
  );
};

export default Error;
