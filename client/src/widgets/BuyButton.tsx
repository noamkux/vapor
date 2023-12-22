

import { FunctionComponent, useEffect, useState } from "react";
import Game from "../interfaces/Game";
import { Box, Button, PaletteMode, Typography } from "@mui/material";
import { getTokenDetails, getUserByid } from "../services/userService";
import { getDesignTokens } from "../theme/theme";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useNavigate } from "react-router-dom";

interface BuyButtonProps {
  game: Game;
}

const BuyButton: FunctionComponent<BuyButtonProps> = ({ game }) => {
  let [isOwnedByUser, setIsOwnedByUser] = useState<boolean>(false);
  let tokenDecoded = getTokenDetails();
  let navigate = useNavigate()

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
        
          <Button variant="contained" color="success" onClick={() => navigate(`/game/${game._id}`)}>
            Play Now
          </Button>
      ) : game.price === 0 ? (
        
          
            <Button fullWidth sx={{height : "100%"}} variant="contained" color="success" onClick={() => navigate(`/game/${game._id}`)}>
              <Typography variant="h3" color={"black"}>
              Free
              </Typography>
            </Button>
        
      ) : (
          <Button variant="contained" color="secondary" onClick={() => navigate(`/game/${game._id}`)}>
            <Typography variant="body2">
            Add To Cart
            </Typography>
          </Button>
          
      )}
    </>
  );
};

export default BuyButton;
