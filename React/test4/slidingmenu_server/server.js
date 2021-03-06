const memberRouter = require('./routes/memberRouter');
const postRouter = require('./routes/postRouter');
const followRouter = require('./routes/followRouter');
const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./models').sequelize;

sequelize.sync();

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/member', memberRouter);
app.use('/post', postRouter);
app.use('/follow', followRouter);

app.get('/', (req, res) => {
    res.json({
        ip: "192.168.111.1"
    });
});

app.listen(8080, () => {
    console.log("8080 server ready");
});