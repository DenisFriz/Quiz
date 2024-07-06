import { Box, Grid, Typography, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ItemTimer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& > span": {
    fontSize: "23px",
  },
}));

const CustomUl = styled(Box)(() => ({
  cursor: "pointer",
  border: "1px solid black",
  borderRadius: "5px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#4d80fdad",
  },
  "&.Ul-complete": {
    backgroundColor: "#4d80fdad !important",
  },
}));

interface ITimer {
  allQuestion: number;
  complete: number;
  isEnd: boolean;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
}

const PadTime = (time: number) => time.toString().padStart(2, "0");

const Timer = ({ allQuestion, complete, isEnd, setElapsedTime }: ITimer) => {
  const [timeleft, setTimeLeft] = useState(2 * 60);
  const [isCounting, setIsCounting] = useState(true);
  const minutes = PadTime(Math.floor(timeleft / 60));
  const seconds = PadTime(timeleft - Number(minutes) * 60);
  const ref = useRef<SVGCircleElement>(null);
  const [circumfance, setCircumfance] = useState(0);

  useEffect(() => {
    if (isEnd) {
      setIsCounting(false);
    }
  }, [isEnd]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transformOrigin = "center";
      ref.current.style.transform = "rotate(-90deg)";
      ref.current.style.transition = "stroke-dashoffset 0.3s";
      const currentRadius = Number(ref.current.getAttribute("r"));
      setCircumfance(2 * Math.PI * currentRadius);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.strokeDasharray = `${circumfance} ${circumfance}`;
      ref.current.style.strokeDashoffset = circumfance.toString();
    }
  }, [circumfance]);

  const handleProgress = (percent: number) => {
    const offset = circumfance - (percent / 100) * circumfance;
    if (ref.current) {
      ref.current.style.strokeDashoffset = (offset * -1).toString();
    }
  };

  useEffect(() => {
    handleProgress((timeleft / 120) * 100);
  }, [timeleft]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTimeLeft((timeleft) => {
          const newTime = timeleft >= 1 ? timeleft - 1 : 0;
          setElapsedTime(2 * 60 - newTime);
          return newTime;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        width: "200px",
        textAlign: "center",
        padding: "8px",
      }}
    >
      <Box position="relative" display="flex" justifyContent="center">
        <ItemTimer>
          <span>{minutes}</span> : <span>{seconds}</span>
        </ItemTimer>
        <svg width="120px" height="120px">
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ed8a7" />
            <stop offset="100%" stopColor="#a6ceff" />
          </linearGradient>
          <circle
            ref={ref}
            stroke="url(#linear)"
            strokeWidth="4"
            cx="60"
            cy="60"
            r="52"
            fill="none"
          />
        </svg>
      </Box>
      <Typography variant="h5">
        {complete} / {allQuestion}
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: allQuestion }, (_item, index) => (
          <Grid item md={3} key={index}>
            <CustomUl className={complete <= index ? "" : "Ul-complete"}>
              {index + 1}
            </CustomUl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Timer;
