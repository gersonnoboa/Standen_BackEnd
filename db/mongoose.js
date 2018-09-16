const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://localhost/standen")
    .then(() => console.log("connected"))
    .catch(err => console.error(err))
};