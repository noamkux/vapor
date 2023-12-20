import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Compatibility from "../widgets/Compatibility";
import { getFormattedDate } from "../services/dateService";
import Badges from "../widgets/Badges";

interface GameInfoProps {
  game: Game;
}

const GameInfo: FunctionComponent<GameInfoProps> = ({ game }) => {
  return (
    <>
      <Paper sx={{ width: "100%", border: "none" }}>
        <img
          src={game.media.header_image}
          alt={game.name}
          style={{ width: "100%", height: "100%" }}
        />
        <Box p={"15px"}>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <Typography variant="h3">{game.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"GrayText"} variant="body1">
                  Developer
                </Typography>
                <Typography variant="body1">{game.developer}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"GrayText"} variant="body1">
                  Publisher
                </Typography>
                <Typography variant="body1">{game.publisher}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"GrayText"} variant="body1">
                  Released
                </Typography>
                <Typography variant="body1">
                  {getFormattedDate(game.release_date)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography>{game.description.short_description}</Typography>
            </Grid>
            <Badges items={game.type.steamspy_tags} setLength={5} />
            <Grid item xs={12}>
              <Compatibility game={game} size={"small"} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default GameInfo;
