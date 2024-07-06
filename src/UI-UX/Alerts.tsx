import { Alert, AlertColor, Box, keyframes, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { CustomQuizAlerts } from "../components/CreateCustomQuiz";

const widthChange = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

const Line = styled(Box)(() => ({
  position: "absolute",
  top: "100%",
  left: "0",
  right: "0",
  height: "6px",
  backgroundColor: "green",
  animation: `${widthChange} 3s forwards ease-out`,
}));

interface IAlerts {
  color: AlertColor;
  children: string;
  closeAlert: React.Dispatch<React.SetStateAction<CustomQuizAlerts>>;
  alertName: keyof CustomQuizAlerts;
}

const Alerts = ({ color, children, closeAlert, alertName }: IAlerts) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = "0";
        closeAlert((prev) => ({
          ...prev,
          [alertName]: false,
        }));
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Alert
      ref={ref}
      severity={color}
      sx={{ position: "fixed", left: "10px", bottom: "15px", zIndex: "9999" }}
    >
      {children}
      <Line />
    </Alert>
  );
};

export default Alerts;
