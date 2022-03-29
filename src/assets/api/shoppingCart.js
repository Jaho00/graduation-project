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
    var sql1 = $sql.shoppingCart.p_search;
    var sql2 = $sql.shoppingCart.upshopcart;
    var parms = req.body;

    var s_res = [];

    // 获取购物车信息判断添加的商品有无已添加过
    var p = new Promise((resolve, reject) => {
        conn.query(sql1, [parms.userid, parms.productid], function (err, result) {
            if (err) {
                res.json({ msg: "查询失败", code: 0 });
            }
            if (result) {
                // console.log(, result.length);
                s_res = result.length;
                resolve(result);
                console.log(1111111111);
            }
        });
    }).then(res1 => {
        if (res1.length == 0) {
            // 添加购物车中没有的商品
            console.log(222222);
            conn.query(sql, [parms.userid, parms.productid, parms.num], function (err, result) {
                if (err) {
                    res.json({ msg: "商品添加失败", code: 0 });
                }
                if (result) {
                    jsonWrite(res, result);
                }
            });
        } else if (res1.length == 1) {
            // 修改购物车中重复商品的数量
            let sum_num = +res1[0].num + +parms.num;
            console.log(3333333);
            conn.query(sql2, [sum_num, parms.productid, parms.userid], function (err, result) {
                if (err) {
                    res.json({ msg: "商品添加失败", code: 0 });
                }
                if (result) {
                    jsonWrite(res, result);
                }
            });
        }
    });

    /*  */
});

// 修改商品数量
router.post("/update", (req, res) => {
    var sql = $sql.shoppingCart.upshopcart;
    var parms = req.body;
    conn.query(sql, [parms.num, parms.productid, parms.userid], function (err, result) {
        if (err) {
            res.json({ msg: "商品修改失败", code: 0 });
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
