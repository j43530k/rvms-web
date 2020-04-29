var connection = require("./connection");
var main = require("./main");
var video = require("./video");
var update = require("./update");

module.exports = [].concat(connection).concat(main).concat(video).concat(update);