const con = require("../db_con");
const express = require("express");
const router = express.Router();


router.post('/login', (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    // 정적 쿼리 사용법
    const sql = 'SELECT * FROM members WHERE email = ? and pw = ?';
    con.query(sql, [email, pw], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: false
            });
        } else {
            res.json({
                message: result[0].name
            });
        }
    });
});

router.get('/logout', (req, res) => {
    res.json({
        message: true
    });
});

router.post('/insert', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pw = req.body.pw;
    const comments = req.body.comments;
    const sql = "INSERT INTO members (name, email, pw, comments) VALUES (?,?,?,?)";
    con.query(sql, [name, email, pw, comments], (err, result) => {
        if (err) {
            res.json({
                message: false
            });
        } else {
            res.json({
                message: name
            });
        }
    });
});

module.exports = router;