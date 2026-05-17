import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Teams() {

  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("http://localhost:5000/teams")

      .then((response) => {

        setTeams(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div className="teams-page">

      <h1>🏆 Teams Page</h1>

      <div className="teams-grid">

        {teams.map((team) => (

          <div
            className="team-card"
            key={team.team_id}

            onClick={() =>
              navigate(`/team/${team.team_id}`)
            }
          >

            <h2>{team.team_name}</h2>

            <p>
              🌍 Country:
              {" "}
              {team.country}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Teams;