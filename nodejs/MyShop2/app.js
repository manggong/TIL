const contactRouter = require("./routes/contact");
const indexRouter = require("./routes/index")
const logoutRouter = require("./routes/logout");
const loginRouter = require("./routes/login");
const boardRouter = require("./routes/board");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
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

app.use("/", indexRouter); // 새로고침 시 세션 생신 방지
app.use("/contact", contactRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/board_write", boardRouter);

app.listen(3000, () => {
  console.log("server ready!!!");
});