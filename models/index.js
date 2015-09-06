var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/laChicMode");
module.exports.User = require("./user");