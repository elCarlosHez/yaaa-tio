import {
  Avatar,
  Box,
  CircularProgress,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { PlayerMenuItem } from "../PlayerMenuItem";
import { useGetUsers } from "../../queries";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  CreateMatchLayout,
  SelectGoalkeeperStyled,
  SelectPosition,
  SelectStrikerStyled,
  SwitchButton,
  WinsTypography,
} from "./SelectTeam.styles";
import { css } from "@emotion/css";
import { MatchesBody } from "../../types";

interface ISelectTeam {
  control: Control<MatchesBody>;
  getValues: UseFormGetValues<MatchesBody>;
  setValue: UseFormSetValue<MatchesBody>;
  team: "red" | "blue";
  wins: number;
}

export const SelectTeam = ({
  control,
  getValues,
  setValue,
  team,
  wins,
}: ISelectTeam) => {
  const { data: users, isLoading } = useGetUsers();

  if (isLoading) {
    return <CircularProgress />;
  }

  const onSwitch = () => {
    const striker = getValues(`${team}_striker`);
    const goalkeeper = getValues(`${team}_goal_keeper`);
    setValue(`${team}_striker`, goalkeeper);
    setValue(`${team}_goal_keeper`, striker);
  };

  return (
    <Box>
      <CreateMatchLayout team={team} wins={wins}>
        {wins > 0 && (
          <Box
            className={css`
              grid-area: streak;
              text-align: center;
              margin-bottom: 1rem !important;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {wins > 0 && wins <= 2 && (
              <Typography variant="h6">{wins} Wins</Typography>
            )}
            {wins > 2 && (
              <WinsTypography variant="h6">{wins} Wins</WinsTypography>
            )}
          </Box>
        )}

        <SwitchButton
          team={team}
          aria-label="Switch players"
          onClick={onSwitch}
          type="button"
        >
          <Avatar src="/sort.png" alt="Switch players" />
        </SwitchButton>
        <SelectGoalkeeperStyled enableMarginBottom team={team} fullWidth>
          <InputLabel id={`${team}_goalkeeper`}>Goalkeeper</InputLabel>
          <Controller
            control={control}
            name={`${team}_goal_keeper`}
            render={({ field: { value, onChange } }) => (
              <SelectPosition
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                team={team}
                label="Goalkeeper"
                labelId={`${team}_goalkeeper`}
              >
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <PlayerMenuItem player={user} />
                  </MenuItem>
                ))}
              </SelectPosition>
            )}
          />
        </SelectGoalkeeperStyled>
        <SelectStrikerStyled team={team} enableMarginBottom fullWidth>
          <InputLabel id={`${team}_striker`}>Striker</InputLabel>
          <Controller
            control={control}
            name={`${team}_striker`}
            render={({ field: { value, onChange } }) => (
              <SelectPosition
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                team={team}
                label="Striker"
                labelId={`${team}_striker`}
              >
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <PlayerMenuItem player={user} />
                  </MenuItem>
                ))}
              </SelectPosition>
            )}
          />
        </SelectStrikerStyled>
      </CreateMatchLayout>
    </Box>
  );
};
