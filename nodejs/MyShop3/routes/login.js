const express = require('express');
const login = express.Router();

const con = require('./mysql_con');

login.post('/', (req, res) => {
    let message = "Id와 password를 확인하세요";
    const id = req.body.email;
    con.query(`SELECT * FROM members WHERE email='${id}'`, (err, result) => {
        if (err) {
            console.log("login Fail", err);
            message = "login error";
        } else if (result[0]) {
            req.session.uid = id;
            req.session.name = result[0].name;
            req.session.uno = result[0].number;
            message = result[0].name + "님 login okay";
        }
        res.json({
            message
        });
    });
});

module.exports = login;