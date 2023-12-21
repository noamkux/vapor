import { FunctionComponent } from "react";
import Carousel from "react-material-ui-carousel";
import Game from "../interfaces/Game";
import {
  Box,
  Fab,
  Grid,
  PaletteMode,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { getDesignTokens } from "../theme/theme";
import Badges from "../widgets/Badges";
import BuyButton from "../widgets/BuyButton";
import Compatibility from "../widgets/Compatibility";
import PriceTag from "../widgets/PriceTag";
import { useNavigate } from "react-router-dom";

interface RandomGamesCarouselProps {
  games: Array<Game>;
}

const RandomGamesCarousel: FunctionComponent<RandomGamesCarouselProps> = ({
  games,
}) => {
  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);
  let navigate = useNavigate();

  return (
    <Box mb={"20px"} pb={"10px"} height={"375px"}>
      <Carousel
        autoPlay={false}
        sx={{height: "100%"}}
        stopAutoPlayOnHover
        indicatorContainerProps={{ style: { display: "none" } }}
      >
        {games.map((game, i) => (
          <Paper
            key={i}
            sx={{
              padding: "10px",
              paddingBottom : "20px",
              borderRadius: "0px",
              overflow: "hidden",
              
            }}
          >
            
              <img
                src={game.media.header_image}
                alt={game.name}
                onClick={() => navigate(`/game/${game._id}`)}
                style={{
                  paddingTop: "10px",
                  width: "100%",
                  overflow: "hidden",
                  textAlign: "center",
                  backgroundSize: "cover",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            <Typography noWrap variant="h1" ml={"10px"} mb={"5px"}>
              {game.name}
            </Typography>
            <Box display={"flex"} flexDirection={"row"} height={"30px"}>
              <Badges
                setLength={7}
                items={game.type.categories.concat(
                  game.type.genres,
                  game.developer
                )}
              />
            </Box>
            <Grid container paddingTop={"20px"}>
              <Grid
                item
                xs={6}
                pt={"5px"}
                pl={"10px"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Compatibility game={game} size="medium" />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PriceTag game={game} />
              </Grid>
              <Grid item xs={3}>
                <BuyButton game={game} />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
};

export default RandomGamesCarousel;
