const express = require("express");
const router = express.Router({mergeParams: true});

const MatchWeek = require("../data/schemas/match-week");

router.get("/", async (req, res) => {
    const weeks = await MatchWeek.find({ tournament: req.params.id });
    
});