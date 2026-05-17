import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Players({ players = [] }) {

  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("All");

  const navigate = useNavigate();

  let filteredPlayers = [];

  // ALL FORMATS COMBINED
  if (format === "All") {

    const groupedPlayers = {};

    players.forEach((player) => {

      const id = player.player_id;

      if (!groupedPlayers[id]) {

        groupedPlayers[id] = {
          player_id: player.player_id,
          player_name: player.player_name,
          team_name: player.team_name,
          format_type: "All",
          runs: 0,
          wickets: 0,
          strike_rate: 0,
          matches: 0
        };

      }

      groupedPlayers[id].runs += Number(player.runs);

      groupedPlayers[id].wickets += Number(player.wickets);

      groupedPlayers[id].strike_rate += Number(player.strike_rate);

      groupedPlayers[id].matches += 1;

    });

    filteredPlayers = Object.values(groupedPlayers)

      .map((player) => ({
        ...player,

        // AVERAGE STRIKE RATE
        strike_rate: (
          player.strike_rate / player.matches
        ).toFixed(2)

      }))

      .filter((player) =>
        player.player_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  }

  // SINGLE FORMAT
  else {

    filteredPlayers = players.filter((player) => {

      const matchesSearch =
        player.player_name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFormat =
        player.format_type.toLowerCase() ===
        format.toLowerCase();

      return matchesSearch && matchesFormat;

    });

  }

  return (

    <div className="players-page">

      <h1>🏏 CRICKET PLAYERS DASHBOARD</h1>

      {/* SEARCH + FILTER */}

      <div className="table-controls">

        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="search"
        >
          <option value="All">All Formats</option>
          <option value="ODI">ODI</option>
          <option value="T20">T20</option>
          <option value="Test">Test</option>
        </select>

      </div>

      {/* TABLE */}

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Player</th>
            <th>Team</th>
            <th>Format</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Strike Rate</th>
          </tr>

        </thead>

        <tbody>

          {filteredPlayers.map((player) => (

            <tr
              key={player.player_id + player.format_type}

              onClick={() =>
                navigate(`/analytics/${player.player_id}`)
              }

              style={{ cursor: "pointer" }}
            >

              <td>{player.player_id}</td>

              <td>{player.player_name}</td>

              <td>{player.team_name}</td>

              <td>{player.format_type}</td>

              <td>{player.runs}</td>

              <td>{player.wickets}</td>

              <td>{player.strike_rate}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Players;