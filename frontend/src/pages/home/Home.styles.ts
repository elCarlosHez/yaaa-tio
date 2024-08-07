import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { mq, BREAKPOINTS } from "../../theme";

export const HomeLayout = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template: "100%";
  align-content: center;
  grid-row-gap: 2rem;
  padding: 0 2rem;
  ${mq[BREAKPOINTS.sm]} {
    grid-column-gap: 2rem;
    padding: 0 20%;
  }
`;
