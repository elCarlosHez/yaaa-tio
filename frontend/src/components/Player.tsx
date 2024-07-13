import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { GoalsType, Match, MatchesBody, Positions, User } from "../types";
import { useState } from "react";
import { useGetUsers } from "../queries";
import { UseFormRegister } from "react-hook-form";
import { useCreateGoal } from "../mutations/CreateGoal";

interface IPlayer {
  position: Positions;
  side: "red" | "blue";
  register?: UseFormRegister<MatchesBody>;
  match?: Match;
  player?: User | null;
}

export const Player = ({
  position,
  side,
  register,
  match,
  player = null,
}: IPlayer) => {
  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(player);
  const { data: users, isLoading } = useGetUsers();
  const { mutateAsync: scoreGoal } = useCreateGoal();

  const score = async (type: GoalsType) => {
    if (type === "goal") {
      await scoreGoal({
        match: match?.id!,
        scorer: selectedPlayer?.id!,
        scorer_position: position,
        goal_keeper:
          side === "red" ? match?.blue_goal_keeper! : match?.red_goal_keeper!,
        team: side,
        type: 'goal'
      });
    } else {
      await scoreGoal({
        match: match?.id!,
        scorer: selectedPlayer?.id!,
        scorer_position: position,
        goal_keeper:
          side === "red" ? match?.red_goal_keeper! : match?.blue_goal_keeper!,
        team: side === "red" ? "blue" : side,
        type: 'own-goal'
      });
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
              {...(register && register(`${side}_${position}`))}
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
