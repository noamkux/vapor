import { Box, Button, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQueryParams } from "../services/queryService";

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




  let navigate = useNavigate();
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
    <Box pt={"40px"} pb={"50px"} bgcolor={"transparent"}>
      <Typography variant="h3" textAlign={"center"}>
        Browse By Genres
      </Typography>
      <Grid container spacing={2} textAlign={"center"} p={"10px"}>
        {genresList.map((genre, i) => (
          <Grid item xs={xs} key={i}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              key={i}
              onClick={() => navigate(`/browser/?genres=${genre}`)}
            >
              <Typography
                variant="body1"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {genre}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenresButtons;
