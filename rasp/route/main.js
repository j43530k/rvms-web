var ip = require("ip");

module.exports = {
    index: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;
        var VideoModel = req.app.get("database").VideoModel;

        ConnModel.findOne({}).then(function (conn) {
            VideoModel.findOne({}).then(function (video) {
                res.render("index", {
                    info: {
                        ip: ip.address("public"),
                        server: conn.ip,
                        video_name: video.originalname
                    }
                });
            })
        })
    }
};