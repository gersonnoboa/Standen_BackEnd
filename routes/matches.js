const express = require("express");
const router = express.Router({mergeParams: true});

const Match = require("../data/schemas/match");

router.get("/", async (req, res) => {
    const matches = await Match.find({ tournament: req.params.id });
    res.send(matches);
});

router.post("/", async (req, res) => {
    const match = new Match({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        tournament: req.params.id
    });
    const result = await match.save();
    res.send(result);
});

module.exports = router;