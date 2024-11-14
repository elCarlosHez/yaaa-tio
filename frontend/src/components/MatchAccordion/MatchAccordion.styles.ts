import styled from "@emotion/styled";
import {
  Accordion,
  AccordionSummary,
} from "@mui/material";
import isPropValid from '@emotion/is-prop-valid'

interface IAccordionMatch {
  isWin: boolean;
}

export const AccordionMatch = styled(Accordion, { shouldForwardProp: isPropValid })<IAccordionMatch>`
  border: 1px solid ${(props) =>
    props.isWin
      ? props.theme?.palette?.primary.light
      : props.theme?.palette?.error.light};

`;

interface IAccordionMatchSummary {
  isWin: boolean;
}

export const AccordionMatchSummary = styled(AccordionSummary, { shouldForwardProp: isPropValid }) <IAccordionMatchSummary>`
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
