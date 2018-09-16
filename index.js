const debug = require("debug")("standen")
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

const users = require("./routes/users");
app.use(express.json());
app.use(helmet());
app.use("/api/users", users);
app.use("/api/tournaments", users);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.send("Standen is alive");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});