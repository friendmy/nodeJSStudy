import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

import multer from "multer";
import fs from "fs";
import cors from "cors";

// 익스프레스 객체 생성
let app = express();

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
app.use(cors());

// multer 미들웨어 사용: 미들웨어 사용 순서 중요 body-parser -> multer -> router
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + Date.now());
  },
});

let upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

let router = express.Router();

router.route("/process/memo").post((req, res) => {
  try {
    console.log(req.body.userName);
    console.log(req.body.writeDate);
    console.log(req.body.content);

    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<div><p>메모가 저장되었습니다.</p></div>");
    res.write(
      "<div><input type=button value='다시 작성' onclick='javascript:history.back()'></div>"
    );
    res.end();
  } catch (err) {
    console.dir(err.stack);

    res.writeHead(400, { "Content-Type": "text/html;charset=utf8" });
    res.write("<div><p>메모 저장 시 에러 발생</p></div>");
    res.end();
  }
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
