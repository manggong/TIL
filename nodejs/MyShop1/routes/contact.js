const express = require('express');
const contactRouter = express.Router();

const members = [{
        name: "kim",
        email: "myemail@something.com",
        comments: "hello"
    },
    {
        name: "yang",
        email: "youremail@something.com",
        comments: "hi"
    }
];

contactRouter.post("/", (req, res) => {
    members.push(req.body);
    console.log(members);
    res.json({
        message: "contact ok!!!"
    });
});

module.exports = {
    contactRouter,
    members
};