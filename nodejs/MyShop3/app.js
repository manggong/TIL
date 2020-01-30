const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const contactrouter = require('./routes/contact');
const login = require('./routes/login');
const logout = require('./routes/logout');
const home = require('./routes/home');
const basket = require('./routes/basket');
const board = require('./routes/board');
const board_upload = require('./routes/board_upload');
const board_show = require('./routes/board_show');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '미녀 강사 전은수',
    cookie: {
        httpOnly: true,
        secure: false
    }
}))

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/board_show', board_show);
app.use('/board_upload', board_upload);
app.use('/board_write', board);
app.use('/basket', basket);
app.use('/contact', contactrouter);
app.use('/login', login);
app.use('/logout', logout);
app.use('/', home);

app.listen(3000, () => {
    console.log('server ready');
});