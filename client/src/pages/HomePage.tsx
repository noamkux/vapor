import { Box, Paper } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import RandomGamesCarousel from "../components/RandomGamesCarousel";
import FeaturedGame from "../components/FeaturedGame";
import Game from "../interfaces/Game";
import { getGamesByPage } from "../services/gamesService";
import VerticalGameCardCarousel from "../components/VerticalGameCardCarousel";
import { get } from "http";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import GameBrowser from "../components/GameBrowser";
import GenresButtons from "../components/GenresButtons";
import SearchBar from "../widgets/SearchBar";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [RandomGamesCarouselGames, setRandomGamesCarouselGames] = useState<
    Game[]
  >([]);
  const [verticalCarouselGames, setVerticalCarouselGames] = useState<Game[]>(
    []
  );

  useEffect(() => {
    getGamesByPage(7)
      .then((res) => setRandomGamesCarouselGames(res.data))
      .catch((err) => console.log(err));

    getGamesByPage(4)
      .then((res) => setVerticalCarouselGames(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Paper
      className="gradient-StoreBackground"
    >
      <SearchBar />
      <RandomGamesCarousel games={RandomGamesCarouselGames} />
      <VerticalGameCardCarousel games={verticalCarouselGames} />
      <Box mt={"20px"}>
        <FeaturedGame />
      </Box>
      <GenresButtons size="medium" xs={6} />
      <GameBrowser />
    </Paper>
  );
};

export default Home;
