import http from "http";
import fs from "fs";

// 웹 서버 객체를 만듭니다.
let server = http.createServer();

// 웹서버를 시작하여 3000번 포트에서 대기합니다.
const port = 3000;
server.listen(port, () => {
  console.log("웹서버가 시작되었습니다.: %d", port);
});

// 클라이언트 연결 이벤트 처리
server.on("connection", (socket) => {
  let addr = socket.address();
  console.log("클라이언트가 접속했습니다. %s, %d", addr.address, addr.port);
});

server.on("request", (req, res) => {
  console.log("클라이언트 요청이 들어왔습니다.");

  let filename = "20191117_112318-EFFECTS.jpg";
  let infile = fs.createReadStream(filename, { flages: "r" });
  let filelength = 0;
  let curlength = 0;

  fs.stat(filename, (err, stats) => {
    filelength = stats.size;
  });

  res.writeHead(200, { "Content-Type": "image/jpg" });

  infile.on("readable", () => {
    let chunk;
    while (null !== (chunk = infile.read())) {
      console.log("읽어 드린 데이터 크기: %d 바이트", chunk.length);
      curlength += chunk.length;
      res.write(chunk, "utf8", (err) => {
        console.log(
          "파일 부분 쓰기 완료: %d, 파일크기 : %d",
          curlength,
          filelength
        );
        if (curlength >= filelength) {
          res.end();
        }
      });
    }
  });
});

server.on("close", () => {
  console.log("서버가 종료됩니다.");
});
