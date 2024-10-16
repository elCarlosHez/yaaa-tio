import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Dashboard = () => {
  return (
    <Grid>
      <Typography variant="h1">Dashboard</Typography>
      <Grid component="form">
        <Grid xsOffset={1} xs={10} container>
          <Grid
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box mr={2}>
              <Button variant="contained">Gol</Button>
            </Box>
            <Box mr={2}>
              <Button variant="contained">Own Gol</Button>
            </Box>
            <Box mr={2} minWidth={"240px"}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Goal Keeper</InputLabel>
                <Select variant="filled" label="Eligue un jugador">
                  <MenuItem>Juan</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid xs={6} display="flex">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Delantero</InputLabel>
              <Select label="Eligue un jugador">
                <MenuItem>Pepe</MenuItem>
              </Select>
            </FormControl>
            <Button>Gol</Button>
            <Button>Own Gol</Button>
          </Grid>
          <Grid xs={6}></Grid>
          <Grid xs={6}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
