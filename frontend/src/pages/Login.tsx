import { Box, Typography, Link } from "@mui/material";
import { GoogleButton } from "../components/GoogleButton";
import { pb } from "../lib";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (pb.authStore.isAuthRecord) {
      navigate("/create-match");
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
      component={"main"}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundImage:
            "url(https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </Box>
    </Box>
  );
};
