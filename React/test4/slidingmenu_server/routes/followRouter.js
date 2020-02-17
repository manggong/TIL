const express = require('express');
const User = require('../models').User;
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const followerId = req.body.followerId;
        const id = req.body.followingId;

        const result = await User.findOne({
            where: {
                id
            }
        });

        result.addFollowers(followerId);

        res.json({
            message: true,
            result
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

module.exports = router;