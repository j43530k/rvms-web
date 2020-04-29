module.exports = {
    createConnection: async function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;
        var error = false;

        await ConnModel.count({}).then(function (count) {
            if (count > 0) {
                error = true;
                return res.send({
                    status: "error",
                    message: "이미 연결이 존재합니다."
                });
            }
        })
        if (error) {
            return;
        }

        var ip;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else {
            ip = req.ip;
        }

        var new_conn = new ConnModel({
            ip: ip
        });
        new_conn.save(function (err) {
            if (err) {
                console.log(err);
                return res.send({
                    status: "error",
                    message: "데이터베이스에 저장 실패."
                });
            }
            return res.send({
                status: "success"
            });
        })
    },
    deleteConnection: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;

        var ip;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else {
            ip = req.ip;
        }

        ConnModel.count({
            ip: ip
        }).then(function (count) {
            if (count == 1) {
                ConnModel.remove({
                    ip: ip
                }).then(function (info) {
                    return res.send({
                        status: "success"
                    });
                });
            } else {
                return res.send({
                    status: "error",
                    message: "연결 없음."
                });
            }
        })
    },
    forceDeleteConnection: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;

        var key = req.body.key;

        if (key == "dsmchangui#1") {
            ConnModel.remove({}).exec(function () {
                return res.send({
                    status: "success"
                });
            });
        } else {
            return res.send({
                status: "forbidden"
            });
        }
    }
};