import { type FC, useState, useId } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

import { useAppDispatch } from "hooks/hooks";
import { addVacation } from "store/vacationSlice";
import styles from "./Request.module.scss";

const Request: FC = () => {
  const DAYS_DELTA = 1;
  const navigate = useNavigate();
  const { state: vacationType } = useLocation();
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
          type: vacationType.value,
          status: "pending",
        }),
      );

      setStartDate(null);
      setEndDate(null);
      navigate("/dashboard");
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <IconButton
        onClick={goBack}
        className={styles.backButton}
        color="primary"
      >
        <ArrowBackIcon />
      </IconButton>

      <div className={styles.applicationBlock}>
        <h3>Request new {vacationType.label || "Vacation"}</h3>
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
          className={styles.sendButton}
          onClick={handleSendRequest}
        >
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default Request;
