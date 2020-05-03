import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

// 익스프레스 객체 생성
let app = express();

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);
let router = express.Router();

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

router.route("/process/showCookie").get((req, res) => {
  console.log("/process/showCookie 호출됨");

  res.send(req.cookies);
});

router.route("/process/setUserCookie").get((req, res) => {
  console.log("/process/setUserCookie 호출됨");

  res.cookie("user", {
    id: "mike",
    name: "소녀시대",
    authorized: true,
  });

  res.redirect("/process/showCookie");
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
