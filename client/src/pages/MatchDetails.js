import React, { useEffect, useState } from "react";

import {
  useParams,
  useLocation
} from "react-router-dom";

import axios from "axios";

function MatchDetails() {

  const { id } = useParams();

  const location = useLocation();

  const match = location.state;

  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/scorecards/${id}`)

      .then((response) => {

        console.log(response.data);

        setScorecards(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, [id]);

  if (!match) {

    return <h1>No Match Data Found</h1>;

  }

  const team1Players = scorecards.filter(
    (player) => player.team_name === match.team1
  );

  const team2Players = scorecards.filter(
    (player) => player.team_name === match.team2
  );

  return (

    <div className="match-details-page">

      <div className="scorecard-container">

        <h1>🏏 Full Scorecard</h1>

        <div className="match-header">

          <h2>
            {match.team1} vs {match.team2}
          </h2>

          <p className="match-result">
            🏆 {match.result}
          </p>

        </div>

        {/* TEAM 1 */}

        <div className="innings-card">

          <h2>{match.team1} Innings</h2>

          <table>

            <thead>

              <tr>

                <th>Batter</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>

              </tr>

            </thead>

            <tbody>

              {team1Players.map((player) => (

                <tr key={player.scorecard_id}>

                  <td>{player.batter_name}</td>

                  <td>{player.runs}</td>

                  <td>{player.balls}</td>

                  <td>{player.fours}</td>

                  <td>{player.sixes}</td>

                  <td>{player.strike_rate}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* TEAM 2 */}

        <div className="innings-card">

          <h2>{match.team2} Innings</h2>

          <table>

            <thead>

              <tr>

                <th>Batter</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>

              </tr>

            </thead>

            <tbody>

              {team2Players.map((player) => (

                <tr key={player.scorecard_id}>

                  <td>{player.batter_name}</td>

                  <td>{player.runs}</td>

                  <td>{player.balls}</td>

                  <td>{player.fours}</td>

                  <td>{player.sixes}</td>

                  <td>{player.strike_rate}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default MatchDetails;