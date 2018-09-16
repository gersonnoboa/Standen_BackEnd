const express = require("express");

const router = express.Router({mergeParams: true});

const Team = require("../data/schemas/team");
const Match = require("../data/schemas/match");
const MatchResult = require("../data/schemas/match-result");

router.get("/", async (req, res) => {
    const results = await MatchResult
    .find({ tournament: req.params.id })
    .populate(getPopulateObject())
    .select("homeGoals awayGoals match")
    .catch(err => res.status(500).send(err));

    var standings = new Standings();

    results.forEach(result => {
        standings.calculateMatchOutcome(result);
    });

    res.status(200).send(standings);
}); 

function getPopulateObject() {
    return {
        "path": "match", 
        model: Match, 
        select: "homeTeam awayTeam",
        populate: [{
            "path": "homeTeam", 
            model: Team,
            select: "name"
        }, {
            "path": "awayTeam",
            model: Team,
            select: "name"
        }]
    };
} 
module.exports = router;

class StandingTeam {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.victories = 0;
        this.losses = 0;
        this.ties = 0;
        this.goalsFor = 0;
        this.goalsAgainst = 0;
        this.goalDifference = 0;
    }

    registerVictory(goalsFor, goalsAgainst) {
        this.victories++;
        this.points += 3;
        this.registerGoals(goalsFor, goalsAgainst);
    }

    registerLoss(goalsFor, goalsAgainst) {
        this.losses++;
        this.registerGoals(goalsFor, goalsAgainst);
    }

    registerTie(goalsFor, goalsAgainst) {
        this.ties++;
        this.points++;
        this.registerGoals(goalsFor, goalsAgainst);
    }

    registerGoals(goalsFor, goalsAgainst) {
        this.goalsFor += goalsFor;
        this.goalsAgainst += goalsAgainst;
        this.goalDifference = this.getGoalDifference();
    }

    getGoalDifference() {
        return this.goalsFor - this.goalsAgainst;
    }
}

class Standings {
    constructor() {
        this.teams = [];
    }

    calculateMatchOutcome(matchResult) {
        const homeTeam = this.getHomeTeam(matchResult);
        const homeTeamScore = matchResult.homeGoals;

        const awayTeam = this.getAwayTeam(matchResult);
        const awayTeamScore = matchResult.awayGoals;

        if (homeTeamScore > awayTeamScore) {
            homeTeam.registerVictory(homeTeamScore, awayTeamScore);
            awayTeam.registerLoss(awayTeamScore, homeTeamScore);
        } else if (homeTeamScore < awayTeamScore) {
            awayTeam.registerVictory(awayTeamScore, homeTeamScore);
            homeTeam.registerLoss(homeTeamScore, awayTeamScore);
        } else {
            homeTeam.registerTie(homeTeamScore, awayTeamScore);
            awayTeam.registerTie(awayTeamScore, homeTeamScore);
        }
    }

    getHomeTeam(matchResult) {
        var team = this.teams.find( element => {
            return element.name == matchResult.match.homeTeam.name
        });

        if (!team) {
            team = new StandingTeam(matchResult.match.homeTeam.name);
            this.teams.push(team);
        }

        return team;
    }

    getAwayTeam(matchResult) {
        var team = this.teams.find( element => {
            return element.name == matchResult.match.awayTeam.name;
        });

        if (!team) {
            team = new StandingTeam(matchResult.match.awayTeam.name);
            this.teams.push(team);
        }

        return team;
    }
}