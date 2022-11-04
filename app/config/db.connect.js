var mysql = require("mysql");
var db = mysql.createConnection({
    host: "bide2oezzo54hc6dshhf-mysql.services.clever-cloud.com",
    user: "u5ciqdvjy0yu3vx4",
    password: "UusrotXHlgNz3ORdsEE",
    database: "bide2oezzo54hc6dshhf",
});
db.connect();
module.exports = db;