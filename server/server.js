const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MYSQL CONNECTION
const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "Sandy@2006",
  database: "cricket_stats"

});

// CONNECT DATABASE
db.connect((err) => {

  if (err) {

    console.log("Database connection failed");
    console.log(err);

  } else {

    console.log("Connected to MySQL");

  }

});


// =========================
// PLAYERS ROUTE
// =========================

app.get("/players", (req, res) => {

  const sql = `

    SELECT
      players.player_id,
      players.player_name,
      teams.team_name,
      player_stats.format_type,
      player_stats.matches_played,
      player_stats.runs,
      player_stats.wickets,
      player_stats.strike_rate

    FROM player_stats

    JOIN players
    ON player_stats.player_id = players.player_id

    JOIN teams
    ON players.team_id = teams.team_id

  `;

  db.query(sql, (err, result) => {

    if (err) {

      res.send(err);

    } else {

      res.send(result);

    }

  });

});


// =========================
// LOGIN ROUTE
// =========================

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM admins WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {

      res.status(500).json(err);

    }

    else if (result.length > 0) {

      res.json({
        success: true,
        message: "Login successful"
      });

    }

    else {

      res.json({
        success: false,
        message: "Invalid email or password"
      });

    }

  });

});


// =========================
// MATCHES ROUTE
// =========================

app.get("/matches", (req, res) => {

  const sql = "SELECT * FROM matches";

  db.query(sql, (err, result) => {

    if (err) {

      res.send(err);

    } else {

      res.send(result);

    }

  });

});

app.get("/scorecards/:id", (req, res) => {

  const matchId = req.params.id;

  const sql = `
    SELECT *
    FROM scorecards
    WHERE match_id = ?
  `;

  db.query(sql, [matchId], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json(err);

    } else {

      res.json(result);

    }

  });

});

app.get("/dashboard", (req, res) => {

  const dashboardQuery = `

    SELECT
      (SELECT COUNT(*) FROM players) AS totalPlayers,

      (SELECT COUNT(DISTINCT team_name)
       FROM teams) AS totalTeams,

      (SELECT COUNT(*) FROM matches) AS totalMatches,

      (SELECT SUM(runs)
       FROM player_stats) AS totalRuns

  `;

  db.query(dashboardQuery, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json(err);

    } else {

      res.json(result[0]);

    }

  });

});

app.get("/top-players", (req, res) => {

  const sql = `

    SELECT
      players.player_name,
      teams.team_name,
      SUM(player_stats.runs) AS total_runs,
      SUM(player_stats.wickets) AS total_wickets,
      AVG(player_stats.strike_rate) AS strike_rate

    FROM player_stats

    JOIN players
    ON player_stats.player_id = players.player_id

    JOIN teams
    ON players.team_id = teams.team_id

    GROUP BY players.player_id

    ORDER BY total_runs DESC

    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json(err);

    } else {

      res.json(result);

    }

  });

});

app.get("/teams", (req, res) => {

  const sql = `
  
    SELECT * FROM teams

  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json(err);

    } else {

      res.json(result);

    }

  });

});

app.get("/team/:id", (req, res) => {

  const { id } = req.params;

  const sql = `

    SELECT
      players.player_id,
      players.player_name,
      teams.team_name,
      player_stats.format_type,
      player_stats.runs,
      player_stats.wickets,
      player_stats.strike_rate

    FROM players

    JOIN teams
    ON players.team_id = teams.team_id

    JOIN player_stats
    ON players.player_id = player_stats.player_id

    WHERE teams.team_id = ?

  `;

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json(err);

    } else {

      res.json(result);

    }

  });

});


// =========================
// SERVER
// =========================

app.listen(5000, () => {

  console.log("Server running on port 5000");

});