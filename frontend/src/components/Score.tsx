import { css } from "@emotion/css";
import { CircularProgress, Typography } from "@mui/material";
import { useGetMatchGoals } from "../queries/GetMatchGoals";

interface IScore {
  matchId?: string;
}

export const Score = ({ matchId }: IScore) => {
  const { data: goals, isLoading } = useGetMatchGoals(matchId);
  if (isLoading) {
    return <CircularProgress />;
  }

  const redScore = goals?.filter((goal) => goal.team === "red").length;
  const blueScore = goals?.filter((goal) => goal.team === "blue").length;

  return (
    <Typography
      className={css`
        margin-right: 12px !important;
      `}
      variant="h4"
      color={"primary"}
    >
      {redScore} Red - Blue {blueScore}
    </Typography>
  );
};
