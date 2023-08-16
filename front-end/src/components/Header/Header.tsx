import type { FC } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.appLogo}>Vacations</h2>
        <div className={styles.userBlock}>
          <span className={styles.userBlock__email}>user@email.com</span>
          <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
