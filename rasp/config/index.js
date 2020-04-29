var ROUTE_INFO = require("./route_info");
var DB_SCHEMAS = require("./db_schemas");

var config = {
  PORT: 9090,
  DB_URL: "mongodb://localhost:27017/rvms-rasp",
  DB_SCHEMAS,
  // Routing Information [. = /route]
  ROUTE_INFO
};

module.exports = config;
