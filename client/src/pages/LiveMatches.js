import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LiveMatches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    axios.get(
      "https://api.cricapi.com/v1/currentMatches?apikey=800dda5e-5aab-4042-9a2d-6f561274b094&offset=0"
    )

    .then((response) => {

      let data = response.data.data;

      // FILTERS
      if (filter === "IPL") {

        data = data.filter(
          (match) =>
            match.series &&
            match.series.toLowerCase().includes("ipl")
        );

      }

      else if (filter !== "All") {

        data = data.filter(
          (match) =>
            match.name &&
            match.name.toLowerCase().includes(filter.toLowerCase())
        );

      }

      setMatches(data);

    })

    .catch((error) => {
      console.log(error);
    });

  }, [filter]);

  return (

    <div className="live-page">

      <h1>🏏 Live Matches</h1>

      {/* FILTER BUTTONS */}

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("IPL")}>
          IPL
        </button>

        <button onClick={() => setFilter("India")}>
          India
        </button>

        <button onClick={() => setFilter("Australia")}>
          Australia
        </button>

        <button onClick={() => setFilter("England")}>
          England
        </button>

        <button onClick={() => setFilter("Pakistan")}>
          Pakistan
        </button>

      </div>

      {/* MATCH CARDS */}

      <div className="match-grid">

        {matches.map((match) => (

             <div
                className="match-card"
                key={match.id}
                onClick={() =>
                    navigate(`/scorecard/${match.id}`)
                }
            >

            <h2>{match.name}</h2>

            <p>
              🔴 <strong>Status:</strong> {match.status}
            </p>

            <p>
              <strong>Series:</strong> {match.series}
            </p>

            <p>
              <strong>Type:</strong> {match.matchType}
            </p>

            <p>
              <strong>Venue:</strong> {match.venue}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LiveMatches;