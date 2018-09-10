const debug = require("debug")("standen")
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(helmet());

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