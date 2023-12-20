import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import { Typography } from "@mui/material";

interface PriceTagProps {
    game : Game
}
 
const PriceTag: FunctionComponent<PriceTagProps> = ({game}) => {
  return (
    <>
    <Typography
            variant="h3"
            mr={"10px"}
            px={"10px"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ${game.price}
          </Typography>
    </>
)}
 
export default PriceTag;