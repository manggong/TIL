const express = require('express');
const basket = express.Router();

const con = require('./mysql_con');


basket.post('/', (req, res) => {
    if (req.session.uid) {
        const ouser = req.session.uid;
        const user = req.body.user;
        const quantity = req.body.quantity;
        const m_no = req.session.uno;
        const city = req.body.city;
        const cityname = [0, "paris", "newyork", "sanfrancisco"];
        if (city == 0) res.json({
            message: "잘못된 접근입니다!!"
        });
        else if (ouser == user) {
            sql = `INSERT INTO basket (m_no, product, quantity) VALUES ('${m_no}', '${cityname[city]}','${quantity}')`;
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Insert Fail", err);
                    res.json({
                        message: "에러"
                    });
                } else {
                    console.log("1 Inserted");
                    res.json({
                        message: "인서트완료!!"
                    });
                }
            });
        } else res.json({
            message: "ID를 확인해주세요"
        });
    } else {
        res.json({
            message: "로그인을 먼저해주세요"
        })
    }
});

module.exports = basket;