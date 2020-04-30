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

  let filename = "home.png";

  fs.readFile(filename, (err, data) => {
    res.writeHead(200, { "Content-Type": "image/png" });
    res.write(data);
    res.end();
  });
});

server.on("close", () => {
  console.log("서버가 종료됩니다.");
});
