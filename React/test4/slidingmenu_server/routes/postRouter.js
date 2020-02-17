const con = require("../db_con");
const express = require("express");
const router = express.Router();
const Post = require('../models').Post;
const Hashtag = require('../models').Hashtag;
const User = require('../models').User;

router.post('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick']
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        console.log(posts);
        res.json({
            posts
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        })
    }
})

router.post('/upload', async (req, res) => {
    const content = req.body.content;
    const userId = req.body.id;
    const img = req.body.img;
    try {
        const post_result = await Post.create({
            content,
            userId,
            img
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        console.log(hashtags)
        if (hashtags) {
            const hashtag_result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({
                    where: {
                        title: tag.slice(1).toLowerCase()
                    }
                })
            }));
            post_result.addHashtags(hashtag_result.map((r) => {
                return r[0]
            }));
        }
        //const posts = getAllPosts();
        res.json({
            message: true
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: false
        })
    }
})

module.exports = router;