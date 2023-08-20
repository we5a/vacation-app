import { FC, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./Header.module.scss";

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleOrganization = () => {
    navigate("/organization");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.appLogo}>Vacations</h2>
        <h4 className={styles.organization} onClick={handleOrganization}>Your organization name</h4>
        <div className={styles.userBlock} onClick={handleClick}>
          <span className={styles.userBlock__email}>user@email.com</span>
          <AccountCircleIcon />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
