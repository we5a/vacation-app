import { type FC } from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeVacation } from "store/vacationSlice";
import { useAppDispatch } from "hooks/hooks";
import type { Vacation } from "store/types/vacation";
import styles from "./VacationItem.module.scss";

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

  const onEdit = () => {
    console.log("Edit");
  };

  const onDelete = () => {
    dispatch(removeVacation(id));
  };

  return (
    <div className={styles.vacationItem}>
      <span>{number}.</span>
      <span>{humanizeDate(startDate)}</span>
      <span>-</span>
      <span>{humanizeDate(endDate)}</span>
      <Chip label={type} size="small" color="info" />
      <Chip label={status} size="small" color={statusColorMap[status] as any} />
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default VacationItem;
