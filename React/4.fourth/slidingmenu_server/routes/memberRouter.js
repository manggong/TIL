const express = require("express");
const router = express.Router();

router.post('/login', (req, res) => {
    res.json({ message: true });
});

router.get('/logout', (req, res) => {
    res.json({ message: true });
});

module.exports = router;