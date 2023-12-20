import { FunctionComponent, useEffect, useState } from "react";
import Game from "../interfaces/Game";
import { Box, Button, PaletteMode, Typography } from "@mui/material";
import { getTokenDetails, getUserByid } from "../services/userService";
import { getDesignTokens } from "../theme/theme";
import { useThemeContext } from "../theme/ThemeContextProvider";

interface BuyButtonProps {
  game: Game;
}

const BuyButton: FunctionComponent<BuyButtonProps> = ({ game }) => {
  let [isOwnedByUser, setIsOwnedByUser] = useState<boolean>(false);
  let tokenDecoded = getTokenDetails();

  if (isOwnedByUser) {
  }

  useEffect(() => {
    if (tokenDecoded) {
      getUserByid((tokenDecoded as any)._id)
        .then((res) => {
          
          res.data.games.includes(game._id)
            ? setIsOwnedByUser(true)
            : setIsOwnedByUser(false);
        })
        .catch((err) => console.log(err));
    }
  }, [tokenDecoded]);
  return (
    <>
      {isOwnedByUser ? (
        <Box display={"flex"} flexDirection={"row-reverse"}
        
        >
          <Button variant="contained" color="success">
            Play Now
          </Button>
        </Box>
      ) : game.price === 0 ? (
        
          <Box display={"flex"} flexDirection={"row-reverse"}
          
          >
            <Button variant="contained" color="success">
              <Typography variant="h3" color={"black"}>
              Play For Free
              </Typography>
            </Button>
          </Box>
        
      ) : (
          <Button variant="contained" color="secondary" sx={{padding : "10px"}} >
            <Typography variant="body2">
            Add To Cart
            </Typography>
          </Button>
          
      )}
    </>
  );
};

export default BuyButton;
