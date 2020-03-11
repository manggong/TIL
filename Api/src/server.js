const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const uploadRouter = require("./routes/uploadRouter");
const webSocket = require("./socket");
const sseStart = require("./sse")

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", uploadRouter);

const server = app.listen(8080, () => {
  console.log("server listening 8080");
});

webSocket(server)

sseStart(server)