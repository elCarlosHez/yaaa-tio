import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { MatchesBody } from "../../types";
import { useCreateMatch } from "../../mutations";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMatch } from "../../queries/GetMatch";
import { useEffect, useMemo } from "react";
import {
  CreateMatchLayout,
  RecentTeamsContainer,
  TeamBlueContainer,
  TeamRedContainer,
  VsContainer,
} from "./CreateMatch.styles";
import { SelectTeam } from "../../components/SelectTeam/SelectTeam";
import { PreExistedTeams } from "../../components/PreExistedTeam/PreExistedTeams";

export const CreateMatch = () => {
  let [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: createMatch, isLoading } = useCreateMatch();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<MatchesBody>();
  const { data: previousMatch, isLoading: isPreviousMatchLoading } =
    useGetMatch(searchParams.get("previousMatch")!);
  const winnerTeam = useMemo(() => {
    if (previousMatch) {
      if (previousMatch.winner === "red") {
        return {
          striker: previousMatch.red_striker,
          goal_keeper: previousMatch.red_goal_keeper,
          team: previousMatch.winner,
          streak: previousMatch.streak,
        };
      }
      if (previousMatch.winner === "blue") {
        return {
          striker: previousMatch.blue_striker,
          goal_keeper: previousMatch.blue_goal_keeper,
          team: previousMatch.winner,
          streak: previousMatch.streak,
        };
      }
    }
  }, [previousMatch]);

  const onSubmit: SubmitHandler<MatchesBody> = async (data) => {
    const match = await createMatch(data);
    if (previousMatch) {
      return navigate(`/live-match/${match.id}?previousMatch=${previousMatch?.id}`);
    }
    navigate(`/live-match/${match.id}`);
  };

  const onCancel = async () => {
    if (confirm("Are you sure you want to cancel the match?")) {
      navigate("/");
    }
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

  const onSelectPreviousTeam = (striker: string, goalkeeper: string) => {
    if (winnerTeam?.team === "red") {
      setValue("blue_striker", striker);
      setValue("blue_goal_keeper", goalkeeper);
    }
    if (winnerTeam?.team === "blue") {
      setValue("red_striker", striker);
      setValue("red_goal_keeper", goalkeeper);
    }
  };

  if (isPreviousMatchLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <CreateMatchLayout component="form" onSubmit={handleSubmit(onSubmit)}>
        <TeamRedContainer>
          <SelectTeam
            team="red"
            control={control}
            wins={winnerTeam?.team === "red" ? winnerTeam?.streak : 0}
            getValues={getValues}
            setValue={setValue}
          />
        </TeamRedContainer>
        <VsContainer>
          <Typography variant="h3">vs</Typography>
        </VsContainer>
        <TeamBlueContainer>
          <SelectTeam
            team="blue"
            control={control}
            wins={winnerTeam?.team === "blue" ? winnerTeam?.streak : 0}
            getValues={getValues}
            setValue={setValue}
          />
        </TeamBlueContainer>
        <RecentTeamsContainer>
          <Box display="flex">
            <Box mr={5}>
              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isLoading}
            >
              {isLoading ? <CircularProgress /> : "Start a new match"}
            </Button>
          </Box>
          {winnerTeam && (
            <PreExistedTeams
              winner_goal_keeper={winnerTeam?.goal_keeper}
              winner_striker={winnerTeam?.striker}
              onSelect={onSelectPreviousTeam}
            />
          )}
        </RecentTeamsContainer>
      </CreateMatchLayout>
    </>
  );
};
