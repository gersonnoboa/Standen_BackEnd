const mongoose = require("mongoose");
const teamGroupSchema = mongoose.Schema({
    name: String,
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tournament"
  }
});
const TeamGroup = mongoose.model("TeamGroup", teamGroupSchema);

module.exports = TeamGroup;