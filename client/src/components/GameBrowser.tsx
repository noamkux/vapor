import { FunctionComponent, useEffect, useState } from "react";
import { getGames } from "../services/gamesService";
import Game from "../interfaces/Game";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import Filter from "../widgets/Filter";
import PageCounter from "../widgets/PageCounter";
import { useLocation } from "react-router-dom";
import SearchBar from "../widgets/SearchBar";

interface GameBrowserProps {}

const GameBrowser: FunctionComponent<GameBrowserProps> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let [page, setPage] = useState<number>(
    parseInt(queryParams.get("page") || "1")
  );
  let [limit, setLimit] = useState<number>(
    parseInt(queryParams.get("limit") || "10")
  );
  let [sort, setSort] = useState<string>(
    queryParams.get("sort") || "release_date,desc"
  );
  let [params, setParams] = useState<any>({
    sortingParams: {
      page: page,
      limit: limit,
      sort: sort,
    },
    searchParams: {
      name: queryParams.get("search") || "",
      "type.genres": queryParams.get("genres") || "",
      "type.categories": queryParams.get("categories") || "",
      "type.steamspy_tags": queryParams.get("steamspy_tags") || "",
      price: queryParams.get("price") || "",
    },
  });
  let [total, setTotal] = useState<number>(0);
  let [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setParams({
      sortingParams: {
        page: page,
        limit: limit,
        sort: sort,
      },
      searchParams: {
        name: queryParams.get("search") || "",
        "type.genres": queryParams.get("genres") || "",
        "type.categories": queryParams.get("categories") || "",
        "type.steamspy_tags": queryParams.get("steamspy_tags") || "",
        price: queryParams.get("price") || "",
      },
    });
  }, [location.search, page, sort]);

  useEffect(() => {
    const filteredParams = JSON.parse(
      JSON.stringify(params, (key, value) => (value === "" ? undefined : value))
    );
    getGames(filteredParams)
      .then((res) => {
        setGames(res.data.games);
        setTotal(res.data.total);
      })
      .catch((err) => console.log(err));
  }, [params]);

  return (
    <>
      <SearchBar />
      <Filter userfilter={sort} setFilter={setSort} />
      {games &&
        games.map((game) => <HorizontalGameCard game={game} key={game._id} />)}
      <PageCounter
        count={Math.floor(total / limit)}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default GameBrowser;
