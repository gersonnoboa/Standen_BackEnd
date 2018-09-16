const express = require("express");
const router = express.Router({mergeParams: true});

const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    name: String,
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    }
});
const Team = mongoose.model("Team", teamSchema);

router.get("/", async (req, res) => {
    console.log("Parameter is", req.params.id);
    const teams = await Team.find({ tournament: req.params.id });
    res.send(teams);
});

router.post("/", async (req, res) => {
    const team = new Team({
        name: req.body.name,
        tournament: req.body.tournament
    });
    const result = await team.save();
    res.send(result);
});

module.exports = router;