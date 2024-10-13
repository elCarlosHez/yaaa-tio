import { createTheme, Theme } from "@mui/material";

export const enum BREAKPOINTS {
  sm,
  md,
  lg,
  xl,
}

const breakpoints = [576, 768, 992, 1200];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const customTheme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "red_team" }, // Custom variant
              style: {
                borderColor: (theme: Theme) => theme.palette.error.main,
              },
            },
          ],
        },
      },
    },
  },
});
