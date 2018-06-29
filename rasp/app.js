var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressErrorHandler = require("express-error-handler");
var session = require("express-session");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);
var socketio = require("socket.io");
var cors = require("cors");
var flash = require("connect-flash");
var fs = require("fs");
var path = require('path');
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname))
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if ([".mkv", ".wmv", ".mov", ".mp4", ".avi", ".m4a"].includes(path.extname(file.originalname).toLowerCase())) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

var app = express();
var config = require("./config");
var database = require("./database");
var router = require("./route")(express.Router(), upload);
var server = require("http").Server(app);
var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {
    console.log("[ ] Connection info : ", socket.request.connection._peername);
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;

    socket.on("message", function (message) {
        console.log("[ ] Received message event.");
        console.dir(message);
        if (message.recepient == "ALL") {
            console.log("[ ] Message Broadcasted");
            io.sockets.emit("message", message);
        }
    });

    socket.on("disconnect", function () {
        console.log(
            "[ ] Disconnected connection : " +
            socket.remoteAddress +
            ":" +
            socket.remotePort
        );
    });
});

app.set("initVideo", function () {
    app.get("database").VideoModel.findOne({}).then(function (video) {
        if (video) {
            var {
                exec
            } = require("child_process");
            exec(
                "omxplayer --aspect-mode fill --loop uploads/" +
                video.name
            );
            exec("xrefresh");
        }
    });
});

database.init(app, config);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: "D5MR@SP83RRYP!",
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: database.conn
        })
    })
);
app.use(express.static("public"));
app.use(flash());
app.use(cors());
app.use("/", router);
app.use(expressErrorHandler.httpError(404));
app.use(
    expressErrorHandler({
        static: {
            "404": "./public/404.html"
        }
    })
);

server.listen(config.PORT, function () {
    console.log("[+] (app) Server started at port " + config.PORT);
});