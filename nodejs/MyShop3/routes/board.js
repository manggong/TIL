const express = require('express');
const board = express.Router();

board.get('/', (req, res, next) => {
    res.render('board_write', {
        title: "게시판"
    });
});

module.exports = board;