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
import { createVacationRequest } from "services/api";

const DatePickerDialog = ({ open, onClose, title, user }: any) => {
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

  const handleSendRequest = async () => {
    if (startDate && endDate) {
      const dateRange = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      dispatch(
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

      setStartDate(null);
      setEndDate(null);
      navigate("/dashboard");
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: styles.dialog }}>
      <DialogTitle classes={{ root: styles.title }}>
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
        classes={{ root: styles.sendButton }}
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    </Dialog>
  );
};

export default DatePickerDialog;
