const express = require("express");
const router = express.Router({mergeParams: true});

const TeamGroup = require("../data/schemas/team-group");
const Team = require("../data/schemas/team");

const DisplayTeamGroups = require("../data/models/display-team-groups");

router.get("/", async (req, res) => {
    const teamGroups = await TeamGroup.find({ tournament: req.params.id });
    res.send(teamGroups);
});

router.get("/:gid", async (req, res) =>  {
    const teams = await Team.find({ tournament: req.params.id, teamGroup: req.params.gid });
    res.send(teams);
});

router.get("/for/display", async (req, res) => {
    const teams = await Team
    .find({ tournament: req.params.id })
    .populate(getPopulateObject())
    .select("_id name tournament")

    var teamGroups = new DisplayTeamGroups();

    teams.forEach(team => {
        let teamGroup = team.teamGroup;
        teamGroups.addTeamToGroup(team, teamGroup);
    });
    

    res.send(teamGroups.groups);
});

router.post("/", async (req, res) => {
    const teamGroup = new TeamGroup({
        name: req.body.name,
        tournament: req.params.id
    });

    const result = await teamGroup.save();
    res.send(result);
});

function getPopulateObject() {
    return {
        path: "teamGroup",
        model: TeamGroup,
        select: "name _id"
    }
}

module.exports = router;