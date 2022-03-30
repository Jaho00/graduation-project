// sqlmap.js
var sqlMap = {
    // 用户
    user: {
        // search:"select * from userinfo",
        search: "select * from userinfo where username=?", //查询表中是否有
        search_id: "select * from userinfo where id=?", //查询表中是否有
        add: "insert into userinfo(username,password,userphone,token) values (?,?,?,?)", //向数据库的某个表插入数据
        upheadPortrait: "UPDATE userinfo SET imgsrc = ? WHERE id = ?",
    },

    // 地址
    address: {
        upaddress: "UPDATE userinfo SET addresseePhone = ?,address = ?,addressee = ? WHERE id = ?", //修改userinfo中的地址
    },

    // 意见
    feedback: {
        upfeedback: "UPDATE userinfo SET opinion = ? WHERE id = ?", //修改userinfo中的意见
    },

    // 订单
    orderform: {
        search: "SELECT * FROM productinfo p RIGHT JOIN userproducts u on p.id=u.productid WHERE userid = ? ORDER BY time", // 查询用户的订单
        add: "insert into userproducts(userid,productid,num) values (?,?,?)",
    },

    // 收藏夹
    favorites: {
        search: "SELECT * FROM productinfo p RIGHT JOIN favorites f on p.id=f.productid WHERE userid = ? ORDER BY time", // 查询用户的收藏夹
        add: "insert into favorites(userid,productid) values (?,?)",
        delete: "DELETE FROM favorites WHERE userid=? AND productid=?",
    },

    // 商品
    products: {
        search: "select * from productinfo",
        add: "insert into productinfo(name,price,describe,imgsrc) values (?,?,?,?)",
        delete: "DELETE FROM productinfo WHERE id=?",
    },

    // 购物车
    shoppingCart: {
        search: "SELECT * FROM productinfo p RIGHT JOIN `shopping-cart` s on p.id=s.productid WHERE userid = ? ORDER BY time", // 查询购物车信息
        p_search: "SELECT * FROM productinfo p RIGHT JOIN `shopping-cart` s on p.id=s.productid WHERE userid = ? and productid = ?", // 查询购物车信息
        add: "insert into `shopping-cart`(userid,productid,num) values (?,?,?)", //购物车添加商品
        upshopcart: "UPDATE `shopping-cart` SET num = ? WHERE productid = ? and userid = ?", //修改userinfo中的地址
        delete: "DELETE FROM `shopping-cart` WHERE userid=?,productid=?", //删除购物车中的商品
    },
};
module.exports = sqlMap;
