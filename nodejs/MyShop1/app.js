const express = require("express");
const path = require("path");
const session = require("express-session");
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const {
    contactRouter,
    members
} = require('./routes/contact');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "미녀 강사 전은수",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);

app.use('/logout', logoutRouter);

app.use('/login', loginRouter);

app.use('/contact', contactRouter);

//장바구니 담기
app.post("/basket", (req, res) => {
    let fruits = req.body.fruits;
    if (!req.session.fruits) req.session.fruits = [];
    req.session.fruits.push(fruits);
    res.json({
        message: `${fruits}가 장바구니에 들어갔습니다.`
    });
    console.log(req.session.fruits);
});

// 장바구니 조회
app.get("/view", (req, res) => {
    res.json({
        message: `${req.session.fruits}가 장바구니에 있습니다.`
    })
});

app.listen(3000, () => {
    console.log("server ready!!!");
});