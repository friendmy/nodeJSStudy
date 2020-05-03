import express from "express";
import http from "http";

// 익스프레스 객체 생성
let app = express();

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 요청 처리");
  //res.send({ name: "소녀시대", age: 20 });
  //res.status(403).send("Forbidden");
  res.sendStatus(403);
  //next();
});

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
