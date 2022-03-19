// sqlmap.js
var sqlMap = {
    // home    增 删 改 查
    user: {
        search: "select * from userinfo", //查询数据库的某个表的数据
        add: "insert into tb_name(src,url) values (?,?)", //向数据库的某个表插入数据
        delete: "DELETE FROM tb_namer WHERE id=?", //删除某个表的某条数据 id
        updata: "UPDATE tb_name SET src = ?,url = ? WHERE Id = ?", //修改某个表的某条数据
    },
    orderform: {
        search: "SELECT * FROM productinfo p RIGHT JOIN userproducts u on p.id=u.productid,ORDER BY userid",
    },
    // //message 自己做了一个简单的留言和回复查询
    // message: {
    //     add: "insert into tb_message(titile,content,phone,qq) values (?,?,?,?)",
    //     search: "SELECT * FROM tb_message WHERE id=?",
    //     searchall: "SELECT * FROM tb_message",
    //     rep: "UPDATE tb_message SET replay = ? WHERE id=?",
    // },
};
module.exports = sqlMap;
