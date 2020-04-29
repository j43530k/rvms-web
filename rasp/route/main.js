var ip = require("ip");

module.exports = {
    index: function (req, res) {
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
                    res.render("index", {
                        info: {
                            ip: ip.address("public"),
                            server: conn.ip,
                            video_name: video.originalname
                        }
                    });
                })
            } else {
                res.render("index", {
                    info: {
                        ip: ip.address("public"),
                        server: "연결되지 않음",
                        video_name: "재생 중인 동영상 없음"
                    }
                });
            }
        })
    }
};