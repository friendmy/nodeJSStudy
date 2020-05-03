// express 기본 모듈 불러오기
import express from "express";
import http from "http";
import path from "path";

// express 미들웨어 불러오기
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import static from "static"; -> express.static로 사용 by me

// 오류 핸들러 모듈 사용
import expressErrorHandler from "express-error-handler";

// Session 미들웨어 불러오기
import expressSession from "express-session";

// express 객체 생셩
let app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use("/public", express.static(path.join(__dirname, "public")));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    //proxy: -> https와 관련하여 필요한 옵션
    secret: "my key", // 이 비밀키를 통해 Session Id를 암호화 하여 관리
    resave: false, // 세션에 요청이 들어간 후에 세션에 변동이 있든 없든 무조건 저장하겠다는 옵션
    saveUninitialized: true, // 세션이 세션 store에 저장되기 전에 uninitialized된 상태로 저장
  })
);

// 몽고디비 모듈 사용
import { MongoClient } from "mongodb";

import mongoose from "mongoose";
import { ifError } from "assert";

// 데이터베이스 객체를 위한 변수 선언
let database;

// 데이터베이스 스키마 객체를 위한 변수 선언
let UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
let UserModel;

const connectDB = () => {
  // 데이터베이스 연결 정보
  const databaseUrl = "mongodb://localhost:27017/local";
  // 데이터베이스 연결
  console.log("데이터베이스 연결을 시도합니다.");
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "mongoose connection error.")
  );
  database.on("open", () => {
    console.log(`데이터베이스에 연결되었습니다. ${databaseUrl}`);

    // 스키마 정의
    UserSchema = mongoose.Schema({
      id: { type: String, required: "ID is required" }, // , unique: true -> Deprecation
      name: String,
      password: { type: String, required: true },
    });
    console.log("UserSchema 정의함.");

    // 모델 정의
    UserModel = mongoose.model("users", UserSchema);
    console.log("UserModel 정의함");
  });

  database.on("disconnected", () => {
    console.log("연결이 끊어졌습니다. 5초 후 다시 연결합니다.");
    setInterval(connectDB, 5000);
  });
};

const authUser = (database, id, password, callback) => {
  console.log(`authUser 호출됨.: ${id}, ${password}`);

  UserModel.find({ id, password }, (err, results) => {
    if (err) {
      callback(err, null);
    }

    console.log(`아이디 [${id}], 비밀번호 [${password}] 로 사용자 검색 결과`);
    console.dir(results);

    if (results.length > 0) {
      console.log(
        `아이디 [${id}], 비밀번호: [${password}] 가 일치하는 사용자 찾음.`
      );
      callback(null, results);
    } else {
      console.log("일치하는 사용자 찾지 못함");
      callback(null, null);
    }
  });
};

// 사용자 추가 함수
const addUser = (database, id, password, name, callback) => {
  // UserModel의 인스턴스 생성
  const user = new UserModel({ id, password, name });
  // save()로 저장
  user.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }
    // 오류가 아닐경우
    console.log("사용자 데이터 추가함");
    callback(null, user);
  });
};

const setPassword = (database, id, password, callback) => {
  // users 컬렉션 참조
  const users = database.collection("users");

  users.updateOne({ id }, { $set: { password } }, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log(result);
    callback(null, result);
  });
};

let router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route("/process/login").post((req, res) => {
  console.log("/process/login 호출");

  const paramId = req.body.id;
  const paramPassword = req.body.password;

  if (database) {
    authUser(database, paramId, paramPassword, (err, docs) => {
      if (err) {
        throw err;
      }

      if (docs) {
        const username = docs[0].name;
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write(`<h1>${username} 님이 로그인 하셨습니다.</h1>`);
        res.write(`<div><p>Param id:${paramId}</p></div>`);
        res.write(`<div><p>Param Pw:${paramPassword}</p></div>`);
        res.write(
          `<br><br><a href='/public/setPassword.html'>패스워드 변경</a>`
        );
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h1>로그인 실패</h1>");
        res.write("<div><p>아이디와 비밀번호를 확인하십시요</p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<div><p>데이터베이스에 연결하지 못했습니다.</p></div>");
    res.end();
  }
});

router.route("/process/adduser").post((req, res) => {
  console.log("/process/adduser 호출됨");

  const paramId = req.body.id;
  const paramPassword = req.body.password;
  const paramName = req.body.name;

  if (database) {
    addUser(database, paramId, paramPassword, paramName, (err, result) => {
      if (err) {
        throw err;
      }

      if (result) {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 성공</h2>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 실패</h2>");
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<div><p>데이터베이스에 연결하지 못했습니다.</p></div>");
    res.end();
  }
});

router.route("/process/setpassword").post((req, res) => {
  console.log("/process/setpassword 호출됨");

  const paramId = req.body.id;
  const paramBeforePassword = req.body.beforePassword;
  const paramCurrentPassword = req.body.currentPassword;
  const paramCurrentPassword1 = req.body.currentPassword1;

  if (database) {
    authUser(database, paramId, paramBeforePassword, (err, docs) => {
      if (docs) {
        if (paramCurrentPassword === paramCurrentPassword1) {
          setPassword(
            database,
            paramId,
            paramCurrentPassword,
            (err, result) => {
              if (err) {
                throw err;
              }

              if (result) {
                res.writeHead("200", {
                  "Content-Type": "text/html;charset=utf8",
                });
                res.write("<h2>패스워드 변경 성공</h2>");
                res.end();
              }
            }
          );
        } else {
          res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
          res.write(
            "<div><p>변경패스워드와 변경 패스워드 확인이 다릅니다.</p></div>"
          );
          res.write("<div><p>패스워드 확인 후 다시 시도하세요.</p></div>");
          res.write(
            "<br><br><a href='/public/setpassword.html'>다시 시도하기</a>"
          );
          res.end();
        }
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<div><p>아이디와 이전 비밀번호를 확인하십시요</p></div>");
        res.write(
          "<br><br><a href='/public/setpassword.html'>다시 시도하기</a>"
        );
        res.end();
      }
    });
  }
});

app.use("/", router);

// 404 오류 페이지 처리
let errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버 시작
http.createServer(app).listen(app.get("port"), () => {
  console.log(`서버가 시작되었습니다. 포트: ${app.get("port")}`);

  // 데이터베이스 연결
  connectDB();
});
