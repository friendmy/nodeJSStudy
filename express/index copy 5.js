import express from "express";
import http from "http";

// 익스프레스 객체 생성
let app = express();

app.use(function (req, res, next) {
  console.log(req.query.name);
  res.send(`${req.query.name} 를 보냈냐?`);
  //res.redirect("http://google.co.kr");
  next();
});

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
