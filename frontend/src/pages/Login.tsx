import { Typography, Link } from "@mui/material";
import { GoogleButton } from "../components/GoogleButton";
import { pb } from "../lib";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoginContainer, LoginImage, LoginLayout } from "./Login.styles";

export const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (pb.authStore.isAuthRecord) {
      navigate("/home");
    }
  }, []);
  return (
    <LoginLayout component={"main"}>
      <LoginImage aria-label="Futbol image" src="/login-bg.jpeg" />
      <LoginContainer>
        <Typography component="h1" variant="h5" mb={5}>
          Sign in
        </Typography>
        <GoogleButton />
        <Link
          mt={5}
          href="https://www.flaticon.es/iconos-gratis/futbol"
          title="fútbol iconos"
        >
          Fútbol iconos creados por kosonicon - Flaticon
        </Link>
      </LoginContainer>
    </LoginLayout>
  );
};
