import http from "http";

let options = {
  host: "intra.w-asset.co.kr",
  port: 80,
  path: "/DeskPlusEIP/Site/SiteWasset/Pages/EIP/DeskPlusEPDefault.aspx",
};

let req = http.get(options, (res) => {
  let resData = "";
  res.on("data", (chunk) => {
    resData += chunk;
  });

  res.on("end", () => {
    console.log(resData);
  });
});

req.on("error", (err) => {
  console.log("오류 발생 : " + err.message);
});
