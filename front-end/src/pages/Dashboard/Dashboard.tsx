import { type FC, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Calendar from "reactjs-availability-calendar";

import { useAppSelector } from "hooks/hooks";
import { VacationDialog, VacationList, VacationCards } from "components";
import styles from "./Dashboard.module.scss";

const items = [
  { label: "Vacation", value: "vacation" },
  { label: "Day off", value: "day-off" },
];

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const vacations = useAppSelector((state) => state.vacations.vacations);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const marked = useMemo(() => {
    return vacations.map((el) => {
      return {
        from: new Date(el.startDate),
        to: new Date(el.endDate),
        middayCheckout: false,
      };
    });
  }, [vacations]);

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
      <VacationCards
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
      />
      {isCalendarOpen && (
        <div className={styles.calendarBlock}>
          <Calendar showKey={false} bookings={marked} />
        </div>
      )}
      <div className={styles.requested}>
        <VacationList items={vacations} />
      </div>

      <Button
        variant="contained"
        onClick={handleRequest}
        classes={{ root: styles.requestButton }}
      >
        Book time off
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
