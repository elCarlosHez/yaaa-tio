import useEmblaCarousel from "embla-carousel-react";
import { Goal } from "../../types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { css } from "@emotion/css";
import { pb } from "../../lib";

interface IMatchEvents {
  goals: Goal[];
}

export const MatchEvents = ({ goals }: IMatchEvents) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <Box
      className={css`
        overflow: hidden;
      `}
      ref={emblaRef}
    >
      <Box
        mt={3}
        className={css`
          display: flex;
          max-width: 100%;
        `}
      >
        {goals?.map((goal) => (
          <Box
            className={css`
              flex: 0 0 220px;
              min-width: 0;
              margin-right: 1rem;
            `}
            key={goal.id}
          >
            <Card
              sx={{
                display: "flex",
                border:
                  goal.team === "red" ? "1px solid red" : "1px solid #1976d2",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div">
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
                    width: 60px !important;
                    height: 60px !important;
                  `}
                  alt={`${goal.expand?.scorer?.username} avatar`}
                  src={pb.getFileUrl(
                    goal.expand?.scorer!,
                    goal.expand?.scorer.avatar!
                  )}
                />
              </CardMedia>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
