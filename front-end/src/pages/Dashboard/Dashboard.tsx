import React from "react";
import styles from "./Dashboard.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Header } from "components";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      Your vacations here
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
};

export default Dashboard;
