import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

function TeamDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/team/${id}`)

      .then((response) => {

        // GROUP PLAYERS

        const groupedPlayers = {};

        response.data.forEach((player) => {

          const playerId = player.player_id;

          if (!groupedPlayers[playerId]) {

            groupedPlayers[playerId] = {

              player_id: player.player_id,

              player_name: player.player_name,

              team_name: player.team_name,

              runs: 0,

              wickets: 0,

              strike_rate: 0,

              formats: 0
            };

          }

          groupedPlayers[playerId].runs += player.runs;

          groupedPlayers[playerId].wickets += player.wickets;

          groupedPlayers[playerId].strike_rate +=
            Number(player.strike_rate);

          groupedPlayers[playerId].formats += 1;

        });

        // AVERAGE STRIKE RATE

        const finalPlayers = Object.values(groupedPlayers)

          .map((player) => ({

            ...player,

            strike_rate:
              (
                player.strike_rate /
                player.formats
              ).toFixed(2)

          }));

        setPlayers(finalPlayers);

      })

      .catch((error) => {

        console.log(error);

      });

  }, [id]);

  return (

    <div className="team-details-page">

      <h1>
        🏏 Team Players
      </h1>

      <div className="players-grid">

        {players.map((player) => (

          <div
            className="player-box"
            key={player.player_id}

            onClick={() =>
              navigate(`/analytics/${player.player_id}`)
            }
          >

            <h2>{player.player_name}</h2>

            <p>
              🏆 {player.team_name}
            </p>

            <p>
              🏏 Total Runs:
              {" "}
              {player.runs}
            </p>

            <p>
              🎯 Total Wickets:
              {" "}
              {player.wickets}
            </p>

            <p>
              ⚡ Avg SR:
              {" "}
              {player.strike_rate}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TeamDetails;