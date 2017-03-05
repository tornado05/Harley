var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Users");

mongoose.set("debug", true);

module.exports.User = require("./userModel");