import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Goal as GoalType } from "../types";
import { css } from "@emotion/css";
import { pb } from "../lib";
import { useDeleteGoal } from "../mutations";

interface IGoal {
  goal: GoalType;
}

export const Goal = ({ goal }: IGoal) => {
  const { mutate: deleteGoal } = useDeleteGoal();
  
  const onPressDelete = () => {
    deleteGoal(goal);
  }

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {goal.type === "goal" ? "Goal" : "Own Goal"}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            By {goal.expand?.scorer?.username}
          </Typography>
          <Typography
            className={css`
              text-transform: capitalize;
            `}
          >
            Team: {goal.team}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton aria-label="play/pause" onClick={onPressDelete}>
            <Delete sx={{ height: 40, width: 40 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          className={css`
            width: 120px !important;
            height: 120px !important;
          `}
          alt={`${goal.expand?.scorer?.username} avatar`}
          src={pb.getFileUrl(goal.expand?.scorer!, goal.expand?.scorer.avatar!)}
        />
      </CardMedia>
    </Card>
  );
};
