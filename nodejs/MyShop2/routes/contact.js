const mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        port: 3307,
        database: "nodejs"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
        //회원가입 처리
        const name = req.body.name;
        const email = req.body.email;
        const comments = req.body.comments;
        const sql = `INSERT INTO members (name,email,comments) VALUES ('${name}', '${email}', '${comments}')`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log("insert failed");
                res.json({
                    message: "회원가입 실패!!!"
                });
            } else {
                console.log("1 record inserted");
                res.json({
                    message: "회원가입 되었습니다"
                });
            }
        });
    });
});

module.exports = router;