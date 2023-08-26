import { FC, useState, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoIcon from "assets/images/logo64.png";
import { Box } from "@mui/system";

import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { googleLogout } from "@react-oauth/google";
import { deleteUser } from "store/userSlice";
import { getDataByUrl } from "services/api";
import { clearVacations } from "store/vacationSlice";
import { deleteLocalUser } from "services/utils";

const Header: FC = () => {
  const [organization, setOrganization] = useState<{
    name: string;
    subscripton: string;
  }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const getOrgName = async (url: string) => {
    const data = await getDataByUrl(url);
    setOrganization(data);
  };

  useEffect(() => {
    const orgUrl = user?._links?.organization?.href;
    if (orgUrl) {
      getOrgName(orgUrl);
    }
  }, [user]);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(clearVacations());
    googleLogout();
    navigate("/login");
    deleteLocalUser();
  };

  const handleOrganization = () => {
    if (user.role === 'MANAGER') {
      navigate("/organization");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <h2 className={styles.appLogo__text}>Vaca</h2>
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <img
            src={LogoIcon}
            className={styles.appLogo__icon}
            alt="logo icon"
          />
        </Box>

        <h4 className={styles.organization} onClick={handleOrganization}>
          {organization &&
            `${
              organization.name
            } (${organization?.subscripton?.toLowerCase()} plan)`}
        </h4>
        <div className={styles.userBlock} onClick={handleClick}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <span className={styles.userBlock__email}>{user?.email}</span>
          </Box>
          <AccountCircleIcon className={styles.userIcon} />
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
