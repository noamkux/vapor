import { FunctionComponent, useState, useEffect } from "react";
import Game from "../interfaces/Game";
import Carousel from "react-material-ui-carousel";
import { Box, Pagination, PaletteMode } from "@mui/material";
import { motion } from "framer-motion";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { getDesignTokens } from "../theme/theme";
import CarouselButtons from "../widgets/CarouselButtons";

interface GameCarouselProps {
  game: Game;
}

const GameCarousel: FunctionComponent<GameCarouselProps> = ({ game }) => {
  let [currentImg, setCurrentImg] = useState<number>(0);
  let [screenshots, setScreenshots] = useState<string[]>([]);
  let [imgCounter, setImgCounter] = useState<number>(0);

  const { mode, toggleColorMode } = useThemeContext();
  const designTokens = getDesignTokens(mode as PaletteMode);

  function handleMove(index: number) {
    if (index === 0) {
      if (imgCounter === 0) {
        return;
      }
      setImgCounter(imgCounter - 1);
      setCurrentImg(currentImg - 1);
    }
    if (index === 3) {
      if (imgCounter === screenshots.length - 4) {
        return;
      }
      setImgCounter(imgCounter + 1);
    }
  }
  useEffect(() => {
    if (currentImg % 4 === 0) {
      if (currentImg === 0) {
        return;
      }
      setImgCounter(currentImg + 4);
    }
  }, [screenshots]);

  useEffect(() => {
    const screenshots = game.media.screenshots.map(
      (screenshot) => screenshot.path_full
    );
    setScreenshots(screenshots);
  }, [game]);

  return (
    <>
      {screenshots && (
        <Box p={"15px"} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <Carousel
            sx={{ overflow: "visible" }}
            autoPlay={false}
            navButtonsAlwaysInvisible={true}
            indicatorIconButtonProps={{
              style: {
                padding: "2.5px",
                width: "25%",
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                overflow: "visible",
                verticalAlign: "none",
              },
            }}
            indicatorContainerProps={{
              style: {
                overflow: "visible",
              },
            }}
            IndicatorIcon={screenshots
              .slice(imgCounter, imgCounter + 4)
              .map((img, index) => {
                return (
                  <>
                    <img
                      className="carousel-indicator"
                      key={index}
                      src={img}
                      alt={game.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                    />
                    <CarouselButtons index={index} handleMove={handleMove} designTokens={designTokens}/>
                  </>
                );
              })}
          >
            {screenshots
              .slice(imgCounter, imgCounter + 4)
              .map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={game.name}
                  style={{
                    width: "100%",
                    height: "25vh",
                    maxHeight: "25vh",
                    maxWidth: "100%",
                  }}
                />
              ))}
          </Carousel>
          
        </Box>
      )}
    </>
  );
};

export default GameCarousel;
