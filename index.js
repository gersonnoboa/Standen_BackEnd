const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Standen is alive");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});