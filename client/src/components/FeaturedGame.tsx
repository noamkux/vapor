import { Box, Grid, PaletteMode, Paper, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { getDesignTokens } from "../theme/theme";
import { getGamesByPage } from "../services/gamesService";
import Game from "../interfaces/Game";
import Badges from "../widgets/Badges";
import Carousel from "react-material-ui-carousel";

interface FeaturedGameProps {}

const FeaturedGame: FunctionComponent<FeaturedGameProps> = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);
  const [game, setGame] = useState<Game[]>([]);
  const [urls, setUrls] = useState<any>([]);

  useEffect(() => {
    if (game[0]?.media.movies) {
      const moviesString = (game[0]?.media.movies).slice(1, -1);
      const urlRegex = /https?:\/\/\S+/g;
      setUrls(moviesString.match(urlRegex) || []);
    }
  }, [game]);

  useEffect(() => {
    getGamesByPage(1)
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Paper
      sx={{
        backgroundImage: `url(${game[0]?.media.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "10px"
      }}
    >
      <Typography fontSize={30} variant="body2" textAlign={"center"}>
        Featured Game
      </Typography>
      <Typography fontSize={20} fontWeight={"bold"} textAlign={"center"}>
        {game[0]?.name}
      </Typography>
      <Grid container spacing={0.5} mt={"10px"}>
        <Grid
          item
          xs={7}
          sx={{
          }}
        >
          {!game[0]?.media.movies ? (
            <>
              {/* <img
                src={game[0]?.media.header_image}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              /> */}
              <Carousel
                // height={"100%"}
                stopAutoPlayOnHover
                indicatorContainerProps={{ style: { display: "none" } }}
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {game[0]?.media.screenshots.map((screenshot, i) => (
                  <img key={i} src={screenshot.path_full} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ))}
              </Carousel>
            </>
          ) : (
            <>
              <video
                src={urls[1]}
                autoPlay
                loop
                muted
                controls
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </>
          )}
        </Grid>

        <Grid item xs={5}>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontWeight={500}
            fontSize={15}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
            }}
          >
            {game[0]?.description.about_the_game}
          </Typography>
        </Grid>

        <Box
          display={"flex"}
          flexDirection={"row"}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={"10px"}
          height="29px"
        >
          <Badges
            setLength={4}
            items={game[0]?.type.steamspy_tags}
            dataType={"steamspy_tags"}
          />
        </Box>
      </Grid>
    </Paper>
  );
};

export default FeaturedGame;
