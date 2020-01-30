const express = require('express');
const board_upload = express.Router();

const con = require('./mysql_con');

board_upload.post('/', (req, res) => {
    if (req.session.uid) {
        const sql = `INSERT INTO board (m_no,title,content) VALUES ('${req.session.uno}','${req.body.title}','${req.body.content}')`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log(sql);
                console.log("게시판 에러");
                res.json({
                    message: "등록에러"
                });
            } else {
                console.log("삽입성공");
                res.json({
                    message: "등록성공"
                });
            }
        })
    } else res.json({
        message: "로그인 부터 하세용"
    });
});

module.exports = board_upload;