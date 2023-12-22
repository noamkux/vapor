import { Paper } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Filter from "../widgets/Filter";
import GameBrowser from "../components/GameBrowser";
import HorizontalGameCard from "../widgets/HorizontalGameCard";
import Game from "../interfaces/Game";

interface BrowserPageProps {}

const BrowserPage: FunctionComponent<BrowserPageProps> = () => {
  

  return (
    <>
      <Paper
        className="gradient-LibraryBackground"
        sx={{
          height: "100vh",
        }}
      >
        <GameBrowser />
      </Paper>
    </>
  );
};

export default BrowserPage;
