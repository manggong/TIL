const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");

fs.readdir("upload", error => {
  if (error) {
    console.log(`폴더가 없어서 생성합니다`);
    fs.mkdirSync("upload");
  }
});

router.post("/upload", (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});
/* const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const oldpath = files.filetoupload.path;
    console.log(oldpath);
    const newpath = "C:/Users/Your Name/" + files.filetoupload.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  }); 
}); */

module.exports = router;
