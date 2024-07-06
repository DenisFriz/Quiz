import { Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Paper
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        color="#d50000"
        sx={{ fontWeight: "600" }}
      >
        404
      </Typography>
      <Typography variant="h2" component="h2" sx={{ fontWeight: "600" }}>
        Page not found
      </Typography>
    </Paper>
  );
};

export default NotFound;
