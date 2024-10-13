import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Player } from "../components/Player";
import { Navigate, useParams } from "react-router-dom";
import { useGetMatch } from "../queries/GetMatch";
import { useGetUsers } from "../queries";
import { Events } from "../components/Events";
import { MatchMenu } from "../components/MatchMenu";

export const LiveMatch = () => {
  const { id } = useParams();
  const { data: match, isLoading: isMatchLoading } = useGetMatch(id);
  const { data: users, isLoading: isUsersLoading } = useGetUsers();

  if (!id) {
    return <Navigate to="/create-match" />;
  }

  if (isMatchLoading || isUsersLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <Grid xs={12}>
        <MatchMenu matchId={id} />
      </Grid>
      <Grid xs={12}>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          container
        >
          <Player
            position="goal_keeper"
            side="red"
            player={
              users?.find((user) => match?.red_goal_keeper === user.id)?.id
            }
            match={match}
            readonly
          />
          <Player
            position="striker"
            side="blue"
            player={users?.find((user) => match?.blue_striker === user.id)?.id}
            match={match}
            readonly
          />
          <Player
            position="striker"
            side="red"
            player={users?.find((user) => match?.red_striker === user.id)?.id}
            match={match}
            readonly
          />
          <Player
            position="goal_keeper"
            side="blue"
            player={
              users?.find((user) => match?.blue_goal_keeper === user.id)?.id
            }
            match={match}
            readonly
          />
        </Grid>
      </Grid>
      <Grid xs={10} xsOffset={1}>
        <Events matchId={id} />
      </Grid>
    </Grid>
  );
};
