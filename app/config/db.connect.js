var mysql = require("mysql");
var db = mysql.createConnection({
    host: "bi77yvas7oynfvj3hdtw-mysql.services.clever-cloud.com",
    user: "ulwv3olykw8mrepz",
    password: "WngDPPBfztGT1n735wxX",
    database: "bi77yvas7oynfvj3hdtw",
});
db.connect();
module.exports = db;