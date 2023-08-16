import {type FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Logo from "assets/images/vacation.png";
import styles from "./Login.module.scss";

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      navigate("/dashboard");
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
      />
      <TextField
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
      />
      <div className={styles.buttons}>
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
      <p className={styles.signUpLine}>
        Don't have account yet? <a href="#">Create one</a>
      </p>
    </div>
  );
};

export default Login;
