const express = require("express"); // express를 사용하겠습니다.
const path = require("path"); // static폴더 경로를 가르쳐 주기 위한 module import

const app = express(); //함수 호출 후 return하는 객체를 app에 넣기

app.use(express.static(path.join(__dirname, "public"))); //public 폴더에는 있는 정적소스를 이용하겠습니다.

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.post("/login", (req, res) => {
  const id = req.body.id;
  res.json({
    message: id + "님 로그인 되셨습니다."
  });
});

app.listen(3000, () => {
  //3000 번 포트로 리슨 하겠습니다.
  console.log("3000 port listen");
});
