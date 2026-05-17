import Login from "./pages/Login";
import LiveMatches from "./pages/LiveMatches";
import Scorecard from "./pages/Scorecard";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import Matches from "./pages/Matches";
import Analytics from "./pages/Analytics";
import MatchDetails from "./pages/MatchDetails";

import React, { useEffect, useState } from "react";

import axios from "axios";

import "./App.css";

function App() {

  // LOGIN CHECK
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // PLAYERS DATA
  const [players, setPlayers] = useState([]);

  // FETCH DATA
  useEffect(() => {

    axios
      .get("http://localhost:5000/players")

      .then((response) => {
        setPlayers(response.data);
      })

      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (

    <BrowserRouter>

      <div className="app-background">

        <div className="container">

          <div className="app-layout">

            {/* SIDEBAR */}

            <div className="sidebar">

              <h2>🏏 Cricket</h2>

              <Link to="/">🏠 Home</Link>

              <Link to="/players">👤 Players</Link>

              <Link to="/teams">🏆 Teams</Link>

              <Link to="/matches">📅 Matches</Link>
              <Link to="/live">🔴 Live Matches</Link>

            </div>

            {/* MAIN CONTENT */}

            <div className="main-content">

              <Routes>

                {/* LOGIN */}

                <Route
                  path="/login"
                  element={<Login />}
                />

                {/* HOME */}

                <Route
                  path="/"
                  element={<Home />}
                />

                {/* PLAYERS */}

                <Route
                  path="/players"

                  element={
                    isLoggedIn ? (
                      <Players players={players} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                {/* TEAMS */}

                <Route
                  path="/teams"
                  element={<Teams />}
                />
                <Route
                 path="/team/:id"
                  element={<TeamDetails />}
                />

                {/* MATCHES */}

                <Route
                  path="/matches"
                  element={<Matches />}
                />
                <Route
                path="/match/:id"
                 element={<MatchDetails />}
                />
                <Route
                  path="/live"
                  element={<LiveMatches />}
                />
                <Route
                  path="/scorecard/:id"
                  element={<Scorecard />}
                />

                {/* ANALYTICS */}

                <Route
                  path="/analytics/:id"
                  element={<Analytics players={players} />}
                />

              </Routes>

            </div>

          </div>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;