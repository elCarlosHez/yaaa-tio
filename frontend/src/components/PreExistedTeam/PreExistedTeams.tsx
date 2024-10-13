import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PlayerMenuItem } from "../PlayerMenuItem";
import { useGetUsers } from "../../queries";
import useEmblaCarousel from "embla-carousel-react";
import {
  ExitedTeamsContainer,
  FormControlExistedPlayer,
} from "./PreExistedTeams.styles";
import { useGetPreExistedTeams } from "../../queries/GetPreExistedTeams";
import { css } from "@emotion/css";

interface IPreExistedTeams {
  winner_striker?: string;
  winner_goal_keeper?: string;
  onSelect: (striker: string, goalkeeper: string) => void;
}

export const PreExistedTeams = ({
  winner_striker,
  winner_goal_keeper,
  onSelect,
}: IPreExistedTeams) => {
  const { data: users, isLoading } = useGetUsers();
  const { data: preExistedTeams, isLoading: areTeamsLoading } =
    useGetPreExistedTeams(winner_striker, winner_goal_keeper);
  const [emblaRef] = useEmblaCarousel();

  if (isLoading || areTeamsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box my={3} ref={emblaRef}>
      <Box
        mt={3}
        className={css`
          display: flex;
          max-width: 90vw;
          padding: 1rem;
        `}
      >
        {preExistedTeams?.map((team) => (
          <ExitedTeamsContainer key={`match-${team.striker}-${team.goalkeeper}`}>
            <FormControlExistedPlayer>
              <InputLabel id={`_goalkeeper`}>GoalKeeper</InputLabel>
              <Select
                readOnly
                label="GoalKeeper"
                labelId={`_goalkeeper`}
                defaultValue={team.goalkeeper}
              >
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <PlayerMenuItem player={user} />
                  </MenuItem>
                ))}
              </Select>
            </FormControlExistedPlayer>
            <Box my={1} />
            <FormControlExistedPlayer>
              <InputLabel id={`_striker`}>Striker</InputLabel>
              <Select
                readOnly
                label="Striker"
                labelId={`_striker`}
                defaultValue={team.striker}
              >
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <PlayerMenuItem player={user} />
                  </MenuItem>
                ))}
              </Select>
            </FormControlExistedPlayer>
            <Box mt={3} width="100%">
              <Button
                fullWidth
                variant="contained"
                onClick={() => onSelect(team.goalkeeper, team.striker)}
              >
                Select
              </Button>
            </Box>
          </ExitedTeamsContainer>
        ))}
        {!preExistedTeams?.length && <Box></Box>}
      </Box>
    </Box>
  );
};
