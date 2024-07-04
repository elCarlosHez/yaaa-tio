import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { GoalsType, Match, Positions } from "../types";
import { User } from "../types/User";
import { useState } from "react";
import { useGetUsers } from "../queries";

interface IPlayer {
  position: Positions;
  side: "red" | "blue";
  match?: Match;
  player?: User | null;
}

export const Player = ({ position, side, match, player = null }: IPlayer) => {
  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(player);
  const { data: users, isLoading } = useGetUsers();

  const score = (type: GoalsType) => {
    if (type === "goal") {
      console.log("Gol");
    } else {
      console.log("Auto Gol");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (users) {
    return (
      <Grid
        xs={6}
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={side === "red" ? "row" : "row-reverse"}
        my={2}
      >
        <Box mr={2}>
          <Button
            variant="contained"
            disabled={!match}
            onClick={() => score("goal")}
          >
            Gol
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            variant="contained"
            disabled={!match}
            onClick={() => score("own-goal")}
          >
            Auto Gol
          </Button>
        </Box>
        <Box mr={2} minWidth={"240px"}>
          <FormControl fullWidth>
            <InputLabel id={`${position}-${side}`}>{position}</InputLabel>
            <Select
              label={position}
              labelId={`${position}-${side}`}
              value={selectedPlayer || ""}
              onChange={(event) =>
                setSelectedPlayer(event.target.value as User)
              }
            >
              {users?.map((user) => (
                // https://github.com/mui/material-ui/issues/29969
                // @ts-ignore
                <MenuItem key={user.id} value={user}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    );
  }
  return <></>;
};
