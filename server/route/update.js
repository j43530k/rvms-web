var {
    exec
} = require("child_process");

module.exports = {
    update: function (req, res) {
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
                exec("npm install", function (err, stdout, stderr) {
                    console.log(stdout);
                    if (err) {
                        console.log(stderr);
                        res.send({
                            status: "error"
                        });
                    } else {
                        exec("pm2 reload rvms-web");
                    }
                });
            }
        });
    }
};