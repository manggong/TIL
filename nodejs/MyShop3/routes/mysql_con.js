const mysql = require("mysql");

const con = mysql.createConnection({
    port: "3307",
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
});

module.exports = con;