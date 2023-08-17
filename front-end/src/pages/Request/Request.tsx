import { type FC, useState, useId } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useId();
  const [startDate, setStartDate] = useState<Dayjs | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();

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
        <h3>Request new vacation</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={startDate}
            defaultValue={dayjs("2020-04-17")}
            onChange={(newValue) => setStartDate(newValue)}
            className={styles.datePicker}
          />

          <DatePicker
            label="End date"
            value={endDate}
            defaultValue={dayjs("2020-04-17")}
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
