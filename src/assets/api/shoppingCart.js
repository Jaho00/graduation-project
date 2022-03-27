var express = require("express"); // express框架
var router = express.Router();
var $sql = require("./sqlmap"); // sql语句
var models = require("./db"); // 引入db配置

var mysql = require("mysql");
var jsonWrite = require("./jsonWrite");

var conn;
//******，下面这段代码主要是为了解决数据一段时间不操作之后出现 reade ECONNRESET 错误，在网上百度了一下这个错，又说是node版本不对，要回退版本，没有这样操作
function handleError() {
    //创建一个mysql连接对象
    conn = mysql.createConnection(models.mysql);

    //连接错误，2秒重试
    conn.connect(function (err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleError, 2000);
        }
    });
    //监听错误
    conn.on("error", function (err) {
        console.log("db error", err);
        // 如果是连接断开，自动重新连接
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleError();
        } else {
            throw err;
        }
    });
    console.log("连接成功");
}
handleError();

// 查询购物车信息
router.get("/search", function (req, res) {
    let sql = $sql.shoppingCart.search;
    let params = req.query;
    conn.query(sql, [params.userid], function (err, result) {
        if (err) {
            res.json({ msg: "查询失败", code: 0 });
        }
        if (result) {
            res.json({ msg: "查询成功", code: 200, data: result });
        }
    });
});

// 购物车添加商品
router.post("/add", (req, res) => {
    var sql = $sql.shoppingCart.add;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid, parms.num], function (err, result) {
        if (err) {
            res.json({ msg: "商品添加失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 删除购物车中的商品
router.post("/del", (req, res) => {
    var sql = $sql.shoppingCart.delete;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid], function (err, result) {
        if (err) {
            res.json({ msg: "商品删除失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

module.exports = router;
