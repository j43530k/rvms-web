var {
    exec
} = require("child_process");

module.exports = {
    update: function (req, res) {
        var ConnModel = req.app.get("database").ConnModel;

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
                exec("git pull origin master", function (err, stdout, stderr) {
                    console.log(stdout);
                    if (err) {
                        console.log(stderr);
                        res.send({
                            status: "error"
                        });
                    } else {
                        res.send({
                            status: "success"
                        });
                        exec("pm2 reload rvms-rasp");
                    }
                });
            } else {
                res.send({
                    status: "forbidden"
                });
            }
        });
    }
};