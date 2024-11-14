import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { TeamPlayerStat } from "../../types";
import { pb } from "../../lib";

interface ITeamPlayerCard {
  teamPlayerStat: TeamPlayerStat;
}

export const TeamPlayerCard = ({ teamPlayerStat }: ITeamPlayerCard) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar sx={{ mr: 4 }}>
          <Avatar
            alt={`${teamPlayerStat.player.username} avatar`}
            src={pb.getFileUrl(
              teamPlayerStat.player,
              teamPlayerStat.player.avatar!
            )}
            sx={{
                width: 70,
                height: 70,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="h6">
              {teamPlayerStat.player.username}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "block" }}
              >
                Win rate: {teamPlayerStat.winRate?.toFixed(0)}%
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "block" }}
              >
                {teamPlayerStat.player.username} as Goalkeeper:{" "}
                {teamPlayerStat.goalkeeper}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "block" }}
              >
                {teamPlayerStat.player.username} as Striker:{" "}
                {teamPlayerStat.striker}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "block" }}
              >
                Total Matches: {teamPlayerStat.matches.length}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
