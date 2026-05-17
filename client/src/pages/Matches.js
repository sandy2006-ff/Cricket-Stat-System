import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Matches() {
  
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/matches")

      .then((response) => {

        setMatches(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div className="matches-page">

      <h1>🏏 Match History</h1>

      <div className="match-grid">

        {matches.map((match) => (

          <div
            className="match-card"
            key={match.match_id}

                onClick={() =>
                navigate(`/match/${match.match_id}`,
               {
              state: match
               }
              )
            }

            style={{ cursor: "pointer" }}
          >
            <h2>
              {match.team1} vs {match.team2}
            </h2>

            <p>
              📍 {match.venue}
            </p>

            <p>
              🏆 {match.match_type}
            </p>

            <p>
              📅 {new Date(match.match_date)
                .toLocaleDateString()}
            </p>

            <p className="completed-status">
              ✅ {match.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Matches;