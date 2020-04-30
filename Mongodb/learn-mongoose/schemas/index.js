const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://jihwan:1234@localhost:27017/admin",
      {
        dbName: "nodejs"
      },
      error => {
        if (error) {
          console.log(`db connection error ${error}`);
        } else {
          console.log(`db connection ok`);
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.error(`db connection error ${error}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.error(`db disconnected, Try again`);
    connect();
  });
  require("./users");
  require("./comment");
};
