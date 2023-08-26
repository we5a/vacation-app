import { type FC } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import cn from "classnames";

import styles from "./VacationCards.module.scss";

interface VacationCardsProps {
  handleVacationRequest: () => void;
  timesOffData: {
    type: string;
    available: number;
    booked: number;
    disabled?: boolean;
  }[];
}

const VacationCards: FC<VacationCardsProps> = ({
  timesOffData,
  handleVacationRequest,
}) => {
  return (
    <Grid
      container
      sx={{ m: 2 }}
      columnSpacing={3}
      rowGap={3}
      justifyContent={"center"}
    >
      {timesOffData.map((item) => {
        const isDisabled = item.disabled || false;
        return (
          <Grid item xs={7} md={4} lg={3} key={item.type}>
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
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VacationCards;
