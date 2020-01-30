const express = require('express');
const router = express();

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
        console.log("Connected!"); // SQL 고치기 질의어 에러 남!!!
        const sql = `INSERT INTO board (m_no,title,content) VALUES (${req.session.m_no}, '${req.session.title}', '${req.session.content}')`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log("board insert failed");
                res.json({
                    message: "글 등록 실패!!!"
                });
            } else {
                console.log("board insert ok!!!");
                res.json({
                    message: "글 등록 성공!!!"
                });
            }
        });
    });

});

router.get('/', (req, res, next) => {
    res.render('board', {
        title: "borad"
    });

});

module.exports = router;