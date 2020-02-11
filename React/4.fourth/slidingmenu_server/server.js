const memberRouter = require('./routes/memberRouter');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/member', memberRouter);

app.get('/', (req, res) => {
    res.json({
        ip: "192.168.111.1"
    });
});

app.listen(8080, () => {
    console.log("8080 server ready");
});