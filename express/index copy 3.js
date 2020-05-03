import express from "express";
import http from "http";

// 익스프레스 객체 생성
let app = express();

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 요청 처리");
  req.user = "mike";
  next();
});

app.use("/", function (req, res, next) {
  console.log("두 번째 미들웨어에서 요청을 처리함");

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.end(`<h1>Express 서버에서 ${req.user}가 응답한 결과입니다.</h1>`);
});

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
