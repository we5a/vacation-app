import { type FC } from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeVacation } from "store/vacationSlice";
import { useAppDispatch } from "hooks/hooks";
import type { Vacation } from "store/types/vacation";
import styles from "./VacationItem.module.scss";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface VacationItemProps {
  item: Vacation;
  number: number;
}

const statusColorMap = {
  PENDING: "warning",
  APPROVED: "success",
  DECLINED: "error",
};

const VacationItem: FC<VacationItemProps> = ({ item, number }) => {
  const { id, status, type, endDate, startDate } = item;
  const dispatch = useAppDispatch();

  const humanizeDate = (date: string) => {
    return moment(date).format("MMMM Do YYYY");
  };

  const onDelete = () => {
    dispatch(removeVacation(id));
  };

  const deleteButton = (
    <IconButton onClick={onDelete} sx={{ ml: { xs: 4 } }}>
      <DeleteIcon />
    </IconButton>
  );

  const dateBlock = (
    <>
      <b>{number}.&nbsp;</b>
      <span>{humanizeDate(startDate)}</span>
      <span>-</span>
      <span>{humanizeDate(endDate)}</span>
    </>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <div className={styles.vacationItem}>
          {dateBlock}
          <Chip label={type} size="small" color="info" />
          <Chip
            label={status}
            size="small"
            color={statusColorMap[status] as any}
          />
          {deleteButton}
        </div>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent className={styles.mobile}>
            <div>
              <div className={styles.firstRow}>{dateBlock}</div>
              <div className={styles.secondRow}>
                <Chip label={type} size="small" color="info" />
                <Chip
                  label={status}
                  size="small"
                  color={statusColorMap[status] as any}
                />
              </div>
            </div>
            {deleteButton}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default VacationItem;
