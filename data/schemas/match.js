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
    matchWeek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "matchweek"
    },
    startDate: {
        type: Date,
        default: new Date()
    }
});
const Match = mongoose.model("Match", matchSchema);

module.exports = Match;