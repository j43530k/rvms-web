var axios = require("axios");
var _ = require("lodash");
var fs = require("fs");
var request = require("request");

module.exports = {
    add: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        var name = req.body.name;
        var ip = req.body.ip;

        axios
            .post("http://" + ip + ":9090/connection")
            .then(response => {
                if (response.data.status == "success") {
                    var new_rasp = new RaspModel({
                        name: name,
                        ip: ip
                    });
                    new_rasp.save(function (err) {
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
                } else {
                    return res.send({
                        status: "error"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    },
    list: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        RaspModel.find({})
            .then(async function (rasps) {
                if (rasps == null) {
                    return res.send({
                        status: "success",
                        rasps: []
                    });
                }
                var rasps = [...rasps];
                for (var i = 0; i < rasps.length; i++) {
                    await axios
                        .get("http://" + rasps[i].ip + ":9090/video")
                        .then(response => {
                            if (response.data.status == "success") {
                                rasps[i]._doc.video = response.data.video;
                            }
                        })
                        .catch(err => {
                            rasps.splice(i, 1);
                        });
                }
                return res.send({
                    status: "success",
                    rasps
                });
            })
            .catch(function (err) {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    },
    get: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        var rasp_id = req.params.id;

        RaspModel.findOne({
                _id: rasp_id
            })
            .then(async function (rasp) {
                if (rasp == null) {
                    return res.send({
                        status: "error"
                    });
                }
                await axios
                    .get("http://" + rasp.ip + ":9090/video")
                    .then(response => {
                        if (response.data.status == "success") {
                            rasp._doc.video = response.data.video;
                        }
                    });
                return res.send({
                    status: "success",
                    rasp
                });
            })
            .catch(function (err) {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    },
    rename: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        var rasp_id = req.params.id;
        var new_name = req.body.name;

        RaspModel.findOne({
                _id: rasp_id
            })
            .then(function (rasp) {
                rasp.name = new_name;
                rasp.save(function (err) {
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
            })
            .catch(function (err) {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    },
    changeVideo: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;
        var io = req.app.get("io");

        var file_name = req.file.originalname;
        var rasp_ids = JSON.parse(req.body.ids);

        RaspModel.find({
            _id: {
                $in: rasp_ids
            }
        }).then(async function (rasps) {
            await rasps.forEach((rasp, index) => {
                var fileStream = fs.createReadStream("uploads/" + file_name);
                var fileSize = fs.statSync("uploads/" + file_name).size;
                var formData = {
                    video: fileStream
                };
                res.send({
                    status: "success"
                });
                var r = request
                    .post({
                            url: "http://" + rasp.ip + ":9090/video",
                            formData: formData
                        },
                        function (err, httpResponse, body) {
                            if (err) {
                                console.log(err);
                            }
                            io.sockets.emit("videoUploaded", {
                                rasp
                            });
                            if (index == rasps.length - 1) {
                                fs.readdir("uploads/", function (err, files) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    for (var i = 0; i < files.length; i++) {
                                        if (files[i] != file_name) {
                                            fs.unlink(
                                                "uploads/" + files[i],
                                                function (err) {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                });
                            }
                        }
                    )
                    .on(
                        "drain",
                        _.throttle(() => {
                            io.sockets.emit("uploadedVideoSize", {
                                rasp,
                                size: r.req.connection.bytesWritten,
                                total: fileSize
                            });
                        }, 500)
                    );
            });
        });
    },
    delete: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        var rasp_id = req.params.id;

        RaspModel.findOne({
                _id: rasp_id
            })
            .then(function (rasp) {
                axios
                    .delete("http://" + rasp.ip + ":9090/connection")
                    .then(response => {
                        if (response.data.status == "success") {
                            RaspModel.remove({
                                    _id: rasp_id
                                })
                                .then(function (info) {
                                    return res.send({
                                        status: "success"
                                    });
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    return res.send({
                                        status: "error"
                                    });
                                });
                        } else {
                            return res.send({
                                status: "error"
                            });
                        }
                    });
            })
            .catch(function (err) {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    },
    update: function (req, res) {
        var RaspModel = req.app.get("database").RaspModel;

        var rasp_id = req.params.id;

        RaspModel.findOne({
                _id: rasp_id
            })
            .then(function (rasp) {
                if (rasp == null) {
                    return res.send({
                        status: "error"
                    });
                }
                axios
                    .post("http://" + rasp.ip + ":9090/update")
                    .then(response => {
                        console.log(response.data);
                        if (response.data.status == "success") {
                            return res.send({
                                status: "success"
                            });
                        } else {
                            return res.send({
                                status: "error"
                            });
                        }
                    });
            })
            .catch(function (err) {
                console.log(err);
                return res.send({
                    status: "error"
                });
            });
    }
};