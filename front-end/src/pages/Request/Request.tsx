import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

import styles from "./Request.module.scss";

const Request: FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();

  const handleSendRequest = () => {
    if (startDate && endDate) {
      navigate("/dashboard");
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <IconButton onClick={goBack} className={styles.backButton} color="primary">
        <ArrowBackIcon />
      </IconButton>

      <div className={styles.applicationBlock}>
        <h3>Request new vacation</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            className={styles.datePicker}
          />

          <DatePicker
            label="End date"
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
