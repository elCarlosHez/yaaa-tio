import { Avatar, Box, Typography } from "@mui/material";
import { User } from "../types";
import { css } from "@emotion/css";
import { pb } from "../lib";

interface PlayerMenuItem {
  player: User;
}

export const PlayerMenuItem = ({ player }: PlayerMenuItem) => {
  return (
    <Box
      className={css`
        padding: 0.5rem;
      `}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Avatar
        className={css`
          margin-right: 1rem;
        `}
        alt={`${player.username} avatar`}
        src={pb.getFileUrl(player, player.avatar!)}
      />
      <Typography noWrap>{player.username}</Typography>
    </Box>
  );
};
