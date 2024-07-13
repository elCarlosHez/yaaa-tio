import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { css } from "@emotion/css";
import { Player } from "../components/Player";
import { SubmitHandler, useForm } from "react-hook-form";
import { MatchesBody } from "../types";
import { useCreateMatch } from "../mutations";
import { useNavigate } from "react-router-dom";

export const CreateMatch = () => {
  const navigate = useNavigate();
  const { mutateAsync: createMatch, isLoading } = useCreateMatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<MatchesBody>();
  const onSubmit: SubmitHandler<MatchesBody> = async (data) => {
    const match = await createMatch(data);
    navigate(`/live-match/${match.id}`);
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid xs={12}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Box mb={5}>
            <Typography
              className={css`
                margin-right: 12px !important;
              `}
              variant="h2"
              color={"primary"}
            >
              Create a new match
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Player position="goal_keeper" side="red" register={register} />
          <Player position="striker" side="blue" register={register} />
          <Player position="striker" side="red" register={register} />
          <Player position="goal_keeper" side="blue" register={register} />
        </Grid>
      </Grid>
      <Grid xs={12} textAlign="center">
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isLoading}
        >
          {isLoading ? <CircularProgress /> : "Start a new match"}
        </Button>
      </Grid>
    </Grid>
  );
};
