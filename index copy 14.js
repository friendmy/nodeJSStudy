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

router.route("/process/photo").post(upload.array("photo", 1), (req, res) => {
  console.log("/process/photo 호출됨");

  try {
    let files = req.files;

    console.dir("#=== 업로드된 첫번째 파일 정보===");
    console.dir(req.files[0]);
    console.dir("===============================");

    let originalname = "",
      filename = "",
      mimetype = "",
      size = 0;

    if (Array.isArray(files)) {
      console.log("배열에 들어있는 파일 갯수 : %d", files.length);

      for (let index = 0; index < files.length; index++) {
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }

      console.log(
        `현재 파일 정보 : ${originalname} , ${filename}, ${mimetype}, ${size}`
      );

      //클라이언트에 응답 전송
      res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr>");
      res.write(
        `<p>원본 파일 이름 : ${originalname} -> 저장 파일명 : ${filename}</p>`
      );
      res.write(`<p>MIME TYPE: ${mimetype}</p>`);
      res.write(`<p>파일 크기: ${size}</p>`);
      res.end();
    }
  } catch (error) {
    console.dir(error.stack);
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
