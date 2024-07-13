import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { SkipNext, PlayArrow, Delete } from "@mui/icons-material";
import { Goal as GoalType } from "../types";

interface IGoal {
  goal: GoalType;
}

export const Goal = ({ goal }: IGoal) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column",  width: '100%' }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {goal.type === "goal" ? "Goal" : "Own Goal"}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {goal.expand?.scorer?.username}
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
          <IconButton aria-label="play/pause">
            <Delete sx={{ height: 40, width: 40 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://images.pexels.com/photos/19607905/pexels-photo-19607905/free-photo-of-camara-mesa-imagenes-fotos.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Live from space album cover"
      />
    </Card>
  );
};
