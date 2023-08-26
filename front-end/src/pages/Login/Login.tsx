import { type FC, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import VacaLogo from "assets/images/vaca-logo.png";
import styles from "./Login.module.scss";
import LoginWithGoogle from "./LoginWithGoogle";
import { useAppDispatch } from "hooks/hooks";
import { UserInfo, setUser } from "store/userSlice";
import { getUsers } from "services/api";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUsers().then((users) => {
      console.log("Users", users);
      setUsers(users);
    });
  }, []);

  const handleSignIn = async () => {
    if (!email) {
      return;
    }
    getUsers().then((users) => {
      const user = users?.find((user: UserInfo) => user.email === email);

      if (user) {
        dispatch(setUser(user));
        if (user.role === "MANAGER") {
          navigate("/organization");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("User not found");
      }
    });
  };

  return (
    <div className={styles.login}>
      <img className={styles.logo} src={VacaLogo} alt="logo" />


      <p className={styles.adviceLine}>
        {/* Login with Google if you invited by your manager */}
        Login with Google in order to start
      </p>

      <div className={styles.buttons}>
        <LoginWithGoogle users={users} />
      </div>


{/* uncomment or not  */}
      {/* <p className={styles.adviceLine}>
        Login with your email if you already in the organization.
      </p>

      <TextField
        className={styles.input}
        id="standard-email-input"
        label="Email"
        autoComplete="current-email"
        variant="outlined"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        required
      /> */}





      {/* functionality for POST MVP */}
      {/* <TextField
        id="standard-password-input"
        className={styles.input}
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      /> */}


      {/* <div className={styles.buttons}>
        <Button variant="contained" onClick={handleSignIn}>
          Login
        </Button>
      </div> */}

      {/* <p className={styles.signUpLine}>
        Don't have account yet? <a href="#">Create one</a>
      </p> */}
    </div>
  );
};

export default Login;
