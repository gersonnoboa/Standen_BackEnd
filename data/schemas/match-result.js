const mongoose = require("mongoose");
const matchResultSchema = mongoose.Schema({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "match"
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    },
    homeGoals: Number,
    awayGoals: Number,
    homePenaltyGoals: {
        type: Number,
        default: 0
    },
    awayPenaltyGoals: {
        type: Number,
        default: 0
    },
});
const MatchResult = mongoose.model("MatchResult", matchResultSchema);

module.exports = MatchResult;