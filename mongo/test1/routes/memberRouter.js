const mongo = require("mongodb");
const express = require("express");
const router = express.Router();

const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/nodejs";
let dbo

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(err);
    res.json({
      message: false
    });
  } else {
    dbo = db.db("nodejs")
  }
});

router.post("/delete", (req, res) => {
  const _id = mongo.ObjectId(req.body._id);
  const myquery = {
    _id
  };
  dbo.collection("member").deleteOne(myquery, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        message: false
      })
    } else {
      res.json({
        message: true
      })
    }
  });
});

router.post("/update", (req, res) => {
  const myquery = {
    _id: mongo.ObjectId(req.body._id)
  };
  const newvalues = {
    $set: {
      name: req.body.name,
      age: req.body.age,
      married: req.body.married
    }
  };
  dbo.collection("member").updateOne(myquery, newvalues, (err, result) => {
    if (err) {
      console.log(err)
      res.json({
        message: false
      })
    } else {
      res.json({
        message: true
      })
    }
  });
});

router.post("/add", (req, res) => {
  const myobj = req.body;
  dbo.collection("member").insertOne(myobj, function (err, result) {
    if (err) {
      console.log(err)
      res.json({
        message: false
      })
    } else {
      res.json({
        message: true
      })
    }
  });
});

router.post("/getAllMember", (req, res) => {
  dbo
    .collection("member")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        res.json({
          message: false
        });
      } else {
        console.log(result);
        res.json({
          message: result
        });
      }
    });
});
module.exports = router;