import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import { publicDecrypt } from "crypto";

// 익스프레스 객체 생성
let app = express();

let router = express.Router();

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

router.route("/process/login").post((req, res) => {
  console.log("/process/login 처리함");

  let paramId = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write(`<div><p>Param id:${paramId}</p></div>`);
  res.write(`<div><p>Param Pw:${paramPassword}</p></div>`);
  res.write("<br><br><a href='/index2.html'>로그인 페이지로 돌아가기</a>");
  res.end();
});

app.use("/", router);

// Express 서버 시작
http.createServer(app).listen(3000, () => {
  console.log("익스프레스 서버가 3000번 포트에서 시작했습니다");
});

// const handleListen = () => {
//   console.log("익스프레스 서버를 시작했습니다: " + app.get("port"));
// };

// app.listen(app.get("port"), handleListen);
