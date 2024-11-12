import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { Match } from "../../types";
import { pb } from "../../lib";
import { AccordionMatch, AccordionMatchSummary } from "./MatchAccordion.styles";
import { useGetMatchGoals } from "../../queries";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Player } from "../Player";
import { MatchEvents } from "./MatchEvents";

interface IMatchAccordion {
  match: Match;
}

export const MatchAccordion = ({ match }: IMatchAccordion) => {
  const [expanded, setExpanded] = useState(false);
  const { data: goals, isLoading } = useGetMatchGoals(
    expanded ? match.id : undefined
  );
  const userId = pb.authStore.model?.id;
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const isWin = useMemo(() => {
    if (match.winner === "red") {
      return match.red_striker === userId || match.red_goal_keeper === userId;
    }
    if (match.winner === "blue") {
      return match.blue_striker === userId || match.blue_goal_keeper === userId;
    }
    return false;
  }, [match, userId]);

  const position = useMemo(() => {
    if (match.red_striker === userId || match.blue_striker === userId) {
      return "Striker";
    }
    return "Goalkeeper";
  }, [match, userId]);

  const team = useMemo(() => {
    if (match.red_striker === userId || match.red_goal_keeper === userId) {
      return "Red";
    }
    return "Blue";
  }, [match, userId]);

  const blueTeamGoals =
    goals?.filter((goal) => goal.team === "blue").length || 0;
  const redTeamGoals = goals?.filter((goal) => goal.team === "red").length || 0;

  const matchDate = new Date(match.created).toISOString().split("T")[0];

  return (
    <AccordionMatch
      expanded={expanded}
      onChange={handleExpansion}
      isWin={isWin}
    >
      <AccordionMatchSummary expandIcon={<ExpandMore />} isWin={isWin}>
        <Typography>
          {isWin ? "Victory" : "Defeat"} - {team} {position}
        </Typography>
        <Typography sx={{ marginRight: 2, marginLeft: "auto" }}>
          {matchDate}
        </Typography>
      </AccordionMatchSummary>
      <AccordionDetails>
        <Grid2 container sx={{ overflow: 'hidden', maxWidth: '600px' }}>
          {isLoading ? (
            <Grid2 xs={6} xsOffset={4}>
              <CircularProgress />
            </Grid2>
          ) : (
            <>
              <Grid2 xs={12}>
                <Typography color="dark" textAlign="center" variant="h5">
                  {redTeamGoals} - {blueTeamGoals}
                </Typography>
              </Grid2>
              <Grid2 xsOffset={3} xs={4}>
                <Player
                  position="goal_keeper"
                  side="red"
                  player={match.red_goal_keeper}
                  match={match}
                  readonly
                  buttons={false}
                />
                <Player
                  position="striker"
                  side="red"
                  player={match.red_striker}
                  match={match}
                  readonly
                  buttons={false}
                />
              </Grid2>
              <Grid2 xs={4}>
                <Player
                  position="striker"
                  side="blue"
                  player={match.blue_striker}
                  match={match}
                  readonly
                  buttons={false}
                />
                <Player
                  position="goal_keeper"
                  side="blue"
                  player={match.blue_goal_keeper}
                  match={match}
                  readonly
                  buttons={false}
                />
              </Grid2>
              <Grid2 xs={12}>
                <MatchEvents goals={goals || []} />
              </Grid2>
            </>
          )}
        </Grid2>
      </AccordionDetails>
    </AccordionMatch>
  );
};
