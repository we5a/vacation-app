import { type FC } from "react";
import Button from "@mui/material/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { setUser } from "store/userSlice";
import { useAppDispatch } from "hooks/hooks";

const LoginWithGoogle: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onGoogleAuth = (data: any) => {
    const { access_token } = data;
    if (access_token) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        },
      )
        .then((res: any) => res.json())
        .then((data) => {
          console.info(data);
          dispatch(setUser(data));
          navigate("/dashboard");
        })
        .catch((err: any) => console.log(err));
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => onGoogleAuth(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Button variant="contained" onClick={() => login()}>
      Sign In with Google
    </Button>
  );
};

export default LoginWithGoogle;
