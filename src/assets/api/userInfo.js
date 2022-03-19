var express = require("express"); // express框架
var router = express.Router();
var $sql = require("./sqlmap"); // sql语句

var conn = require("./connect");

/* function query() {
    console.log(new Date());
    var sql = "select * from userinfo";
    conn.query(sql, function (err, res) {
        console.log(res);
    });
}

query();*/
