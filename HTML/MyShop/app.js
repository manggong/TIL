const express = require("express");
const path = require("path");
const session = require("express-session");
const homeRouter = require("./routes/home")

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
        secret: "미남 반장 이기훈",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);

app.use('/', homeRouter);

app.listen(3000, () => {
    console.log("server listening port:3000");
});