import { Grid, Button, CircularProgress, Typography } from "@mui/material";
import { Score } from "./Score";
import { css } from "@emotion/css";
import { useGetMatch, useGetMatchGoals } from "../queries";
import { useEndMatch } from "../mutations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Match } from "../types";

interface IMatchMenu {
  matchId: string;
  previousMatch?: Match;
  streak?: number;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const MatchMenu = ({ matchId, previousMatch, streak }: IMatchMenu) => {
  const { data: match, isLoading: isMatchLoading } = useGetMatch(matchId);
  const { data: goals = [], isLoading } = useGetMatchGoals(matchId);
  const { mutateAsync: endMatch } = useEndMatch();
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval!);
  }, [seconds]);

  if (isLoading || isMatchLoading) {
    return <CircularProgress />;
  }

  const redScore = goals?.filter(
    (goal) =>
      (goal?.team === "red" && goal?.type === "goal") ||
      (goal?.team === "blue" && goal?.type === "own-goal")
  ).length;

  const blueScore = goals?.filter(
    (goal) =>
      (goal?.team === "blue" && goal?.type === "goal") ||
      (goal?.team === "red" && goal?.type === "own-goal")
  ).length;

  const onEndMatch = async () => {
    const winner = redScore > blueScore ? "red" : "blue";
    
    // Only increment streak if same team (same players in same positions) wins again
    const shouldIncrementStreak = 
      previousMatch?.winner === winner && 
      streak && (
        (winner === 'red' && 
          previousMatch.red_striker === match?.red_striker &&
          previousMatch.red_goal_keeper === match?.red_goal_keeper
        ) ||
        (winner === 'blue' && 
          previousMatch.blue_striker === match?.blue_striker &&
          previousMatch.blue_goal_keeper === match?.blue_goal_keeper
        )
      );

    await endMatch({
      id: matchId,
      streak: shouldIncrementStreak ? streak + 1 : 1,
      winner,
    });
    navigate(`/create-match?previousMatch=${matchId}`);
  };

  const onCancel = async () => {
    navigate(-1);
  };

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={3}
        mb={2}
      >
        <Typography variant="h3">{formatTime(seconds)}</Typography>
      </Grid>
      <Grid display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Button
          className={css`
            margin-right: 12px !important;
          `}
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Score redScore={redScore} blueScore={blueScore} />
        <Button
          disabled={blueScore === redScore}
          variant="contained"
          onClick={onEndMatch}
        >
          End match
        </Button>
      </Grid>
    </>
  );
};
