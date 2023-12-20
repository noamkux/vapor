import { useEffect, useState } from "react";
import "./App.css";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import { getGamesByPage } from "./services/gamesService";
import Game from "./interfaces/Game";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/HomePage";
import GamePage from "./scenes/GamePage";

function App() {
  const { theme } = useThemeContext();

  return (
    <div className="App" style={{ height: "200rem" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
