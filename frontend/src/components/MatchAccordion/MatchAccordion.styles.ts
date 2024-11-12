import styled from "@emotion/styled";
import {
  Accordion,
  AccordionSummary,
  Box,
  FormControl,
  IconButton,
  Select,
  Typography,
} from "@mui/material";
import { mq, BREAKPOINTS } from "../../theme";
import { StyledComponentProps, Theme } from "@mui/material/styles";
import { Match } from "../../types";

interface IAccordionMatch {
  isWin: boolean;
}

export const AccordionMatch = styled(Accordion) <IAccordionMatch>`
  border: 1px solid ${(props) =>
    props.isWin
      ? props.theme?.palette?.primary.light
      : props.theme?.palette?.error.light};

`;

interface IAccordionMatchSummary {
  isWin: boolean;
}

export const AccordionMatchSummary = styled(AccordionSummary) <IAccordionMatchSummary>`
  background: ${(props) =>
    props.isWin
      ? props.theme?.palette?.primary.light
      : props.theme?.palette?.error.light};
  color: ${(props) => props.theme.palette.common.white};
  position: relative;
  &::before {
    display: block;
    position: absolute;
    top: 0;
    left: -10px;
    width: 10px;
    height: 100%;
    background: ${(props) => props.isWin
    ? props.theme?.palette?.primary?.light
    : props.theme?.palette?.error?.light};
  }
`;
