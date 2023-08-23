import {type FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Logo from "assets/images/vacation.png";
import styles from "./Login.module.scss";
import LoginWithGoogle from "./LoginWithGoogle";
import { useAppDispatch } from "hooks/hooks";
import { setUser } from "store/userSlice";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      const user = {
        id: "123",
        name: "John Snow",
        given_name: "John",
        family_name: "Snow",
        email,
      }
      dispatch(setUser(user));
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.login}>
      <img className={styles.logo} src={Logo} alt="logo" />
      {/* functionality for POST MVP */}
      
      {/* <TextField
        className={styles.input}
        id="standard-email-input"
        label="Email"
        autoComplete="current-email"
        variant="outlined"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      /> */}
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
          Sign In
        </Button>
      </div> */}
      <p className={styles.adviceLine}>You can create account for your organization, <br /> or be invited by your manager</p>
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
