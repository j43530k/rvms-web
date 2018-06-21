var axios = require("axios");

module.exports = {
    add: function (req, res) {
        var NodeModel = req.app.get("database").NodeModel;

        var name = req.body.name;
        var ip = req.body.ip;

        axios.post("http://" + ip + ":9090/connection").then((response) => {
            if (response.data.status == "success") {
                var new_node = new NodeModel({
                    name: name,
                    ip: ip
                });
                new_node.save(function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/error");
                    }
                    return res.redirect("/");
                })
            } else {
                return res.redirect("/error");
            }
        }).catch((err) => {
            console.log(err);
            return res.redirect("/error");
        })
    },
    update: function (req, res) {
        var NodeModel = req.app.get("database").NodeModel;

        var node_id = req.body.id;
        var new_name = req.body.name;

        NodeModel.findOne({
            _id: node_id
        }).then(function (node) {
            node.name = new_name;
            node.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.send({
                        status: "error"
                    });
                }
                return res.send({
                    status: "success"
                });
            });
        });
    },
    delete: function (req, res) {
        var NodeModel = req.app.get("database").NodeModel;

        var node_id = req.body.id;

        NodeModel.findOne({
            _id: node_id
        }).then(function (node) {
            axios.delete("http://" + node.ip + ":9090/connection").then((response) => {
                if (response.data.status == "success") {
                    NodeModel.remove({
                        _id: node_id
                    }).then(function (info) {
                        return res.send({
                            status: "success"
                        });
                    });
                } else {
                    return res.send({
                        status: "error"
                    });
                }
            });
        });
    }
};