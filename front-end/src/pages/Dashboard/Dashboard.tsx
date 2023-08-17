import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";

import { useAppSelector } from "hooks/hooks";
import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const vacations = useAppSelector((state) => state.vacations.vacations);

  const handleRequest = () => {
    navigate("/request");
  };

  return (
    <div className={styles.dashboard}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>

      <div className={styles.requested}>
        {!vacations.length && <span>Your list is empty</span>}
        {vacations.map((v) => {
          return (
            <div key={v.id}>
              <span>{v.startDate?.toString()}</span>
              <span>{v.endDate?.toString()}</span> &nbsp;
              <span>{v.type}</span>&nbsp;
              <span>{v.status}</span>
              <hr />
            </div>
          );
        })}
      </div>

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
