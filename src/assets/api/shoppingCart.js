var express = require("express"); // express框架
var router = express.Router();
var $sql = require("./sqlmap"); // sql语句
var conn = require("./connect");
var mysql = require("mysql");
var jsonWrite = require("./jsonWrite");

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
