const debug = require("debug")("standen")
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const users = require("./routes/users");
const tournaments = require("./routes/tournaments");
const matches = require("./routes/matches");
const teams = require("./routes/teams");

app.use("/api/users", users);
app.use("/api/tournaments", tournaments);
app.use("/api/tournaments/:id/teams", teams);
app.use("/api/tournaments/:id/matches", matches);

app.use(express.json());
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

mongoose.connect("mongodb://localhost/standen")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("Standen is alive");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
