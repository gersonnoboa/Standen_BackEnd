const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const tournamentSchema = mongoose.Schema({
    name: String
});
const Tournament = mongoose.model("Tournament", tournamentSchema);

const teams = require("./teams")
router.use("/:id/teams", teams);

router.get("/", async (req, res) => {
    const tournaments = await Tournament.find();
    res.send(tournaments);
});

router.post("/", async (req, res) => {
    const tournament = new Tournament({
        name: req.body.name
    });
    const result = await tournament.save();
    res.send(result);
});

module.exports = router;