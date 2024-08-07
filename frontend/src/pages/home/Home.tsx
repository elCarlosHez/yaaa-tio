import { Button } from "@mui/material";
import { HomeLayout } from "./Home.styles";

export const Home = () => {
  return (
    <HomeLayout component="main">
      <Button fullWidth variant="contained" color="primary">
        New Game
      </Button>
      <Button variant="contained" color="primary">
        Scoreboard
      </Button>
    </HomeLayout>
  );
};
