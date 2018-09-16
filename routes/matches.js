const express = require("express");
const router = express.Router({mergeParams: true});

const mongoose = require("mongoose");
const matchSchema = mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team"
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team"
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    },
    startDate: {
        type: Date,
        default: new Date()
    }
});
const Match = mongoose.model("Match", matchSchema);

router.get("/", async (req, res) => {
    const matches = await Match.find({ tournament: req.params.id });
    res.send(matches);
});

router.post("/", async (req, res) => {
    const match = new Match({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        tournament: req.body.tournament
    });
    const result = await match.save();
    res.send(result);
});

module.exports = router;