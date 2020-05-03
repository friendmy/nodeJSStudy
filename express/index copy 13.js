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

router.route("/process/product").get((req, res) => {
  console.log("/process/product 호출됨");

  if (req.session.user) {
    res.redirect("/product.html");
  } else {
    res.redirect("/index2.html");
  }
});

router.route("/process/login").post((req, res) => {
  let paramId = req.body.id || req.query.id;
  let paramPassword = req.body.password || req.query.password;

  if (req.session.user) {
    // 이미 로그인된 상태
    console.log("이미 로그인되어 상품 페이지로 이동합니다.");

    res.redirect("/public/puoduct.html");
  } else {
    req.session.user = {
      id: paramId,
      name: "소녀시대",
      authorized: true,
    };

    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h1>로그인 성공</h1>");
    res.write(`<div><p>Param id:${paramId}</p></div>`);
    res.write(`<div><p>Param Pw:${paramPassword}</p></div>`);
    res.write("<br><br><a href='/product.html'>상품 페이지로 이동하기</a>");
    res.end();
  }
});

router.route("/process/logout").get((req, res) => {
  console.log("/process/logout이 호출됨");

  if (req.session.user) {
    // 로그인 된 상태
    console.log("로그아웃합니다.");

    req.session.destroy((err) => {
      if (err) {
        throw err;
      }

      console.log("세션을 삭제하고 로그아웃되었습니다.");
      res.redirect("/index2.html");
    });
  } else {
    // 로그인 안된 상태
    console.log("아직 로그인되어 있지 않습니다.");
    res.redirect("/index2.html");
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
