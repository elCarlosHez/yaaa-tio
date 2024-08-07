import styled from "@emotion/styled";
import { Badge, Box } from "@mui/material";
import { mq, BREAKPOINTS } from "../../theme";

export const ProfileLayout = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template: "1fr";
  align-content: center;
  justify-content: center;
  grid-row-gap: 2rem;
`;

export const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "white",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
  },
}));

