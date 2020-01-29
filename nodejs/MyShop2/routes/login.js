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
        const email = req.body.email
        if (err) throw err;
        con.query(`SELECT name, email FROM members where email='${email}'`, (err, result, fields) => {
            if (err) throw err;
            console.log(result);
            if (result[0]) {
                req.session.email = req.body.email;
                req.session.name = req.body.name;
                message = `${result[0].name} 어서오세요`;
            } else {
                message = "login fail";
            }
            res.json({
                message
            });
        });
    });

    //회원정보 확인 (메모리에서)
    /*let message;
    for (let i = 0; i < members.length; i++) {
        if (members[i].email == req.body.email) {
            req.session.email = req.body.email;
            message = "login ok";
            break;
        }
    }
    if (!message) {
        message = "login fail";
    }
    res.json({
        message
    });*/
});

module.exports = router;