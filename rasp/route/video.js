var fs = require("fs");
var {
    exec
} = require("child_process");

module.exports = {
    uploadVideo: function (req, res) {
        var VideoModel = req.app.get("database").VideoModel;

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
    },
    getVideoName: function (req, res) {
        var VideoModel = req.app.get("database").VideoModel;

        VideoModel.findOne({}).then(function (video) {
            res.send({
                status: "success",
                video: video ? video.originalname : ""
            });
        });
    }
};