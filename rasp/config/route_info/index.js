module.exports = [{
    file: "./main",
    path: "/",
    method: "index",
    type: "GET"
}, {
    file: "./connection",
    path: "/connection",
    method: "createConnection",
    type: "POST"
}, {
    file: "./connection",
    path: "/connection",
    method: "deleteConnection",
    type: "DELETE"
}, {
    file: "./video",
    path: "/video",
    method: "get",
    type: "GET"
}, {
    file: "./video",
    path: "/video",
    upload: "video",
    method: "uploadVideo",
    type: "POST"
}]