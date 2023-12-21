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
        </Box>
      )}
    </>
  );
};

export default GamePage;
