import { useEffect, useState } from "react";
import "./App.css";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import { getGamesByPage } from "./services/gamesService";
import Game from "./interfaces/Game";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import BrowserPage from "./pages/BrowserPage";

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
            <Route path="/browser" element={<BrowserPage/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
