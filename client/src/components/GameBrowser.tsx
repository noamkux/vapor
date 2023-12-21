import { get } from "http";
import { FunctionComponent, useEffect, useState } from "react";
import { getGames, getGamesByPage } from "../services/gamesService";
import Game from "../interfaces/Game";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import { Box, Pagination, Tab, Tabs } from "@mui/material";
import Filter from "../widgets/Filter";
import PageCounter from "../widgets/PageCounter";

interface GameBrowserProps {}

const GameBrowser: FunctionComponent<GameBrowserProps> = () => {
  let [games, setGames] = useState<Game[]>([]);
  let [page, setPage] = useState<number>(1);
  let [filter, setFilter] = useState<string>("");
 
  useEffect(() => {
    const params = {
      page: page,
      limit: 10,
      sort: filter,
    };
    getGames(params)
      .then((res) => {
        setGames(res.data.games);
      })
      .catch((err) => console.log(err));
  }, [filter, page]);

  return (
    <>
    <Filter filter={filter} setFilter={setFilter}/>
      {games &&
        games.map((game) => <HorizontalGameCard game={game} key={game._id} />)}
      <PageCounter count={10} page={page} setPage={setPage} />
    </>
  );
};

export default GameBrowser;
