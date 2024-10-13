import styled from "@emotion/styled";
import {
  Box,
  FormControl,
} from "@mui/material";

export const ExitedTeamsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 10px;
  padding: 1.5rem;
  margin-right: 2em;
`;

export const FormControlExistedPlayer = styled(FormControl)`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 10px;
  width: 200px !important;
`;
