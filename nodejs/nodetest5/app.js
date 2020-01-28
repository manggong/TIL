const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

const user_data = {
  id: "a",
  pw: "b"
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

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

app.post("/login", (req, res) => {
  console.log("login처리:" + req.headers.cookie);
  console.log(req.session);
  const id = req.body.id;
  const pw = req.body.pw;
  if (id == user_data.id && pw == user_data.pw) {
    req.session.logined_user_id = id; //사물함에 값을 집어넣겠습니다.
    res.json({
      resultCode: 1,
      message: `${id}님 로그인 되셨습니다.`
    });
  } else {
    res.json({
      resultCode: 0,
      message: `다시 로그인하세요`
    });
  }
});
app.post("/basket", (req, res) => {
  console.log("basket처리:" + req.headers.cookie);
  console.log(req.session);

  const product = req.body.product;

  if (req.session.logined_user_id) { //자바스크립트는 세션의 유무가 아니라 세션 안의 값을 보고 사용자의 올바른 세션인지를 확인 함.
    //로그인 되어있는 사용자
    if (!req.session.basket) {
      //장바구니가 없을 때
      req.session.basket = [];
    }
    req.session.basket.push(product);
    res.json({
      resultCode: 1,
      message: `${req.session.logined_user_id}님의 장바구니에 ${product}가 담겼습니다.`
    });
  } else {
    res.json({
      resultCode: 0,
      message: `로그인부터 하세요`
    });
  }
});

app.post("/basket_view", (req, res) => {
  console.log("basket_view 처리:" + req.headers.cookie);
  console.log(req.session);

  if (req.session.logined_user_id) {
    //로그인 되어있는 사용자
    let basket;
    if (req.session.basket) {
      //장바구니가 있을 때
      basket = req.session.basket.join(",");
      res.json({
        resultCode: 1,
        message: basket
      });
    } else {
      res.json({
        resultCode: 0,
        message: `장바구니가 비었습니다`
      });
    }
  } else {
    res.json({
      resultCode: 0,
      message: `로그인부터 하세요`
    });
  }
});

app.post("/logout", (req, res) => {
  console.log("logout 처리:" + req.headers.cookie);
  console.log(req.session);

  req.session.destroy(() => {
    console.log("세션이 파기 되었습니다");
    res.json({
      resultCode: 1,
      message: `로그아웃 되었습니다`
    });
  });
});

app.listen(4000, () => {
  console.log("server ready...");
});