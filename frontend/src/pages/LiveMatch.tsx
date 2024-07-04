import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { usePocket } from "../contexts/PocketContext";
import { useEffect } from "react";
import { Player } from "../components/Player";

export const LiveMatch = () => {
  const { pb } = usePocket();
  useEffect(() => {
    pb.collection("users")
      .getFullList()
      .then((data) => console.log(data));
  }, []);
  return (
    <Grid container>
      <Grid xs={12}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Button
            className={css`
              margin-right: 12px !important;
            `}
            variant="outlined"
          >
            Cancel
          </Button>
          <Typography
            className={css`
              margin-right: 12px !important;
            `}
            variant="h4"
            color={"primary"}
          >
            3 - 1
          </Typography>
          <Button variant="contained">Accept</Button>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Player position="Goalkeeper" side="red" />
          <Player position="Striker" side="blue" />
          <Player position="Striker" side="red" />
          <Player position="Goalkeeper" side="blue" />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <h1>
          Gol de Juan{" "}
          <IconButton color="error" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </h1>
      </Grid>
    </Grid>
  );
};
