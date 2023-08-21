import { type FC } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

import styles from "./VacationCards.module.scss";

interface VacationCardsProps {
  isCalendarOpen: boolean;
  setIsCalendarOpen: (arg: any) => void;
  timesOffData: {
    type: string;
    available: number;
    booked: number;
  }[];
}

const VacationCards: FC<VacationCardsProps> = ({
  timesOffData,
  setIsCalendarOpen,
  isCalendarOpen,
}) => {
  const handleCalendar = () => {
    setIsCalendarOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles.cardBlock}>
      {timesOffData.map((item) => {
        return (
          <Card sx={{ minWidth: 220 }} key={item.type}>
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
        );
      })}
      <Button variant="contained" size="medium" onClick={handleCalendar}>
        {isCalendarOpen ? "Hide Calendar" : "Show Calendar"}
      </Button>
    </div>
  );
};

export default VacationCards;
