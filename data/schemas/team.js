const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    name: String,
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    },
    teamGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teamgroup"
  }
});
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;