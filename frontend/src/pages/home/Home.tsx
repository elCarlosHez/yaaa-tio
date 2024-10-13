import { Button } from "@mui/material";
import { HomeLayout } from "./Home.styles";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout component="main">
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => navigate("/create-match")}
      >
        New Game
      </Button>
      <Button variant="contained" color="primary">
        Scoreboard
      </Button>
    </HomeLayout>
  );
};
