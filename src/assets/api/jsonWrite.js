module.exports = function (res, ret) {
    if (typeof ret === "undefined") {
        res.json({
            code: 1,
            msg: "操作失败",
        });
    } else {
        res.json({
            code: 200,
            msg: "操作成功",
        });
    }
};
