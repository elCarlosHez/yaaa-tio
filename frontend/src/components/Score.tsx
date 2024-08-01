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
    >
      <Typography color={"red"} variant="h4" component="span">
        {redScore} Red
      </Typography>{" "}
      -{" "}
      <Typography color={"primary"} variant="h4" component="span">
        Blue {blueScore}
      </Typography>
    </Typography>
  );
};
