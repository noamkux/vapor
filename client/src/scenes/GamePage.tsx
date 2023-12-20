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
            ? designTokens.palette.grey[900] 
            : `url(${game?.media.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            // padding: "10px"
          }}
        >
          <GameInfo game={game}></GameInfo>
        </Box>
      )}
    </>
  );
};

export default GamePage;
