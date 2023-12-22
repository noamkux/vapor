import { TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
    const location = useLocation();

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("search", searchValue);
    navigate({ search: queryParams.toString() });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <TextField
        id="filled-basic"
        label="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        InputLabelProps={{
          sx: { paddingLeft: "10px", color: "white", "&.Mui-focused": { color: "white" } },
        }}
        InputProps={{
          endAdornment: (
            <i
              className="fa-solid fa-search"
              style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
              onClick={handleSearch}
            ></i>
          ),
        }}
        variant="filled"
        sx={{ display: { xs: "flex", md: "none" } }}
      />
    </>
  );
};

export default SearchBar;