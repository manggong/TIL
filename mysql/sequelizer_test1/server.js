const express = require("express");
const path = require("path");
const sequelize = require('./models').sequelize;

const app = express();

sequelize.sync();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/member", require("./routes/memberRouter"));

app.listen(5000, () => {
    console.log("server listen 5000");
});