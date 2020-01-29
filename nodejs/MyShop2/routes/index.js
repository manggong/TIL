const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    let logined_flag = 0;
    if (req.session.email) {
        logined_flag = 1;
    }
    res.render('index', {
        flag: logined_flag
    }); // 동적페이지 필요 / 비동기 (ex.pug, ejs)
});

module.exports = router;