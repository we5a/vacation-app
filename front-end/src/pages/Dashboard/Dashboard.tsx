import { type FC, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Calendar from "reactjs-availability-calendar";
import moment from "moment";

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
      },
      {
        type: "Day off:",
        available: dayOff - bookedDaysOffs,
        booked: bookedDaysOffs,
      },
    ];
  }, [vacations, user]);

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
        timesOffData={timesOffData}
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
