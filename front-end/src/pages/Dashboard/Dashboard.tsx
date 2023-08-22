import { type FC, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Calendar from "reactjs-availability-calendar";
import moment from "moment";

import { useAppSelector } from "hooks/hooks";
import {
  VacationList,
  VacationCards,
  DatePickerDialog,
} from "components";
import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const vacations = useAppSelector((state) => state.vacations.vacations);
  const user = useAppSelector((state) => state.user);
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

  const timesOffData = useMemo(() => {
    const {
      availabilityOfTimeOff: { vacation, dayOff },
    } = user;

    const bookedDurations = vacations.reduce(
      (acc, el) => {
        const { type, endDate, startDate } = el;
        const durationInDays = moment(endDate).diff(moment(startDate), "days");
        acc[type] = acc[type] + durationInDays;
        return acc;
      },
      { vacation: 0, "day-off": 0 },
    );

    const { vacation: bookedVacations, ["day-off"]: bookedDaysOffs } =
      bookedDurations;

    return [
      {
        type: "Vacation:",
        available: vacation - bookedVacations,
        booked: bookedVacations,
        disabled: false,
      },
      {
        type: "Day off:",
        available: dayOff - bookedDaysOffs,
        booked: bookedDaysOffs,
        disabled: true,
      },
    ];
  }, [vacations, user]);

  const handleVacationRequest = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleCalendar = () => {
    setIsCalendarOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles.dashboard}>
      <VacationCards
        timesOffData={timesOffData}
        handleVacationRequest={handleVacationRequest}
      />
      {isCalendarOpen && (
        <div className={styles.calendarBlock}>
          <Calendar showKey={false} bookings={marked} />
        </div>
      )}
      <div className={styles.requested}>
        <VacationList items={vacations} />
      </div>

      <Button variant="contained" size="medium" onClick={handleCalendar}>
        {isCalendarOpen ? "Hide Calendar" : "Show Calendar"}
      </Button>

      <DatePickerDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        title={"Request new Vacation"}
      />
    </div>
  );
};

export default Dashboard;
