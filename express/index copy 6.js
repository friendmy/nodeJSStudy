import express from "express";
import http from "http";

// 익스프레스 객체 생성
let app = express();

app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");
  console.log(req);

  let userAgent = req.header("User-Agent");
  let paramName = req.query.name;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express에서 응답한 결과입니다.</h1>");
  res.write(`<div><p>User-Agent: ${userAgent} </p></div>`);
  res.write(`<div><p>Param name: ${paramName}</p></div>`);
});

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
