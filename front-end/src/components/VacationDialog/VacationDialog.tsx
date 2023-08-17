import { type FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import styles from "./VacationDialog.module.scss";

type VacationItem = { label: string; value: string };

interface VacationDialogProps {
  open: boolean;
  items: VacationItem[];
  onClose: () => void;
  onSelect: (item: VacationItem) => void;
}

const VacationDialog: FC<VacationDialogProps> = ({
  onClose,
  onSelect,
  items,
  open,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Vacation type:</DialogTitle>

      <List>
        {items.map((item: VacationItem) => {
          return (
            <ListItem
              key={item.value}
              disableGutters
              onClick={() => onSelect(item)}
            >
              <ListItemButton>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};

export default VacationDialog;
