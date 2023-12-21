import { Box, Tabs, Tab } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { getGames } from "../services/gamesService";

interface FilterProps {
  filter :string;
  setFilter : Function;
}

const Filter: FunctionComponent<FilterProps> = ({setFilter}) => {
  const [value, setValue] = useState<string>("release_date,desc");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
    setValue(newValue);
  };

  //   useEffect(() => {
  //     if (value === 0) {
  //       const params = {
  //         page: page,
  //         limit: 10,
  //         sort: "release_date,desc",
  //       };
  //       getGames(params)
  //         .then((res) => {
  //           setGames(res.data.games);
  //           console.log(res.data.games);
  //         })
  //         .catch((err) => console.log(err));
  //     } else if (value === 1) {
  //       const params = {
  //         page: page,
  //         limit: 10,
  //         sort: "stats.average_playtime,desc",
  //       };
  //       getGames(params)
  //         .then((res) => {
  //           setGames(res.data.games);
  //         })
  //         .catch((err) => console.log(err));
  //     } else if (value === 2) {
  //       const params = {
  //         page: page,
  //         limit: 10,
  //         sort: "stats.positive_ratings,desc",
  //       };
  //       getGames(params)
  //         .then((res) => {
  //           setGames(res.data.games);
  //           console.log(res.data.games);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, [value, page]);
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab label="New and Trending" value={"release_date,desc"} />
          <Tab label="Top Seller" value={"stats.average_playtime,desc"} />
          <Tab label="Top Reated" value={"stats.positive_ratings,desc"} />
        </Tabs>
      </Box>
    </>
  );
};

export default Filter;
