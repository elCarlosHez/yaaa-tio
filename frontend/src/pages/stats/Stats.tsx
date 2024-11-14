import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  Typography,
} from "@mui/material";
import { useGetUserStats } from "../../queries/GetUserStats";
import { StatsLayout } from "./Stats.styles";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchAccordion } from "../../components/MatchAccordion/MatchAccordion";
import { TeamPlayerCard } from "../../components/TeamPlayerCard/TeamPlayerCard";
import useEmblaCarousel from "embla-carousel-react";
import { css } from "@emotion/css";
Chart.register(ArcElement, Tooltip, Legend);

export const Stats = () => {
  const { data: userPositionStats, isLoading } = useGetUserStats();
  const [cardsCount, setCardsCount] = useState(5);
  const [emblaRef] = useEmblaCarousel();

  if (isLoading) {
    return (
      <StatsLayout>
        <CircularProgress />
      </StatsLayout>
    );
  }

  return (
    <StatsLayout>
      <Grid2 container px={4}>
        <Grid2 xs={12} mb={3}>
          <Typography mb={2} variant="h4">
            Your Stats
          </Typography>
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
                max-height: 200px;
              `}
            >
              <Card sx={{ display: "flex", minWidth: "380px", p: 2, mr: 4 }}>
                <CardMedia>
                  <Doughnut
                    width="150px"
                    height="150px"
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
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </CardMedia>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto", pt: 0 }}>
                    <Typography variant="h6" mb={2}>
                      Position Stats
                    </Typography>
                    <Typography color="error">
                      Striker: {userPositionStats?.striker}
                    </Typography>
                    <Typography mb={2}>
                      Percentage:{" "} 
                      {userPositionStats?.matches?.length
                        ? (
                            ((userPositionStats?.matches?.length -
                              userPositionStats?.goalkeeper) /
                              userPositionStats?.matches?.length) *
                            100
                          ).toFixed()
                        : 0}
                      %
                    </Typography>
                    <Typography color="primary">
                      Goalkeeper: {userPositionStats?.goalkeeper}
                    </Typography>
                    <Typography>
                      Percentage:{" "} 
                      {userPositionStats?.matches?.length
                        ? (
                            ((userPositionStats?.matches?.length -
                              userPositionStats?.striker) /
                              userPositionStats?.matches?.length) *
                            100
                          ).toFixed()
                        : 0}
                      %
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <Card sx={{ display: "flex", minWidth: "380px", p: 2, mr: 4 }}>
                <CardMedia>
                  <Doughnut
                    width="150px"
                    height="150px"
                    data={{
                      labels: ["Wins", "Losses"],
                      datasets: [
                        {
                          data: [
                            userPositionStats?.wins,
                            userPositionStats
                              ? userPositionStats?.matches.length -
                                userPositionStats?.wins
                              : 0,
                          ],
                          backgroundColor: ["#d32f2f", "#1976d2"],
                          hoverBackgroundColor: ["#d32f2f", "#1976d2"],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </CardMedia>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto", pt: 0 }}>
                    <Typography variant="h6" mb={2}>
                      Win Rate
                    </Typography>
                    <Typography color="primary">
                      Wins: {userPositionStats?.wins}
                    </Typography>
                    <Typography color="error">
                      Losses:{" "}
                      {userPositionStats
                        ? userPositionStats?.totalMatches -
                          userPositionStats?.wins
                        : 0}
                    </Typography>
                    <Typography>
                      Win Rate: {userPositionStats?.winRate?.toFixed(0)}%
                    </Typography>
                    <Typography>
                      Total of matches: {userPositionStats?.totalMatches}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <Card sx={{ display: "flex", minWidth: "380px", p: 2 }}>
                <CardMedia>
                  <Doughnut
                    width="150px"
                    height="150px"
                    data={{
                      labels: ["Goals", "Own Goals"],
                      datasets: [
                        {
                          data: [
                            userPositionStats?.goals,
                            userPositionStats?.ownGoals,
                          ],
                          backgroundColor: ["#d32f2f", "#1976d2"],
                          hoverBackgroundColor: ["#d32f2f", "#1976d2"],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </CardMedia>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto", pt: 0 }}>
                    <Typography variant="h6" mb={2}>
                      Goals
                    </Typography>
                    <Typography color="primary">
                      Goals: {userPositionStats?.goals}
                    </Typography>
                    <Typography color="error">
                      Own Goals: {userPositionStats?.ownGoals}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Box>
        </Grid2>
        <Grid2 xs={12} mb={3}>
          <Typography mb={2} variant="h4">
            Team scores
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {userPositionStats?.matchesByTeamPlayer.map((teamPlayer) => (
              <TeamPlayerCard
                key={teamPlayer.player.id}
                teamPlayerStat={teamPlayer}
              />
            ))}
          </List>
        </Grid2>
        <Grid2 xs={12} mb={3}>
          <Typography mb={2} variant="h4">
            Matches History
          </Typography>
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
      </Grid2>
    </StatsLayout>
  );
};
