const debug = require("debug")("standen")
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");

const users = require("./routes/users");
const tournaments = require("./routes/tournaments");
const matches = require("./routes/matches");
const teams = require("./routes/teams");
const matchResults = require("./routes/match-results");
const standings = require("./routes/standings");
const teamGroups = require("./routes/team-groups");

app.use(express.json());
app.use(helmet());

app.use("/api/users", users);
app.use("/api/tournaments", tournaments);
app.use("/api/tournaments/:id/groups", teamGroups);
app.use("/api/tournaments/:id/groups/:gid/teams", teams);
app.use("/api/tournaments/:id/matches", matches);
app.use("/api/tournaments/:id/standings", standings);
app.use("/api/tournaments/:id/matches/:mid/result", matchResults);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

mongoose.connect(config.get("db_connection_string"))
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("Standen is alive");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
