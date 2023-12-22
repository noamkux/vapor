import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../services/gamesService";
import Game from "../interfaces/Game";
import {
  Box,
  PaletteMode,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import GameInfo from "../components/GameInfo";
import { getDesignTokens } from "../theme/theme";
import { useThemeContext } from "../theme/ThemeContextProvider";
import GameCarousel from "../components/GameCarousel";
import GameBrowser from "../components/GameBrowser";

interface GamePageProps {}

const GamePage: FunctionComponent<GamePageProps> = () => {
  let { gameId } = useParams();
  let [game, setGame] = useState<Game>();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);

  useEffect(() => {
    {
      gameId &&
        getGameById(gameId)
          .then((res) => setGame(res.data))
          .catch((err) => console.log(err));
    }
  }, []);


  return (
    <>
      {game && (
        <Box
          sx={{background: isNonMobileScreens 
            ? designTokens.palette.primary.light
            : `url(${game?.media.background})`,
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "200vh",  
          }}
        >
          <GameInfo game={game}></GameInfo>
          <GameCarousel game={game}></GameCarousel>
          <Box height={"50px"}></Box>
          <GameBrowser initialParams={{searchParams: {"type.steamspy_tags" : game.type.steamspy_tags[0]}}}/>
        </Box>
      )}
    </>
  );
};

export default GamePage;
