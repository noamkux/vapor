import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import { Box, Button, Typography } from "@mui/material";

interface PriceTagProps {
  game: Game;
}

const PriceTag: FunctionComponent<PriceTagProps> = ({ game }) => {
  return (
    <>
      {game.price === 0 ? (
        <Box>
          
        <Typography
          variant="h3"
        >
          Free To Play
        </Typography>
        </Box>
      ) : (
        <Typography
          variant="h3"
        >
          ${game.price}
        </Typography>
      )}
    </>
  );
};

export default PriceTag;
