import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import {
  Box,
  Grid,
  PaletteMode,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Compatibility from "../widgets/Compatibility";
import { getFormattedDate } from "../services/dateService";
import Badges from "../widgets/Badges";
import { getDesignTokens } from "../theme/theme";
import { useThemeContext } from "../theme/ThemeContextProvider";
import Reviews from "../widgets/Reviews";
import { useNavigate } from "react-router-dom";

interface GameInfoProps {
  game: Game;
}

const GameInfo: FunctionComponent<GameInfoProps> = ({ game }) => {
  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);
  let navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          border: "none",
          bgcolor: designTokens.palette.secondary.dark,
        }}
      >
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
                <Typography color={"GrayText"} variant="body1" width={"17svw"}>
                  Developer
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => navigate(`/browser/?developer=${game.developer}`)}
                  sx={{
                    color: designTokens.palette.info.main,
                  }}
                >
                  {game.developer}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"GrayText"} variant="body1" width={"17svw"}>
                  Publisher
                </Typography>
                <Typography
                
                  variant="body1"
                  sx={{
                    color: designTokens.palette.info.main,
                  }}
                >
                  {game.publisher}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1}>
                <Typography color={"GrayText"} variant="body1" width={"17svw"}>
                  Released
                </Typography>
                <Typography variant="body1">
                  {getFormattedDate(game.release_date)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item pt={"15px"}>
              <Typography>{game.description.short_description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Badges items={game.type.steamspy_tags} dataType={"steamspy_tags"} setLength={5} />
            </Grid>
            <Grid item xs={12}>
              <Reviews game={game} />
            </Grid>
            <Grid item xs={12}>
              <Compatibility game={game} size={"medium"} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default GameInfo;
