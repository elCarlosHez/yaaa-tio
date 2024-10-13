import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  IconButton,
  Select,
  Typography,
} from "@mui/material";
import { mq, BREAKPOINTS } from "../../theme";
import { StyledComponentProps, Theme } from "@mui/material/styles";

const generateBorderByWins = (
  team: "red" | "blue",
  theme: Theme,
  wins: number,
) => {
  if (wins < 5 && team === "red") {
    return `border: 1px solid ${theme.palette.error.main};`;
  }
  if (wins < 5 && team === "blue") {
    return `border: 1px solid ${theme.palette.primary.main};`;
  }

  return `
    position: relative;
    overflow: hidden;
    z-index: 0;

    @keyframes rotate {
      100% {
        transform: rotate(1turn);
      }
    }

    &::before {
      content: '';
      position: absolute;
      z-index: -2;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-color: #399953;
      background-repeat: no-repeat;
      background-size: 50% 50%, 50% 50%;
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      background-image: linear-gradient(#ef476f, #ef476f), linear-gradient(#ffd166, #ffd166), linear-gradient(#06d6a0, #06d6a0), linear-gradient(#118ab2, #118ab2);
      animation: rotate 4s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      left: 6px;
      top: 6px;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      background: white;
      border-radius: 5px;
    }
  `
};

interface ICreateMatchLayout {
  team: "red" | "blue";
  wins: number;
}

export const CreateMatchLayout = styled(Box)`
  --angle: 0deg;
  width: 100%;
  display: grid;
  ${(props) => generateBorderByWins(props.team, props.theme, props.wins)}
  padding: 1.5rem;
  border-radius: 10px !important;
  grid-template:
    ${({ team }: ICreateMatchLayout) =>
      team === "red"
        ? `"streak streak"
          "switch first_player"
          "switch second_player" 1fr;`
        : `"streak streak"
          "first_player switch"
          "second_player switch" 1fr;`}
    ${mq[BREAKPOINTS.sm]} {
    // TODO: Add breakpoint styles
  }
`;

interface ISwitchButton extends StyledComponentProps {
  team: "red" | "blue";
}

export const SwitchButton = styled(IconButton)`
  grid-area: switch;
  border: 1px solid
    ${(props) =>
      props.team === "red"
        ? props.theme?.palette?.error?.main
        : props.theme?.palette?.primary?.main} !important;
  border-radius: 10px;
  width: 70px;
  height: 100%;
  margin-left: ${({ team }: ISwitchButton) =>
    team === "red" ? "auto" : "1rem"};
  margin-right: ${({ team }: ISwitchButton) =>
    team === "red" ? "1rem" : "auto"};
  }
`;

interface ISelectPosition {
  team: "red" | "blue";
  enableMarginBottom?: boolean;
}

export const SelectGoalkeeperStyled = styled(FormControl)`
  grid-area: ${({ team }: ISelectPosition) =>
    team === "red" ? "first_player" : "second_player"};
  margin-bottom: ${({ team, enableMarginBottom }: ISelectPosition) =>
    team === "red" && enableMarginBottom ? "1.5rem !important" : ""};
  min-width: 160px !important;
`;

export const SelectStrikerStyled = styled(FormControl)`
  grid-area: ${({ team }: ISelectPosition) =>
    team === "red" ? "second_player" : "first_player"};
  margin-bottom: ${({ team, enableMarginBottom }: ISelectPosition) =>
    team === "red" && enableMarginBottom ? "" : "1.5rem !important"};
  min-width: 160px !important;
`;

interface ISelectPosition extends StyledComponentProps {
  team: "red" | "blue";
}

export const SelectPosition = styled(Select)<ISelectPosition>`
  .MuiBox-root {
     padding: 0;
  }
  .MuiOutlinedInput-notchedOutline,
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) =>
      props.team === "red"
        ? props.theme?.palette?.error?.main
        : props.theme?.palette?.primary?.main};
  }
`;

export const WinsTypography = styled(Typography)`
  position: relative;
  color: #000;
  background: #fff;
  mix-blend-mode: multiply;
  overflow: hidden;
  font-weight: bold;

  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 2px 4px 6px;
  margin: -2px -4px -6px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: -100%;
    background: white
      repeating-linear-gradient(
        90deg,
        #14ffe9 0%,
        #ffc800 16.66666%,
        #ff00e0 33.33333%,
        #14ffe9 50%
      );
    mix-blend-mode: screen;
    pointer-events: none;
    animation: move 2s linear infinite;
  }
  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }
`;
