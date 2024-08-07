import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BREAKPOINTS, mq } from "../theme";

export const LoginLayout = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  ${mq[BREAKPOINTS.sm]} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

export const LoginImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  object-position: center;
  object-repeat: no-repeat;
  ${mq[BREAKPOINTS.sm]} {
    height: 100%;
  }
`;

export const LoginContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  order: -1;
  ${mq[BREAKPOINTS.sm]} {
    order: 1;
  }
`;
