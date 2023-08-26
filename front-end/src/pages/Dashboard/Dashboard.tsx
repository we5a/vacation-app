import { type FC, useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Calendar from "reactjs-availability-calendar";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "hooks/hooks";
import {
  VacationList,
  VacationCards,
  DatePickerDialog,
  CustomTimeline,
} from "components";
import styles from "./Dashboard.module.scss";
import { getVacationRequestByUserId } from "services/api";
import { initVacations } from "store/vacationSlice";
import { Vacation } from "store/types/vacation";

const Dashboard: FC = () => {
  const vacations = useAppSelector((state) => state.vacations.vacations);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    const userId = user?._links?.self.href.split("/").pop();
    if (!userId) return;
    getVacationRequestByUserId(userId).then((res) => {
      const vacations = res.map((item: Vacation) => ({
        ...item,
        id: item?._links?.self.href.split("/").pop(),
        type: "vacation",
      }));
      dispatch(initVacations(vacations));
    });
  }, [user]);

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
      availabilityOfTimeOff: { vacation, dayOff } = { vacation: 0, dayOff: 0 },
    } = user;

    console.log("Vac", vacations);
    const bookedDurations = vacations.reduce(
      (acc, el) => {
        const { type, endDate, startDate } = el;
        const durationInDays = moment(endDate).diff(moment(startDate), "days") + 1;
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
        // available: dayOff - bookedDaysOffs,
        available: 0,
        booked: bookedDaysOffs,
        disabled: true,
      },
      {
        type: "Sickness:",
        available: 0,
        booked: 0,
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

      <div className={styles.requested}>
        <VacationList items={vacations} />
      </div>

      <Button variant="contained" size="medium" onClick={handleCalendar}>
        {isCalendarOpen ? "Hide Calendar" : "Show Calendar"}
      </Button>

      {isCalendarOpen && (
        <div className={styles.calendarBlock}>
          <Calendar showKey={false} bookings={marked} />
        </div>
      )}

      <DatePickerDialog
        open={isDialogOpen}
        user={user}
        onClose={handleDialogClose}
        title={"Request new Vacation"}
        available = {timesOffData.map(v=>v.available)}
      />
    </div>
  );
};

export default Dashboard;
