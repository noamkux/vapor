import { Box, Grid, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import BuyButton from "./BuyButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface VerticalGameCardProps {
  game: Game;
  index: number;
  hoverdItem: number | null;
}

const VerticalGameCard: FunctionComponent<VerticalGameCardProps> = ({
  game,
  index,
  hoverdItem,
}) => {
  let navigate = useNavigate();

  return (
    <>
      {hoverdItem !== index && hoverdItem !== null ? (
        <></>
      ) : (
        <Box // image
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            height: "215px",
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${game.media.header_image})`,
          }}
          onClick={() => hoverdItem === index}
        >
          <Box // gradient
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              height: "100px",
              width: "100%",
              background: `${
                hoverdItem == index &&
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(30,30,30,1) 100%)"
              }`,
            }}
          >
            <Grid container>
              <Grid item xs={6} pb={"10px"}>
                <Typography // Game Name
                  variant="h3"
                  fontWeight={400}
                  sx={{
                    color: "white",
                    textAlign: "left",
                    paddingLeft: "20px",
                  }}
                >
                  {hoverdItem == index && game.name}
                </Typography>
              </Grid>
              {hoverdItem == index && (
                <Grid
                  item
                  xs={6}
                  display={"flex"}
                  pr={"10px"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-end"}
                >
                  <Box // Buy Button
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <BuyButton game={game} />
                    </motion.div>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerticalGameCard;
