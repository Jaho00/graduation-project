var express = require("express"); // express框架
var router = express.Router();
var $sql = require("./sqlmap"); // sql语句
var mysql = require("mysql");
var models = require("./db"); // 引入db配置

var jsonWrite = require("./jsonWrite");
var jsonWebToken = require("jsonwebtoken"); // 引入 jsonwebtoken

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

const SECRET_KEY = "JahoCaffee";

/* function query() {
    console.log(new Date());
    var sql = "select * from userinfo";
    conn.query(sql, function (err, res) {
        console.log(res);
    });
}

query();*/

// 登录/查询用户的信息
router.get("/userinfo", function (req, res) {
    let sql = $sql.user.search;
    let params = req.query;
    conn.query(sql, [params.username], function (err, result) {
        if (err) {
            res.json({ msg: "查询失败", code: 0 });
        }
        if (result) {
            res.json({ msg: "查询成功", code: 200, data: result });
        }
    });
});

// 登录/查询用户的信息
router.get("/userinfo/id", function (req, res) {
    let sql = $sql.user.search_id;
    let params = req.query;
    conn.query(sql, [params.id], function (err, result) {
        if (err) {
            res.json({ msg: "查询失败", code: 0 });
        }
        if (result) {
            res.json({ msg: "查询成功", code: 200, data: result });
        }
    });
});

// 用户的注册
router.post("/adduser", (req, res) => {
    var sql = $sql.user.add;
    var parms = req.body;
    let token = jsonWebToken.sign(
        {
            // Payload 部分，官方提供七个字段这边省略，可以携带一些可以识别用户的信息。例如 userId。
            // 千万不要是用敏感信息，例如密码，Payload 是可以解析出来的。
            username: parms.username,
            userphone: parms.userphone,
        },
        SECRET_KEY,
        {
            // expiresIn: "24h", //token有效期
            expiresIn: 60 * 60 * 24 * 365, // 两种写法,
            // algorithm:"HS256"  默认使用 "HS256" 算法
        }
    );

    conn.query(sql, [parms.username, parms.password, parms.userphone, token], function (err, result) {
        if (err) {
            res.json({ msg: "注册失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 头像更改
router.post("/user/upheadPortrait", (req, res) => {
    var sql = $sql.user.upheadPortrait;
    var parms = req.body;
    if (req.method == "POST") {
        var data = [];
        req.on("data", chunk => {
            data.push(chunk);
        });
        req.on("end", () => {
            var buffer = Buffer.concat(data);
            fs.writeFile("./a", buffer, err => {
                if (!err) {
                    res.end("ok");
                }
            });
        });
    }
    conn.query(sql, [imgsrc, parms.id], function (err, result) {
        if (err) {
            res.json({ msg: "头像更改失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 用户地址管理
router.post("/addAddress", (req, res) => {
    var sql = $sql.address.upaddress;
    var parms = req.body;
    conn.query(sql, [parms.addresseePhone, parms.address, parms.addressee, parms.id], function (err, result) {
        if (err) {
            res.json({ msg: "地址添加失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 用户的留言
router.post("/feedback", (req, res) => {
    var sql = $sql.feedback.upfeedback;
    var parms = req.body;
    // let opinion = parms.opinion.toString();
    // console.log(opinion);
    conn.query(sql, [parms.opinion, parms.id], function (err, result) {
        if (err) {
            res.json({ msg: "留言失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 订单查询
router.get("/orderform/search", function (req, res) {
    let sql = $sql.orderform.search;
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

// 提交订单
router.post("/orderform/add", (req, res) => {
    var sql = $sql.orderform.add;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid, parms.num], function (err, result) {
        if (err) {
            res.json({ msg: "提交订单失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 删除订单
router.post("/orderform/delete", (req, res) => {
    var sql = $sql.orderform.delete;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid, parms.time], function (err, result) {
        if (err) {
            res.json({ msg: "删除订单失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 查询收藏夹信息
router.get("/favorites/search", function (req, res) {
    let sql = $sql.favorites.search;
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

// 根据商品id查询收藏夹信息
router.get("/favorites/search/id", function (req, res) {
    let sql = $sql.favorites.search_id;
    let params = req.query;
    conn.query(sql, [params.userid, params.productid], function (err, result) {
        if (err) {
            res.json({ msg: "查询失败", code: 0 });
        }
        if (result) {
            res.json({ msg: "查询成功", code: 200, data: result });
        }
    });
});

// 收藏夹添加
router.post("/favorites/add", (req, res) => {
    var sql = $sql.favorites.add;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid], function (err, result) {
        if (err) {
            res.json({ msg: "收藏失败", code: 0 });
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

// 收藏夹删除
router.post("/favorites/del", (req, res) => {
    var sql = $sql.favorites.delete;
    var parms = req.body;
    conn.query(sql, [parms.userid, parms.productid], function (err, result) {
        console.log(parms.productid);
        if (err) {
            res.json({ msg: "取消收藏失败", code: 0 });
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
module.exports = router;
