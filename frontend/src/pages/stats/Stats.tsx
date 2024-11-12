import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetMainPosition } from "../../queries/GetMainPosition";
import { StatsLayout } from "./Stats.styles";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchAccordion } from "../../components/MatchAccordion/MatchAccordion";
Chart.register(ArcElement, Tooltip, Legend);

export const Stats = () => {
  const { data: userPositionStats, isLoading } = useGetMainPosition();
  const [cardsCount, setCardsCount] = useState(5);

  if (isLoading) {
    return (
      <StatsLayout>
        <CircularProgress />
      </StatsLayout>
    );
  }

  return (
    <StatsLayout>
      <Grid2 container>
        <Grid2 xs={8} xsOffset={2} my={3}>
          <Doughnut
            data={{
              labels: ["Striker", "Goalkeeper"],
              datasets: [
                {
                  data: [
                    userPositionStats?.striker,
                    userPositionStats?.goalkeeper,
                  ],
                  backgroundColor: ["#d32f2f", "#1976d2"],
                  hoverBackgroundColor: ["#d32f2f", "#1976d2"],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{}}
          />
        </Grid2>
        <Grid2 xs={8} xsOffset={2} my={3}>
          <Typography variant="h6">
            Total matches: {userPositionStats?.totalMatches}
          </Typography>
          <Typography variant="h6">
            Matches as Scorer: {userPositionStats?.striker}
          </Typography>
          <Typography variant="h6">
            Matches as Goalkeeper: {userPositionStats?.goalkeeper}
          </Typography>
          <Typography variant="h6">Wins: {userPositionStats?.wins}</Typography>
          <Typography variant="h6">
            Goals: {userPositionStats?.goals}
          </Typography>
          <Typography variant="h6">
            Win Rate: {userPositionStats?.winRate}%
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 xs={12} mb={3}>
        {userPositionStats?.matches.slice(0, cardsCount).map((match) => (
          <MatchAccordion key={`card-${match.id}`} match={match} />
        ))}
        {userPositionStats?.matches &&
          cardsCount < userPositionStats?.matches?.length && (
            <Box mt={2} width="100%">
              <Button
                variant="contained"
                fullWidth
                onClick={() => setCardsCount((cardsCount) => cardsCount + 5)}
              >
                Load More
              </Button>
            </Box>
          )}
      </Grid2>
    </StatsLayout>
  );
};
