const express = require("express");
const router = express.Router({mergeParams: true});

const Team = require("../data/schemas/team");

router.get("/", async (req, res) => {
    const teams = await Team.find({ tournament: req.params.id });
    res.send(teams);
});

router.post("/", async (req, res) => {
    const team = new Team({
        name: req.body.name,
        tournament: req.params.id,
        teamGroup: req.params.gid
    });
    const result = await team.save();
    res.send(result);
});

module.exports = router;