const express = require('express');
const board_show = express.Router();
const con = require('./mysql_con');

board_show.get('/', (req, res, next) => {
    const sql = `SELECT * FROM board`;
    con.query(sql, (err, result) => {
        console.log(result);
        /*let returnData = [];
        for (let i = 0; i <= result.length; i++) {
            returnData[i] = result[i]
        }
        console.log(returnData);*/
        res.render('board_show', {
            result: result
        })
    });
});


module.exports = board_show;