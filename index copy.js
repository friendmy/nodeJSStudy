import express from "express";
import http from "http";

// 익스프레스 객체 생성
let app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set("port", process.env.PORT || 3000);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
