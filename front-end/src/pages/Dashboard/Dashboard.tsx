import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";

import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  const navigate = useNavigate();

  const handleRequest = () => {
    navigate("/request");
  };

  return (
    <div className={styles.dashboard}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>

      <div className={styles.requested}>Your list is empty</div>

      <Button
        variant="contained"
        onClick={handleRequest}
        classes={{ root: styles.requestButton }}
      >
        Request
      </Button>
    </div>
  );
};

export default Dashboard;
