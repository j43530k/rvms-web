var fs = require("fs");
var {
    exec
} = require('child_process');

module.exports = {
    uploadVideo: function (req, res) {
        var VideoModel = req.app.get("database").VideoModel;

        VideoModel.find({}).then(function (videos) {
            for (var i = 0; i < videos.length; i++) {
                var video_name = videos[i].name
                fs.unlink('uploads/' + video_name, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    VideoModel.remove({
                        name: video_name
                    }).exec();
                });
            }
        });
        console.log(req.file);
        var new_video = new VideoModel({
            name: req.file.filename,
            originalname: req.file.originalname
        });
        new_video.save(function (err) {
            if (err) {
                console.log(err);
                res.redirect(req.body.failureurl);
            }
            exec("open /Applications/Movist.app uploads/" + req.file.filename);
            res.redirect(req.body.successurl);
        });
    },
    get: function (req, res) {
        var VideoModel = req.app.get("database").VideoModel;

        VideoModel.findOne({}).then(function (video) {
            res.send({
                video: video.originalname
            })
        });
    }
};