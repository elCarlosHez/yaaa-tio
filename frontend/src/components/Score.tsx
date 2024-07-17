import { css } from "@emotion/css";
import { Typography } from "@mui/material";

interface IScore {
  redScore: number;
  blueScore: number;
}

export const Score = ({ redScore, blueScore }: IScore) => {
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
