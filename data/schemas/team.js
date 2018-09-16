const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    name: String,
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    }
});
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;