import { type FC } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import cn from "classnames";

import styles from "./VacationCards.module.scss";

interface VacationCardsProps {
  handleVacationRequest: () => void,
  timesOffData: {
    type: string;
    available: number;
    booked: number;
    disabled?: boolean;
  }[];
}

const VacationCards: FC<VacationCardsProps> = ({ timesOffData, handleVacationRequest }) => {

  return (
    <div className={styles.cardBlock}>
      {timesOffData.map((item) => {
        const isDisabled = item.disabled || false;
        return (
          <Card
            sx={{ minWidth: 220 }}
            key={item.type}
            className={cn({ [styles.disabled]: isDisabled })}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {item.type}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                className={styles.available}
              >
                Available: {item.available}
              </Typography>
              <Typography variant="body1" color="text.primary">
                Booked: {item.booked}
              </Typography>

              <CardActions className={styles.actions}>
                <Button
                  size="small"
                  variant="contained"
                  disabled={isDisabled}
                  className={styles.bookButton}
                  onClick={handleVacationRequest}
                >
                  Book
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VacationCards;
