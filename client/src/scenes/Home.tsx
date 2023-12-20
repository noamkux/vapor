import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import BigCarousel from "../components/BigCarousel";
import FeaturedGame from "../components/FeaturedGame";
import Game from "../interfaces/Game";
import { getGamesByPage } from "../services/gamesService";
import VerticalGameCardCarousel from "../components/VerticalGameCardCarousel";
import { get } from "http";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import GameBrowser from "../components/GameBrowser";
import GenresButtons from "../components/GenresButtons";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [bigCarouselGames, setBigCarouselGames] = useState<Game[]>([]);
  const [verticalCarouselGames, setVerticalCarouselGames] = useState<Game[]>(
    []
  );

  useEffect(() => {
    getGamesByPage(7)
      .then((res) => setBigCarouselGames(res.data))
      .catch((err) => console.log(err));

    getGamesByPage(4)
      .then((res) => setVerticalCarouselGames(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <BigCarousel games={bigCarouselGames} />
      <VerticalGameCardCarousel games={verticalCarouselGames} />
      <Box mt={"20px"}>
        <FeaturedGame />
      </Box>
      <GenresButtons size="medium" xs={6}/>
      <GameBrowser/>
    </>
  );
};

export default Home;
