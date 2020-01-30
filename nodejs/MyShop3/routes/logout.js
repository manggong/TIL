const express = require('express');
const logout = express.Router();

logout.post('/', (req, res) => {
    req.session.destroy();
    res.json({});
});

module.exports = logout;