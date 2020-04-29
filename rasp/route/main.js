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
                        server: (conn) ? (conn.ip) : ("연결된 서버 없음"),
                        video_name: (video) ? (video.originalname) : ("재생 중인 영상 없음")
                    }
                });
            });
        });
    }
};