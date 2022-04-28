<template>
    <div class="order">
        <!-- 导航栏 -->
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-swipe-cell v-for="item in orderForm" :key="item.time">
            <van-card :num="item.num" :price="item.price + '.00'" :desc="item.describe" :title="item.name" :thumb="item.imgsrc" />
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteBtn(item.productid, item.time)" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<script>
import { Notify } from "vant";
// 引入轻提示
import { Toast } from "vant";
// 引入弹出框
import { Dialog } from "vant";
import { getOrderFormAPI, deleteOrderformAPI } from "@/request/api";
export default {
    data() {
        return {
            orderForm: [],
        };
    },
    created() {
        this.getOrderForm();
    },
    methods: {
        onClickLeft() {
            this.$router.push("/mine");
        },
        // 获取订单
        async getOrderForm() {
            let userid = localStorage.getItem("id");
            let res = await getOrderFormAPI({ userid });
            if (res.code == 200) {
                this.orderForm = res.data;
            } else {
                Notify({ type: "warning", message: res.msg });
            }
        },
        // 删除按钮
        deleteBtn(productid, time) {
            console.log(time);
            Dialog.confirm({
                title: "确认要删除订单吗?",
                message: "删除订单的同时，订单也会自动取消！",
            })
                .then(async () => {
                    // on confirm
                    let userid = localStorage.getItem("id");
                    let res = await deleteOrderformAPI({
                        userid,
                        productid,
                        time: this.myTimeToLocal(time),
                    });

                    if (res.code == 200) {
                        Toast.success("删除订单成功!");
                        await this.getOrderForm();
                    } else {
                        Toast.fail(res.msg);
                    }
                })
                .catch(() => {
                    // on cancel
                });
        },
        // 时间转换
        myTimeToLocal(inputTime) {
            if (!inputTime && typeof inputTime !== "number") {
                return "";
            }
            var localTime = "";
            inputTime = new Date(inputTime).getTime();
            const offset = new Date().getTimezoneOffset();
            localTime = new Date(inputTime - offset * 60000).toISOString();
            localTime = localTime.substr(0, localTime.lastIndexOf("."));
            localTime = localTime.replace("T", " ");
            return localTime;
        },
    },
};
</script>

<style lang="less" scoped>
.order {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 999;
    .van-card__price {
        color: #fb5103;
        font-weight: bold;
    }
    .van-card__title {
        width: 215px;
        display: block;
        overflow: hidden; //超出一行文字自动隐藏
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
    }
    .delete-button {
        height: 100%;
    }
    /deep/.van-swipe-cell {
        margin-bottom: 10px;
    }
}
</style>
