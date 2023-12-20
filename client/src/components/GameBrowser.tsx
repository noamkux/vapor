import { get } from "http";
import { FunctionComponent, useEffect, useState } from "react";
import { getGames, getGamesByPage } from "../services/gamesService";
import Game from "../interfaces/Game";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import { Box, Pagination, Tab, Tabs } from "@mui/material";

interface GameBrowserProps {}

const GameBrowser: FunctionComponent<GameBrowserProps> = () => {
  let [games, setGames] = useState<Game[]>([]);
  let [page, setPage] = useState<number>(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(value);

    if (value === 0) {
      const params = {
        page: page,
        limit: 10,
        sort: "release_date,desc",
      };
      getGames(params)
        .then((res) => {
          setGames(res.data.games);
          console.log(res.data.games);
        })
        .catch((err) => console.log(err));
    } else if (value === 1) {
      const params = {
        page: page,
        limit: 10,
        sort: "stats.average_playtime,desc",
      };
      getGames(params)
        .then((res) => {
          setGames(res.data.games);
        })
        .catch((err) => console.log(err));
    } else if (value === 2) {
      const params = {
        page: page,
        limit: 10,
        sort: "stats.positive_ratings,desc",
      };
      getGames(params)
        .then((res) => {
          setGames(res.data.games);
          console.log(res.data.games);
        })
        .catch((err) => console.log(err));
    }
  }, [value, page]);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab label="New and Trending" value={0} />
          <Tab label="Top Seller" value={1} />
          <Tab label="Top Reated" value={2} />
        </Tabs>
      </Box>
      {games &&
        games.map((game) => <HorizontalGameCard game={game} key={game._id} />)}
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          mt: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
  );
};

export default GameBrowser;
