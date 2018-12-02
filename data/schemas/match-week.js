const mongoose = require("mongoose");

const matchWeekSchema = mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: new Date()
    },
    name: String
});
const MatchWeek = mongoose.model("MatchWeek", matchWeekSchema);

module.exports = MatchWeek;