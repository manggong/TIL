const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    req.session.destroy(() => {
        res.json({
            message: "logout ok!!!"
        });
    });
});

module.exports = router;