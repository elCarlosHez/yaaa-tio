import { Grid, Button, CircularProgress, Typography } from "@mui/material";
import { Score } from "./Score";
import { css } from "@emotion/css";
import { useGetMatchGoals } from "../queries";
import { useEndMatch } from "../mutations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface IMatchMenu {
  matchId: string;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const MatchMenu = ({ matchId }: IMatchMenu) => {
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

  if (isLoading) {
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
    await endMatch({
      id: matchId,
      winner: redScore > blueScore ? "red" : "blue",
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
