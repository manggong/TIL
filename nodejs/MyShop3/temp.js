var mysql = require('mysql');

const con = mysql.createConnection({
  port: "3307",
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs"
});

con.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");

    sql="INSERT INTO members (name, email, comments) VALUES ('a','b','c')";
    con.query(sql, (err, result)=>{
      if (err) throw err;
      console.log("1 INSERTED");
    });
});