const express = require("express");
const router = express.Router({mergeParams: true});

const MatchResult = require("../data/schemas/match-result");

router.get("/", async (req, res) => {
    const results = await MatchResult.find({ match: req.params.mid });
    if (results.length > 0) { res.send(results[results.length - 1])}
    res.send(results);
});

router.post("/", async (req, res) => {
    const matchResult = new MatchResult({
        homeGoals: req.body.homeGoals,
        awayGoals: req.body.awayGoals,
        homePenaltyGoals: req.body.homePenaltyGoals,
        awayPenaltyGoals: req.body.awayPenaltyGoals,
        match: req.params.mid,
        tournament: req.params.id
    });
    const result = await matchResult.save();
    res.send(result);
});

module.exports = router;