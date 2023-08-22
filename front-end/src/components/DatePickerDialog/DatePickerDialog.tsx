import moment from "moment";
import { useId, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "hooks/hooks";
import { addVacation } from "store/vacationSlice";
import styles from "./DatePickerDialog.module.scss";

const DatePickerDialog = ({ open, onClose, title }: any) => {
  const DAYS_DELTA = 2;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useId();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    setInitialPickerDate,
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(setInitialPickerDate);

  function setInitialPickerDate() {
    return dayjs(moment().add(DAYS_DELTA, "days").format("YYYY-MM-DD"));
  }

  const handleSendRequest = () => {
    if (startDate && endDate) {
      dispatch(
        addVacation({
          id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          type: "vacation",
          status: "pending",
        }),
      );

      setStartDate(null);
      setEndDate(null);
      navigate("/dashboard");
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: styles.dialog }}>
      <DialogTitle classes={{ root: styles.dialog__title }}>
        {title}
        <IconButton className={styles.dialog__closeButton} onClick={onClose}>
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
      <Button
        variant="contained"
        classes={{root: styles.sendButton}}
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    </Dialog>
  );
};

export default DatePickerDialog;
