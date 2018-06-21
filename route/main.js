var ip = require("ip");
var axios = require("axios");
var config = require("../config");

module.exports = {
    index: function (req, res) {
        var NodeModel = req.app.get("database").NodeModel;

        NodeModel.findAll().then(async function (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                await axios.get("http://" + nodes[i].ip + ":9090/video").then(response => {
                    nodes[i].video = response.data.video;
                });
            }
            res.render("index", {
                nodes
            });
        });
    },
    config: function (req, res) {
        var NodeModel = req.app.get("database").NodeModel;

        var node_id = req.params.id;

        NodeModel.findOne({
            _id: node_id
        }).then(async function (node) {
            await axios.get("http://" + node.ip + ":9090/video").then(response => {
                node.video = response.data.video;
            });
            res.render("config", {
                node,
                local: {
                    ip: ip.address(),
                    port: config.PORT
                }
            })
        })
    }
};