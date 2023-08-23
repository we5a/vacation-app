import { type FC, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Logo from "assets/images/vacation.png";
import styles from "./Login.module.scss";
import LoginWithGoogle from "./LoginWithGoogle";
import { useAppDispatch } from "hooks/hooks";
import { UserInfo, setUser } from "store/userSlice";
import { getUsers } from "services/api";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUsers().then((res) => console.log(res));
  }, []);

  const handleSignIn = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    const users = await getUsers();
    const user = users.find((user: UserInfo) => user.email === email);
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
  };

  return (
    <div className={styles.login}>
      <img className={styles.logo} src={Logo} alt="logo" />

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
      />
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
      <div className={styles.buttons}>
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
      <p className={styles.adviceLine}>
        You can create account for your organization, <br /> or be invited by
        your manager
      </p>
      <div className={styles.buttons}>
        <LoginWithGoogle />
      </div>
      {/* <p className={styles.signUpLine}>
        Don't have account yet? <a href="#">Create one</a>
      </p> */}
    </div>
  );
};

export default Login;
