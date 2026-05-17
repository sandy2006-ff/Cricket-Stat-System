import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [dashboard, setDashboard] = useState({});
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/dashboard")

      .then((response) => {

        setDashboard(response.data);

      });

    axios
      .get("http://localhost:5000/top-players")

      .then((response) => {

        setTopPlayers(response.data);

      });

  }, []);

  return (

    <div className="home-page">

      <h1 className="dashboard-title">
        🏏 Cricket Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome to Cricket Analytics Platform
      </p>

      {/* DASHBOARD CARDS */}

      <div className="stats-container">

        <div className="stat-card">

          <h1>{dashboard.totalPlayers}+</h1>

          <p>Total Players</p>

        </div>

        <div className="stat-card">

          <h1>{dashboard.totalTeams}</h1>

          <p>Total Teams</p>

        </div>

        <div className="stat-card">

          <h1>{dashboard.totalMatches}</h1>

          <p>Matches Played</p>

        </div>

        <div className="stat-card">

          <h1>{dashboard.totalRuns}+</h1>

          <p>Total Runs</p>

        </div>

      </div>

      {/* TOP PLAYERS */}

      <div className="leaderboard-section">

        <h2>🔥 Top Players Leaderboard</h2>

        <table className="leaderboard-table">

          <thead>

            <tr>

              <th>Rank</th>
              <th>Player</th>
              <th>Team</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Strike Rate</th>

            </tr>

          </thead>

          <tbody>

            {topPlayers.map((player, index) => (

              <tr key={index}>

                <td>#{index + 1}</td>

                <td>{player.player_name}</td>

                <td>{player.team_name}</td>

                <td>{player.total_runs}</td>

                <td>{player.total_wickets}</td>

                <td>
                  {Number(player.strike_rate).toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Home;