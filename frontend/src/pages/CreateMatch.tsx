import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { css } from "@emotion/css";
import { Player } from "../components/Player";
import { SubmitHandler, useForm } from "react-hook-form";
import { MatchesBody } from "../types";
import { useCreateMatch } from "../mutations";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMatch } from "../queries/GetMatch";
import { useEffect } from "react";

export const CreateMatch = () => {
  let [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: createMatch, isLoading } = useCreateMatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<MatchesBody>();
  const { data: previousMatch, isLoading: isPreviousMatchLoading } =
    useGetMatch(searchParams.get("previousMatch")!);

  const onSubmit: SubmitHandler<MatchesBody> = async (data) => {
    const match = await createMatch(data);
    navigate(`/live-match/${match.id}`);
  };

  useEffect(() => {
    if (previousMatch) {
      if (previousMatch.winner === "red") {
        setValue("red_striker", previousMatch.red_striker);
        setValue("red_goal_keeper", previousMatch.red_goal_keeper);
      }
      if (previousMatch.winner === "blue") {
        setValue("blue_striker", previousMatch.blue_striker);
        setValue("blue_goal_keeper", previousMatch.blue_goal_keeper);
      }
    }
  }, [previousMatch]);

  if (isPreviousMatchLoading) {
    return <CircularProgress />;
  }

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
          <Player control={control} position="goal_keeper" side="red" />
          <Player control={control} position="striker" side="blue" />
          <Player control={control} position="striker" side="red" />
          <Player control={control} position="goal_keeper" side="blue" />
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
