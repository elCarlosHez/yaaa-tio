import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { css } from "@emotion/css";
import { Player } from "../components/Player";
import { useParams } from "react-router-dom";
import { useGetMatch } from "../queries/GetMatch";
import { useGetUsers } from "../queries";
import { Score } from "../components/Score";
import { Events } from "../components/Events";

export const LiveMatch = () => {
  const { id } = useParams();
  const { data: match, isLoading: isMatchLoading } = useGetMatch(id);
  const { data: users, isLoading: isUsersLoading } = useGetUsers();

  if (isMatchLoading || isUsersLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <Grid xs={12}>
        <Grid display="flex" justifyContent="center" alignItems="center" mb={5}>
          <Button
            className={css`
              margin-right: 12px !important;
            `}
            variant="outlined"
          >
            Cancel
          </Button>
          <Score matchId={id} />
          <Button variant="contained">End match</Button>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Player
            position="goal_keeper"
            side="red"
            player={users?.find((user) => match?.red_goal_keeper === user.id)}
            match={match}
          />
          <Player
            position="striker"
            side="blue"
            player={users?.find((user) => match?.blue_striker === user.id)}
            match={match}
          />
          <Player
            position="striker"
            side="red"
            player={users?.find((user) => match?.red_striker === user.id)}
            match={match}
          />
          <Player
            position="goal_keeper"
            side="blue"
            player={users?.find((user) => match?.blue_goal_keeper === user.id)}
            match={match}
          />
        </Grid>
      </Grid>
      <Grid xs={10} xsOffset={1}>
        <Events matchId={id} />
      </Grid>
    </Grid>
  );
};
