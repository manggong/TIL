const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port: 3307,
    database: "nodejs"
});

con.connect((err) => {
    if (err) throw err;
    console.log("db connected");
    con.query("SELECT email FROM members", (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
});