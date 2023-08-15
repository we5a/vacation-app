import React from "react";
import styles from "./App.module.scss";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function App() {
  return (
    <div className={styles.app}>
      <h2>Vacation app</h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
}

export default App;
