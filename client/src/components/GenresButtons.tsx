import { Box, Button, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";

interface GenresButtonsProps {
  size: "small" | "medium" | "large";
  xs: number;
}

const GenresButtons: FunctionComponent<GenresButtonsProps> = ({ size, xs }) => {
  let genres = [
    "Action",
    "Adventure",
    "Strategy",
    "Racing",
    "Free to Play",
    "RPG",
    "Indie",
    "Casual",
    "Massively Multiplayer",
    "Simulation",
    "Sports",
    "Violent",
  ];

  let [genresList, setGenresList] = useState<string[]>(genres);

  useEffect(() => {
    switch (size) {
      case "small":
        setGenresList(genres.slice(0, 4));
        break;
      case "medium":
        setGenresList(genres.slice(0, 8));
        break;
      case "large":
        setGenresList(genres);
        break;
      default:
        break;
    }
  }, [size]);

  return (
    <Box mt={"40px"} pb={"50px"}>
      <Typography variant="h3" textAlign={"center"}>
        Browse By Genres
      </Typography>
      <Grid container spacing={2} textAlign={"center"} p={"10px"}>
        {genresList.map((category, i) => (
          <Grid item xs={xs} key={i}>
            <Button variant="contained" fullWidth size="large" key={i}>
              <Typography
                variant="body1"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {category}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenresButtons;
