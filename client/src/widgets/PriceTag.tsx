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
          {/* <Button sx={{width : "50px"}} variant="contained" color="success" size="small"> */}
            <Typography variant="h3" whiteSpace={"nowrap"} mr={"45px"}>
              Play For Free
            </Typography>
          {/* </Button> */}
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
