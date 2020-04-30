import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";

// 익스프레스 객체 생성
let app = express();
// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("첫 번째 미들웨어 에서 요청을 처리함.");

  let paramId = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write(`<div><p>${paramId}</p></div>`);
  res.write(`<div><p>${paramPassword}</p></div>`);
  res.end();
});

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
