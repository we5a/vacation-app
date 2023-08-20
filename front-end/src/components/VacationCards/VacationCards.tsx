import { type FC } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

import styles from "./VacationCards.module.scss";

interface VacationCardsProps {
  isCalendarOpen: boolean;
  setIsCalendarOpen: (arg: any) => void;
}

const VacationCards: FC<VacationCardsProps> = ({
  setIsCalendarOpen,
  isCalendarOpen,
}) => {
  const timesOffMap = [
    {
      type: "Vacation:",
      available: 5,
      booked: 15,
    },
    {
      type: "Day off:",
      available: 10,
      booked: 0,
    },
  ];

  const handleCalendar = () => {
    setIsCalendarOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles.cardBlock}>
      {timesOffMap.map((item) => {
        return (
          <>
            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {item.type}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Available: {item.available}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Booked: {item.booked}
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      })}
      <Button variant="contained" size="medium" onClick={handleCalendar}>
        {isCalendarOpen ? "Hide Calendar" : "Show Calendar"}
      </Button>
    </div>
  );
};

export default VacationCards;
