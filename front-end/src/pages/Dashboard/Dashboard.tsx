import { type FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";

import { useAppSelector } from "hooks/hooks";
import { VacationDialog } from "components";
import styles from "./Dashboard.module.scss";

const items = [
  { label: "Vacation", value: "vacation" },
  { label: "Day off", value: "day-off" },
];

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const vacations = useAppSelector((state) => state.vacations.vacations);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleRequest = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleVacationSelect = useCallback((selectedItem: any) => {
    navigate("/request", { state: selectedItem });
    setIsDialogOpen(false);
  }, []);

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

      <VacationDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSelect={handleVacationSelect}
        items={items}
      />
    </div>
  );
};

export default Dashboard;
