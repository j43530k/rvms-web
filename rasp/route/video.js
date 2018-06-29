var fs = require("fs");
var {
    exec
} = require("child_process");

module.exports = {
    uploadVideo: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;
        var VideoModel = req.app.get("database").VideoModel;

        var ip;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else {
            ip = req.ip;
        }

        ConnModel.findOne({}).then(function (conn) {
            if (conn && conn.ip == ip) {
                exec("killall omxplayer.bin");
                VideoModel.remove({}).exec();
                fs.readdir("uploads/", function (err, files) {
                    if (err) {
                        console.log(err);
                        res.send({
                            status: "error"
                        });
                    }

                    for (var i = 0; i < files.length; i++) {
                        if (files[i] != req.file.filename) {
                            fs.unlink("uploads/" + files[i], function (err) {
                                if (err) {
                                    console.log(err);
                                    res.send({
                                        status: "error"
                                    });
                                }
                            });
                        }
                    }
                });
                var new_video = new VideoModel({
                    name: req.file.filename,
                    originalname: req.file.originalname
                });
                new_video.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.send({
                            status: "error"
                        });
                    }

                    exec(
                        "omxplayer --aspect-mode fill --loop uploads/" +
                        req.file.filename
                    );
                    res.send({
                        status: "success"
                    });
                });
            } else {
                res.send({
                    status: "forbidden"
                });
            }
        });
    },
    getVideoName: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;
        var VideoModel = req.app.get("database").VideoModel;

        var ip;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else {
            ip = req.ip;
        }

        ConnModel.findOne({}).then(function (conn) {
            if (conn && conn.ip == ip) {
                VideoModel.findOne({}).then(function (video) {
                    res.send({
                        status: "success",
                        video: video ? video.originalname : ""
                    });
                });
            } else {
                res.send({
                    status: "forbidden"
                });
            }
        });
    }
};