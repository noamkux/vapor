import { FunctionComponent, useEffect, useState } from "react";
import Game from "../interfaces/Game";
import { Box } from "@mui/material";

interface CompatibilityProps {
  game: Game;
  size: "small" | "medium" | "large";
}

const Compatibility: FunctionComponent<CompatibilityProps> = ({
  game,
  size,
}) => {
  let [iconSize, setIconSize] = useState<1 | 2 | 3 >(3);
  useEffect(() => {
    switch (size) {
        case "small":
            setIconSize(1);
            break;
        case "medium":
            setIconSize(2);
            break;
        case "large":
            setIconSize(3);
            break;
        default:
            setIconSize(2);
            break;
        }
  }, [game]);
  return (
    <>
      <Box color={"text.secondery"}>
        {game.platforms.includes("windows") && (
          <i
            className={`fa-brands fa-windows fa-${iconSize}x`}
            style={{  paddingRight: "10px" }}
          ></i>
        )}

        {game.platforms.includes("mac") && (
          <i
            className={`fa-brands fa-apple fa-${iconSize}x`}
            style={{ paddingLeft: "10px" , paddingRight: "10px"  }}
          ></i>
        )}
        {game.platforms.includes("linux") && (
          <i
            className={`fa-brands fa-linux fa-${iconSize}x`}
            style={{ paddingLeft: "10px" , paddingRight: "10px" }}
          ></i>
        )}
      </Box>
    </>
  );
};

export default Compatibility;
