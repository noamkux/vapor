import { Box, Grid, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Game from "../interfaces/Game";
import Compatibility from "./Compatibility";
import Badges from "./Badges";
import BuyButton from "./BuyButton";
import PriceTag from "./PriceTag";
import { Link } from "react-router-dom";
import { BorderBottom } from "@mui/icons-material";

interface HorizontalGameCardProps {
  game: Game;
}

const HorizontalGameCard: FunctionComponent<HorizontalGameCardProps> = ({
  game,
}) => {
  return (
    <>
      {game && (
        <Grid
          container
          width={"100%"}
          height={"100px"}
          bgcolor={"grey.900"}
          sx={{
            borderBottom: "5px solid #1b2838",
          }}
        >
          <Grid
            item
            height={"100%"}
            xs={5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link
              style={{
                height: "100%",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/game/${game._id}`}
            >
              <img
                src={game.media.header_image}
                alt={game.name}
                height={"100%"}
                width={"100%"}
                style={{ backgroundSize: "cover", padding: "10px" }}
              />
            </Link>
          </Grid>

          <Grid height={"100%"} item xs={5} pt={"10px"}>
            <Stack>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                to={`/game/${game._id}`}
              >
                <Typography
                  variant={"body1"}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "nowrap",
                  }}
                >
                  {game.name}
                </Typography>
                <Compatibility size="small" game={game} />
              </Link>
              <Box height="29px">
                <Badges items={game.type.steamspy_tags} dataType={"steamspy_tags"} setLength={3} />
              </Box>
            </Stack>
          </Grid>

          <Grid
            item
            xs={2}
            height={"100%"}
            pr={"10px"}
            mt={"20px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/game/${game._id}`}
            >
              <PriceTag game={game} />
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HorizontalGameCard;
