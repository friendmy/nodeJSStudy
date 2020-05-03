import express from "express";
import http from "http";
import serveStatic from "serve-static";
import path from "path";

// 익스프레스 객체 생성
let app = express();

//app.use(serveStatic(path.join(__dirname, "exam")));

app.use(express.static(path.join(__dirname, "exam")));

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
