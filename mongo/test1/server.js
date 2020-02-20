const memberRouter = require("./routes/memberRouter");
const mongo_userRouter = require("./routes/mongo_userRouter")
const express = require("express");
const path = require("path");
const connect = require("./schemas");

const app = express();

connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//app.use("/member", memberRouter);
app.use("/member", mongo_userRouter);

app.listen(4000, () => {
  console.log("server ready 4000");
});