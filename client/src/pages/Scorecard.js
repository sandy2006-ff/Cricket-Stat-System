import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Scorecard() {

  const { id } = useParams();

  const [match, setMatch] = useState(null);

  useEffect(() => {

    axios.get(
      `https://api.cricapi.com/v1/match_scorecard?apikey=800dda5e-5aab-4042-9a2d-6f561274b094&id=${id}`
    )

    .then((response) => {

      setMatch(response.data.data);

    })

    .catch((error) => {
      console.log(error);
    });

  }, [id]);

  if (!match) {
    return <h2>Loading Scorecard...</h2>;
  }

  // SAMPLE BATTING DATA
  const battingData =
  match.scorecard?.[0]?.batting || [];

const bowlingData =
  match.scorecard?.[0]?.bowling || [];

  // RUN RATE GRAPH
  const runRateData = [
    { over: 1, rate: 6 },
    { over: 5, rate: 8 },
    { over: 10, rate: 9 },
    { over: 15, rate: 10 },
    { over: 20, rate: 11 }
  ];

  return (

    <div className="scorecard-page">

      <h1>🏏 Match Scorecard</h1>

      {/* MATCH HEADER */}

      <div className="score-header">

        <h2>{match.name}</h2>

        <p>{match.status}</p>

        <p>{match.venue}</p>

      </div>

      {/* INNINGS */}

      <div className="innings-grid">

        {match.score?.map((inning, index) => (

          <div className="inning-card" key={index}>

            <h2>{inning.inning}</h2>

            <h1>
              {inning.r}/{inning.w}
            </h1>

            <p>Overs: {inning.o}</p>

          </div>

        ))}

      </div>

      {/* BATTING TABLE */}

      <div className="table-box">

        <h2>🏏 Batting Scorecard</h2>

        <table>

          <thead>

            <tr>
              <th>Batsman</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
            </tr>

          </thead>

          <tbody>

             {battingData.map((player, index) => (

             <tr key={index}>

              <td>{player.batsman?.name}</td>

             <td>{player.r}</td>

                <td>{player.b}</td>

                <td>{player["4s"]}</td>

                <td>{player["6s"]}</td>

                </tr>

            ))}

        </tbody>

        </table>

      </div>

      {/* BOWLING TABLE */}

      <div className="table-box">

        <h2>🎯 Bowling Scorecard</h2>

        <table>

          <thead>

            <tr>
              <th>Bowler</th>
              <th>Overs</th>
              <th>Runs</th>
              <th>Wickets</th>
            </tr>

          </thead>

          <tbody>

             {bowlingData.map((bowler, index) => (

                <tr key={index}>

                <td>{bowler.bowler?.name}</td>

                <td>{bowler.o}</td>

             <td>{bowler.r}</td>

             <td>{bowler.w}</td>

                </tr>

            ))}

        </tbody>

        </table>

      </div>

      {/* RUN RATE CHART */}

      <div className="chart-container">

        <h2>📈 Run Rate Progress</h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={runRateData}>

            <XAxis dataKey="over" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rate"
              stroke="#00bfff"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Scorecard;