// node后端服务器
const userinfoApi = require("./user"); // 后台接口文件
const productinfoApi = require("./product");
const shoppingCartApi = require("./shoppingCart");
const express = require("express"); // express框架

const bodyParser = require("body-parser");
// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析

const app = express();

//允许接口跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/ else next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
app.use("/Mine", userinfoApi); // 使用user文件中的接口
app.use("/Product", productinfoApi); // 使用product文件中的接口
app.use("/ShoppingCart", shoppingCartApi); // 使用shoppingCart文件中的接口

// 监听端口
app.listen(8080); // 监听server9090端口，端口可以自己改
