const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const tournamentSchema = mongoose.Schema({
    name: String
});
const Tournament = mongoose.model("Tournament", tournamentSchema);

const teamSchema = mongoose.Schema({
    name: String,
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    }
});
const Team = mongoose.model("Team", teamSchema);

router.get("/", async (req, res) => {
    const tournaments = await Tournament.find();
    res.send(tournaments);
});

router.get("/:id/teams", async (req, res) => {
    const teams = await Team.find({ tournament: req.params.id });
    res.send(teams);
});

router.post("/", async (req, res) => {
    const tournament = new Tournament({
        name: req.body.name
    });
    const result = await tournament.save();
    res.send(result);
});

router.post("/:id/teams", async (req, res) => {
    const team = new Team({
        name: req.body.name,
        tournament: req.body.tournament
    });
    const result = await team.save();
    res.send(result);
});

module.exports = router;