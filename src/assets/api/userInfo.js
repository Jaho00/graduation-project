const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer();
app.listen(8080);
// 监听一个get请求
app.get("/userinfo", (req, res) => {
    res.send({ code: 200, msg: "ok" });
});

server.on("request", (req, res) => {
    // 在代理服务器里面设置允许跨域
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    // 监听浏览器的请求
    if (req.url === "/userinfo") {
        // 请求真正的数据服务器
        http.get("http://127.0.0.1:8080/userinfo", (result) => {
            let data = "";
            result.on("data", (chunk) => (data += chunk));
            result.on("end", () => {
                // 转发响应的数据回到浏览器
                res.end(data);
            });
        });
    }
});
server.listen(8081);
