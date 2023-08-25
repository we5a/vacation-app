import moment from "moment";
import { useId, useState, useEffect } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { useAppDispatch } from "hooks/hooks";
import { addVacation } from "store/vacationSlice";
import styles from "./DatePickerDialog.module.scss";
import { createVacationRequest } from "services/api";

const DatePickerDialog = ({ open, onClose, title, user, available }: any) => {
  const DAYS_DELTA = 2;
  const [availableVacations, availableDayOffs, availableSickness] = available;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useId();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    setInitialPickerDate,
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(setInitialPickerDate);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  function setInitialPickerDate() {
    return dayjs(moment().add(DAYS_DELTA, "days").format("YYYY-MM-DD"));
  }

  const dropTimeZoneInDate = (date: Dayjs) => {
    return moment(date.toISOString()).format("YYYY-MM-DD");
  };

  const validateDates = (
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  ): string => {
    // not filled picker
    if (!startDate || !endDate) {
      return "Please select some range";
    }
    // end date is before start
    const format: string = "YYYY-MM-DD";
    const startTr: string = dropTimeZoneInDate(startDate);
    const endTr: string = dropTimeZoneInDate(endDate);

    if (moment(endTr, format).isBefore(moment(startTr, format))) {
      return "Set start day before end day";
    }

    // reach out of available days
    const durationInDays = moment(endTr).diff(moment(startTr), "days") + 1;
    if (durationInDays > availableVacations) {
      return "You do not have such amount of days";
    }

    return "";
  };

  const cleanupDialog = () => {
    setStartDate(setInitialPickerDate);
    setEndDate(setInitialPickerDate);
    setErrorMessage("");
    navigate("/dashboard");
    onClose();
  };

  const handleSendRequest = async () => {
    const message = validateDates(startDate, endDate);
    if (message) {
      setErrorMessage(message);
      return;
    }

    if (startDate && endDate) {
      const dateRange = {
        startDate: dropTimeZoneInDate(startDate),
        endDate: dropTimeZoneInDate(endDate),
      };

      dispatch(
        // changing state should be after success response
        addVacation({
          id,
          type: "vacation",
          status: "PENDING",
          ...dateRange,
        }),
      );
      await createVacationRequest({
        user: user._links.self.href,
        status: "PENDING",
        ...dateRange,
      });
      
      cleanupDialog();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: styles.dialog }}>
      <DialogTitle classes={{ root: styles.title }}>
        {title}
        <IconButton
          className={styles.dialog__closeButton}
          onClick={cleanupDialog}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start date"
          disablePast
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          className={styles.datePicker}
        />

        <DatePicker
          label="End date"
          disablePast
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          className={styles.datePicker}
        />
      </LocalizationProvider>

      {errorMessage && (
        <Typography component={"span"} className={styles.errorMessage}>
          {errorMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        classes={{ root: styles.sendButton }}
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    </Dialog>
  );
};

export default DatePickerDialog;
