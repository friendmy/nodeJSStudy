import http from "http";

let options = {
  host: "www.google.co.kr",
  port: 80,
  method: "POST",
  path: "/",
  headers: {},
};

let req = http.request(options, (res) => {
  let resData = "";
  res.on("data", (chunk) => {
    resData += chunk;
  });

  res.on("end", () => {
    console.log(resData);
  });
});

options.headers["Content-Type"] = "application/x-www-form-urlencoded";
req.data = "q=actor";
options.headers["Content-Length"] = req.data.length;

req.on("error", (err) => {
  console.log("오류 발생 : " + err.message);
});

req.write(req.data);
req.end();
