import { Box, Tabs, Tab } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { getGames } from "../services/gamesService";

interface FilterProps {
  userfilter :string;
  setFilter : Function;
}

const Filter: FunctionComponent<FilterProps> = ({setFilter,}) => {
  const [value, setValue] = useState<string>("release_date,desc");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    
    setFilter(newValue);
    setValue(newValue);
  };


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
