var express = require("express"); // express框架
var router = express.Router();
var $sql = require("./sqlmap"); // sql语句
var conn = require("./connect");
var mysql = require("mysql");
var jsonWrite = require("./jsonWrite");

// 查询商品信息
router.get("/search", function (req, res) {
    let sql = $sql.products.search;
    conn.query(sql, function (err, result) {
        if (err) {
            res.json({ msg: "查询失败", code: 0 });
        }
        if (result) {
            res.json({ msg: "查询成功", code: 200, data: result });
        }
    });
});

// 增加商品
router.post("/add", (req, res) => {
    var sql = $sql.products.add;
    var parms = req.body;
    conn.query(sql, [parms.name, parms.price, parms.describe, parms.imgsrc], function (err, result) {
        if (err) {
            res.json({ msg: "商品添加失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 删除商品
router.post("/del", (req, res) => {
    var sql = $sql.products.delete;
    var parms = req.body;
    conn.query(sql, [parms.id], function (err, result) {
        if (err) {
            res.json({ msg: "商品删除失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
