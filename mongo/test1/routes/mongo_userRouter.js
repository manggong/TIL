const express = require("express");
const router = express.Router();
const User = require('../schemas/user')

router.post("/getAllMember", async (req, res) => {
    try {
        const users = await User.find({})
        res.json({
            message: users
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
})

router.post("/add", async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save()
        res.json({
            result
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
})

router.post("/update", async (req, res) => {
    try {
        const result = await User.update({
            _id: req.body._id
        }, {
            name: req.body.name,
            age: req.body.age,
            married: req.body.married
        })
        res.json({
            result
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
})

router.post("/delete", async (req, res) => {
    try {
        const result = await User.remove({
            _id: req.body._id
        })
        res.json({
            result
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
})

module.exports = router;