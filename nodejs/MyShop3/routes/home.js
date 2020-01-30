const express = require('express');
const home = express.Router();

home.get('', (req, res) => {
    let logined = 0;
    let name;
    if (req.session.uid) {
        logined = 1;
        name = req.session.name;
    }
    res.render('index', {
        logined,
        name
    });
})

module.exports = home;