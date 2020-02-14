const express = require("express");
const router = express.Router();
const member = require('../models').member;

router.post("/selectAll", (req, res) => {
    member.findAll({})
        .then((members) => {
            console.log(members);
            res.json({
                message: members
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: `DB ERROR!!!`
            });
        });

});

module.exports = router;