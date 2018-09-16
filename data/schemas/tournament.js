const mongoose = require("mongoose");
const tournamentSchema = mongoose.Schema({
    name: String
});
const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;