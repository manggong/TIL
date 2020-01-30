const express = require('express');
const contactrouter = express.Router();

const con = require('./mysql_con');

contactrouter.post('/', (req, res) => {

    sql = `INSERT INTO members (name, email, comments) VALUES ('${req.body.name}', '${req.body.email}','${req.body.comments}')`;
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Insert Fail", err);
            res.json({
                message: "회원가입실패"
            });
        } else {
            console.log("1 Inserted");
            res.json({
                message: "okay"
            });
        }
    });
});

module.exports = contactrouter;