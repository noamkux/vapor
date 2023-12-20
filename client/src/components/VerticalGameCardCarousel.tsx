import { Grid as MuiGrid, styled } from "@mui/material";
import { FunctionComponent, useState } from "react";
import VerticalGameCard from "../widgets/VerticalGameCard";
import Game from "../interfaces/Game";

interface VerticalGameCardCarouselProps {
  games: Game[];
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  transition: theme.transitions.create('flex', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
}));

const VerticalGameCardCarousel: FunctionComponent<VerticalGameCardCarouselProps> = ({ games }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  return (
    <>
      <Grid container m={0}>
        {games.map((game, i) => (
          <Grid
            item
            xs = {12}
            style={{
              flex: hoveredItem === i ? 1 : (hoveredItem !== null ? 0 : 1),
              // padding: "5px",
            }}
            key={i}
            onMouseEnter={() => setHoveredItem(i)}
            onClick={hoveredItem === i ? () => setHoveredItem(null) : () => setHoveredItem(i)}
            onMouseLeave={() => setHoveredItem(null)}>
            <VerticalGameCard game={game} hoverdItem={hoveredItem} index={i}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VerticalGameCardCarousel;