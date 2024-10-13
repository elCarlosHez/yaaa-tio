import {
  Box,
  Button,
  InputLabel,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { GoalsType, Match, MatchesBody, Positions } from "../types";
import { useState } from "react";
import { useGetUsers } from "../queries";
import { Control, UseFormRegister } from "react-hook-form";
import { useCreateGoal } from "../mutations/CreateGoal";
import {
  SelectGoalkeeperStyled,
  SelectPosition,
} from "./SelectTeam/SelectTeam.styles";
import { PlayerMenuItem } from "./PlayerMenuItem";

interface IPlayer {
  position: Positions;
  side: "red" | "blue";
  register?: UseFormRegister<MatchesBody>;
  match?: Match;
  player?: string;
  readonly?: boolean;
  control?: Control<MatchesBody>;
}

export const Player = ({
  position,
  side,
  match,
  player = "",
  readonly,
}: IPlayer) => {
  const [selectedPlayer] = useState<string>(player);
  const { data: users, isLoading } = useGetUsers();
  const { mutateAsync: scoreGoal } = useCreateGoal();
  const label = position === "goal_keeper" ? "Goal Keeper" : "Striker";

  const score = async (type: GoalsType) => {
    if (type === "goal") {
      await scoreGoal({
        match: match?.id!,
        scorer: selectedPlayer,
        scorer_position: position,
        goal_keeper:
          side === "red" ? match?.blue_goal_keeper! : match?.red_goal_keeper!,
        team: side,
        type: "goal",
      });
    } else {
      await scoreGoal({
        match: match?.id!,
        scorer: selectedPlayer,
        scorer_position: position,
        goal_keeper:
          side === "red" ? match?.red_goal_keeper! : match?.blue_goal_keeper!,
        team: side,
        type: "own-goal",
      });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (users) {
    return (
      <Box
        width={"50%"}
        display="flex"
        justifyContent={side === "red" ? "right" : "left"}
        alignItems="center"
        flexDirection={side === "red" ? "row" : "row-reverse"}
        my={2}
      >
        <Box mr={2}>
          <Button
            variant="contained"
            color={side === "red" ? "error" : "primary"}
            disabled={!match}
            onClick={() => score("goal")}
          >
            Goal
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            variant="outlined"
            color={side === "red" ? "error" : "primary"}
            disabled={!match}
            onClick={() => score("own-goal")}
          >
            Own
          </Button>
        </Box>
        <Box mr={2} width={"200px"}>
          <SelectGoalkeeperStyled fullWidth team={side}>
            <InputLabel id={`${position}-${side}`}>{label}</InputLabel>
            <SelectPosition
              label={label}
              team={side}
              labelId={`${position}-${side}`}
              defaultValue={player}
              readOnly={readonly}
              inputProps={{ IconComponent: () => null }}
            >
              {users?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <PlayerMenuItem player={user} />
                </MenuItem>
              ))}
            </SelectPosition>
          </SelectGoalkeeperStyled>
        </Box>
      </Box>
    );
  }
  return <></>;
};
