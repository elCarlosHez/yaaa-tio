import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { mq, BREAKPOINTS } from "../../theme";

export const CreateMatchLayout = styled(Box)`
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  padding-top: 0;
  grid-template:
    "team_red team_red vs team_blue team_blue" 1fr
    "footer footer footer footer footer";
  ${mq[BREAKPOINTS.sm]} {
    padding-top: 2em;
  }
`;

export const TitleContainer = styled(Box)`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TeamRedContainer = styled(Box)`
  grid-area: team_red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TeamBlueContainer = styled(Box)`
  grid-area: team_blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const VsContainer = styled(Box)`
  grid-area: vs;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecentTeamsContainer = styled(Box)`
  margin: 2rem 0;
  grid-area: footer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
