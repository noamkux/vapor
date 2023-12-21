import { Theme } from "@mui/material";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface CarouselButtonsProps {
  index: number;
  handleMove: Function;
  designTokens: Theme;
}

const CarouselButtons: FunctionComponent<CarouselButtonsProps> = ({
  index,
  handleMove,
  designTokens,
}) => {
  return (
    <>
      {index === 3 && (
        <motion.i
          whileHover={{ scale: 2 }}
          animate={{ scale: 1, translateY: "-50%" }}
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
            color: designTokens.palette.background.default,
          }}
          className="fa-solid fa-circle-chevron-right"
          onClick={() => handleMove(index)}
        ></motion.i>
      )}
      {index === 0 && (
        <motion.i
          whileHover={{ scale: 2 }}
          animate={{ scale: 1, translateY: "-50%" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            transform: "translateY(-50%)",
            color: designTokens.palette.background.default,
          }}
          className="fa-solid fa-circle-chevron-left"
          onClick={() => handleMove(index)}
        ></motion.i>
      )}
    </>
  );
};

export default CarouselButtons;
