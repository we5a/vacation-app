import type { FC } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./RemoveUserDialog.module.scss";
import { UserInfo } from "store/userSlice";

interface RemoveUserDialogProps {
  open: boolean;
  onClose: () => void;
  users: UserInfo[];
  handleUserDelete: (user: UserInfo) => void;
}

const RemoveUserDialog: FC<RemoveUserDialogProps> = ({
  onClose,
  open,
  users,
  handleUserDelete,
}) => {
  return (
    <Dialog onClose={onClose} open={open} classes={{ paper: styles.dialog }}>
      <DialogTitle classes={{ root: styles.title }}>
        Remove User
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <List>
        {users.map((user: UserInfo, index: number) => {
          return (
            <ListItem className={styles.item} key={user.email}>
              <div className={styles.item__text}>
                <Typography component={"span"}>{index + 1}. &nbsp;</Typography>
                <Typography component={"span"}>{user.email}</Typography>
              </div>
              <IconButton size="small" onClick={() => handleUserDelete(user)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};

export default RemoveUserDialog;
