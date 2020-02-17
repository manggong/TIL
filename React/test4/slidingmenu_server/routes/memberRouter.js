const con = require("../db_con");
const express = require("express");
const router = express.Router();
const User = require('../models').User;
const {
    getAllPosts
} = require('./common');

/* router.post('/login', (req, res) => {
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
}); */

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.pw;
    try {
        const result = await User.findOne({
            where: {
                email,
                password
            }
        });
        //console.log(result.nick)
        res.json({
            message: result.nick,
            id: result.id,
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.get('/logout', (req, res) => {
    res.json({
        message: true
    });
});

/* router.post('/insert', (req, res) => {
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
}); */

router.post('/insert', async (req, res) => {
    const nick = req.body.name;
    const email = req.body.email;
    const password = req.body.pw;
    const comments = req.body.comments;
    try {
        const result = await User.create({
            email,
            nick,
            password
        });
        console.log(result);
        res.json({
            message: nick
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

module.exports = router;