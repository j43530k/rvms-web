var node = require("./node");

module.exports = [{
    file: "./main",
    path: "/",
    method: "index",
    type: "GET"
}, {
    file: "./main",
    path: "/nodes/config/:id",
    method: "config",
    type: "GET"
}].concat(node);