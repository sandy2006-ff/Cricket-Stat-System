import React from "react";
import { useParams } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics({ players }) {

  const { id } = useParams();

  // FILTER PLAYER DATA
  const playerStats = players.filter(
    (p) => p.player_id.toString() === id
  );

  if (playerStats.length === 0) {
    return <h2>Player Not Found</h2>;
  }

  const player = playerStats[0];

  // TOTAL RUNS
  const totalRuns = playerStats.reduce(
    (sum, p) => sum + p.runs,
    0
  );

  // TOTAL WICKETS
  const totalWickets = playerStats.reduce(
    (sum, p) => sum + p.wickets,
    0
  );

  // CHART DATA
  const chartData = playerStats.map((p) => ({
    format: p.format_type,
    runs: p.runs,
    wickets: p.wickets
  }));

  // BEST FORMAT
  const bestFormat = playerStats.reduce((best, current) =>
    current.runs > best.runs ? current : best
  );

  // PLAYER RANK CALCULATION
  const groupedPlayers = {};

  players.forEach((p) => {

    if (!groupedPlayers[p.player_id]) {

      groupedPlayers[p.player_id] = {
        player_id: p.player_id,
        player_name: p.player_name,
        totalRuns: 0
      };

    }

    groupedPlayers[p.player_id].totalRuns += p.runs;

  });

  const rankedPlayers = Object.values(groupedPlayers)

    .sort((a, b) => b.totalRuns - a.totalRuns);

  const playerRank =
    rankedPlayers.findIndex(
      (p) => p.player_id.toString() === id
    ) + 1;

  return (

    <div className="analytics-page">

      <h1>📊 Player Analytics</h1>

      <div className="analytics-container">

        {/* LEFT CARD */}

        <div className="player-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="player"
            className="player-img"
          />

          <h2>{player.player_name}</h2>

          <p>
            <strong>Team:</strong> {player.team_name}
          </p>

          <p>
            <strong>Total Runs:</strong> {totalRuns}
          </p>

          <p>
            <strong>Total Wickets:</strong> {totalWickets}
          </p>

          <div className="badge">
            🏆 Player Rank #{playerRank}
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="chart-box">

          <h2>Performance By Format</h2>

          {/* MINI STATS */}

          <div className="stats-grid">

            <div className="mini-card">
              <h3>Best Format</h3>
              <p>{bestFormat.format_type}</p>
            </div>

            <div className="mini-card">
              <h3>Strike Rate</h3>
              <p>{player.strike_rate}</p>
            </div>

            <div className="mini-card">
              <h3>Total Formats</h3>
              <p>{playerStats.length}</p>
            </div>

            <div className="mini-card">
              <h3>Player Rank</h3>
              <p>#{playerRank}</p>
            </div>

          </div>

          {/* BAR CHART */}

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={chartData}>

              <XAxis dataKey="format" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="runs"
                fill="#00bfff"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="wickets"
                fill="#ff4d6d"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default Analytics;