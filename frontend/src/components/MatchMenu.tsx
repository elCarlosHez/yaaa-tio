import { Grid, Button, CircularProgress } from "@mui/material";
import { Score } from "./Score";
import { css } from "@emotion/css";
import { useGetMatchGoals } from "../queries";
import { useEndMatch } from "../mutations";
import { useNavigate } from "react-router-dom";

interface IMatchMenu {
  matchId: string;
}
export const MatchMenu = ({ matchId }: IMatchMenu) => {
  const { data: goals = [], isLoading } = useGetMatchGoals(matchId);
  const { mutateAsync: endMatch } = useEndMatch();
  const navigate = useNavigate();

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
    navigate(`/create-match`);
  }

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" mb={5}>
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
  );
};
