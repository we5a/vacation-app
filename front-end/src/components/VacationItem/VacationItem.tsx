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

interface VacationItemProps {
  item: Vacation;
  number: number;
}

const statusColorMap = {
  pending: "warning",
  approved: "success",
  declined: "error",
};

const VacationItem: FC<VacationItemProps> = ({ item, number }) => {
  const {id, status, type, endDate, startDate } = item;
  const dispatch = useAppDispatch();

  const humanizeDate = (date: string) => {
    return moment(date).format("MMMM Do YYYY");
  };

  const onDelete = () => {
    dispatch(removeVacation(id));
  };

  return (<>
  <Box sx={{ display: { xs: "none", sm: "block" } }}>
    <div className={styles.vacationItem}>
      <span>{number}.</span>
      <span>{humanizeDate(startDate)}</span>
      <span>-</span>
      <span>{humanizeDate(endDate)}</span>
      <Chip label={type} size="small" color="info" />
      <Chip label={status} size="small" color={statusColorMap[status] as any} />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  </Box>
  <Box sx={{ display: { xs: "block", sm: "none" } }}>
    mobile view
  </Box>
  </>
  );
};

export default VacationItem;
