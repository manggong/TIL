const express = require('express')
const router = express.Router();
const {
    contactRouter,
    members
} = require('./contact');

router.post("/", (req, res) => {
    // 콜백 함수를 고려해서 블로킹과 논블로킹을 잘 구분해서 사용해야 한다.
    let message;
    for (let i = 0; i < members.length; i++) {
        if (members[i].email == req.body.email) {
            message = "login ok!!!";
            req.session.email = req.body.email;
            break;
        }
    }
    if (!message) {
        message = "login fail";
    }
    res.json({
        message
    });
});

module.exports = router;