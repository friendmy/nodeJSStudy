// function greeter(person) {
//     return "Hello, " + person;
// }
// var user = "Jane User";
// console.log(greeter(user));

// function add(a, b, callback) {
//   var result = a + b;
//   callback(result);

//   var count = 0;
//   var history = function () {
//     count++;
//     return count + " : " + a + "+" + b + " = " + result;
//   };
//   return history;
// }

// var add_history = add(10, 10, function (result) {
//   console.log("파라미터로 전달된 콜백 함수 호출");
//   console.log("더하기 (10, 10)의 결과: %d", result);
// });

// console.log("결과 값으로 받은 함수 실행 결과:", add_history());
// console.log("결과 값으로 받은 함수 실행 결과:", add_history());
// console.log("결과 값으로 받은 함수 실행 결과:", add_history());

// function makeAdder(x) {
//   var y = 1;
//   return function (z) {
//     y = 100;
//     return x + y + z;
//   };
// }

// var add5 = makeAdder(5);
// var add10 = makeAdder(10);
// //클로저에 x와 y의 환경이 저장됨

// console.log(add5(2)); // 107 (x:5 + y:100 + z:2)
// console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
// //함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산

// 프로토 타입
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.walk = function (speed) {
//   console.log(speed + "km 속도로 걸어갑니다.");
// };

// var person01 = new Person("소녀시대", 22);
// var person02 = new Person("걸스데이", 25);

// console.log(
//   person01.name + "(" + person01.age + ")" + " 객체의 walk(10)을 호출합니다."
// );
// person01.walk(10);

// console.log(
//   person02.name + "(" + person02.age + ")" + " 객체의 walk(20)을 호출합니다."
// );
// person02.walk(20);

// import url from "url";
// import querystring from "querystring";

// let curURL = url.parse(
//   "https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty"
// );

// let curStr = url.format(curURL);

// // console.log("주소문자열: %s", curStr);
// // console.dir(curURL);

// let param = querystring.parse(curURL.query);
// console.log(param);
// console.log(querystring.stringify(param));

// process.on("exit", function () {
//   console.log("exit 이벤트 발생함");
// });

// setTimeout(function () {
//   console.log("2초 후에 시스템 종료 시도함");

//   process.exit();
// }, 2000);

// process.on("tick", function (count) {
//   console.log("tick 이벤트 발생함: %s", count);
// });

// setTimeout(function () {
//   console.log("2초 후에 tick 이벤트 전달 시도함");

//   process.emit("tick", "2");
// }, 2000);

// import Calc from "./calc3";

// let calc = new Calc();
// calc.emit("stop");

// console.log(Calc.title + "에 stop 이벤트 전달함");

// // 동기식으로 파일 읽기
// import fs from "fs";

// let data = fs.readFileSync("./package.json", "utf8");
// console.log(data);

// // 비동기식으로 파일 읽기
// import fs from "fs";

// fs.readFile("./package.json", "utf8", function (err, data) {
//   console.log(data);
// });

// console.log("프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.")

// import fs from "fs";

// fs.writeFile("./output.txt", "Hello World!", function (err) {
//   if (err) {
//     console.log("Error:" + err);
//   }

//   console.log("파일 쓰기 완료");
// });

// // 파일 열어서 쓰기

// import fs from "fs";

// fs.open("./output.txt", "a", function (err, fd) {
//   if (err) throw err;

//   let buf = new Buffer.from("안녕히!\n");

//   fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
//     if (err) throw err;

//     console.log(err, written, buffer);

//     fs.close(fd, function () {
//       console.log("파일 열고 데이터 쓰고 파일 닫기 완료");
//     });
//   });
// });

// // 파일 읽기

// import fs from "fs";

// fs.open("./output.txt", "r", function (err, fd) {
//   if (err) throw err;

//   let buf = new Buffer.alloc(100);
//   console.log("버퍼 타입 : %s", Buffer.isBuffer(buf));

//   fs.read(fd, buf, 0, buf.length, null, function (err, bytesRead, buffer) {
//     if (err) throw err;

//     let inStr = buffer.toString("utf8", 0, bytesRead);
//     console.log("파일에서 읽은 데이터 : %s", inStr);

//     fs.close(fd, function () {
//       console.log("ouput.txt 파일을 열고 읽기 완료.");
//     });
//   });
// });

// 버퍼 사용법

// // 버퍼 객체를 크기만 지정하여 만든 후 문자열을 씁니다.
// let output = "안녕 1!";
// let buffer1 = new Buffer.alloc(10);
// let len = buffer1.write(output, "utf8");
// console.log("첫번째 버퍼의 문자열 %s", buffer1.toString());

// //버퍼 객체를 문자열을 이용해 만듭니다.
// let buffer2 = new Buffer.from("안녕 2!", "utf8");
// console.log("두번째 버퍼의 문자열 %s", buffer2.toString());

// // 타입을 확인합니다.
// console.log("버퍼 객체의 타입 %s", Buffer.isBuffer(buffer1));

// // 버퍼 객체에 들어 있는 문자열 데이터를 문자열 변수로 만듭니다.
// let byteLen = Buffer.byteLength(output);
// let str1 = buffer1.toString("utf8", 0, byteLen);
// let str2 = buffer2.toString("utf8");

// // 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사합니다.
// buffer1.copy(buffer2, 0, 0, len);
// console.log("두 번째 버퍼에 복사한 후의 문자열: %s", buffer2.toString("utf8"));

// // 두 개의 버퍼를 붙여 줍니다.
// let buffer3 = Buffer.concat([buffer1, buffer2]);
// console.log("두 개의 버퍼를 붙인 후의 문자열 : %s", buffer3.toString("utf8"));

// 스트림 단위로 파일 읽고 쓰기

// import fs from "fs";

// let infile = fs.createReadStream("./output.txt", { flags: "r" });
// let outfile = fs.createWriteStream("./output2.txt", { flags: "w" });

// infile.on("data", function (data) {
//   console.log("읽어 드린 데이터", data);
//   outfile.write(data);
// });

// infile.on("end", function () {
//   console.log("파일 읽기 종료");
//   outfile.end(function () {
//     console.log("파일 쓰기 종료");
//   });
// });

// 스트림 연결하기

// import fs from "fs";

// let inname = "./output.txt";
// let outname = "./output2.txt";

// fs.exists(outname, function (exists) {
//   if (exists) {
//     fs.unlink(outname, function (err) {
//       if (err) throw err;
//       console.log("기존 파일 [" + outname + "] 삭제함.");
//     });
//   }

//   let infile = fs.createReadStream(inname, { flags: "r" });
//   let outfile = fs.createWriteStream(outname, { flags: "w" });
//   infile.pipe(outfile);
//   console.log("파일 복사 [" + inname + "] -> [" + outname + "]");
// });

// http 모듈로 요청받은 파일 내용을 읽고 응답하기

// import fs from "fs";
// import http from "http";

// let server = http.createServer(function (req, res) {
//   // 파일을 읽어 응답 스트림과 pipe()로 연결합니다.
//   let instream = fs.createReadStream("./output.txt");
//   instream.pipe(res);
// });

// server.listen(7001, "127.0.0.1");

// fs 모듈로 새 디렉토리 만들고 삭제하기

// import fs from "fs";

// fs.mkdir("./docs", 0o666, function (err) {
//   if (err) throw err;
//   console.log("폴더 생성");

//   fs.rmdir("./docs", function (err) {
//     if (err) throw err;
//     console.log("폴더 삭제");
//   });
// });

// 로그 파일 남기기

import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment";

function timeStampFormat() {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ");
}

let logger = new winston.createLogger({
  transports: [
    new winstonDaily({
      name: "info-file",
      filename: "./log/server%DATE%.log",
      datePattern: "YYYY_MM_DD",
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: "info",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }),
    new winston.transports.Console({
      name: "debug-console",
      colorize: true,
      level: "debug",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      name: "exception-file",
      filename: "./log/exception%DATE%.log",
      datePattern: "YYYY_MM_DD",
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: "error",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }),
    new winston.transports.Console({
      name: "exception-console",
      colorize: true,
      level: "debug",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }),
  ],
});

var fs = require("fs");

var inname = "./output.txt";
var outname = "./output2.txt";

fs.exists(outname, function (exists) {
  if (exists) {
    fs.unlink(outname, function (err) {
      if (err) throw err;
      logger.info("기존 파일 [" + outname + "] 삭제함.");
    });
  }

  var infile = fs.createReadStream(inname, { flags: "r" });
  var outfile = fs.createWriteStream(outname, { flags: "w" });

  infile.pipe(outfile);
  logger.info("파일 복사 [" + inname + "] -> [" + outname + "]");
});
