import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import { Grid, PaletteMode, Stack, Typography } from "@mui/material";
import StatsSlider from "./StatsSlider";
import { getDesignTokens } from "../theme/theme";
import { useThemeContext } from "../theme/ThemeContextProvider";

interface ReviewsProps {
  game: Game;
}

const Reviews: FunctionComponent<ReviewsProps> = ({ game }) => {
  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);
  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                color={"GrayText"}
                variant="subtitle1"
                width={"122px"}
              >
                Positive Reviews
              </Typography>
              <Typography variant="subtitle1">
                {game.stats.positive_ratings}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                color={"GrayText"}
                variant="subtitle1"
                width={"122px"}
              >
                Negative Reviews
              </Typography>
              <Typography variant="subtitle1">
                {game.stats.negative_ratings}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack>
            <Typography color={"GrayText"} variant="subtitle1">
              Owners
            </Typography>
            <Typography variant="subtitle1">{game.stats.owners}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* <StatsSlider ></StatsSlider> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Reviews;
