<template>
    <div class="order">
        <!-- 导航栏 -->
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-card
            :num="item.num"
            :price="item.price + '.00'"
            :desc="item.describe"
            :title="item.name"
            :thumb="item.imgsrc"
            v-for="item in orderForm"
            :key="item.id"
        />
    </div>
</template>

<script>
import { Notify } from "vant";
import { getOrderFormAPI } from "@/request/api";
export default {
    data() {
        return {
            orderForm: [],
        };
    },
    async created() {
        let userid = localStorage.getItem("id");
        let res = await getOrderFormAPI({ userid });
        // console.log(res);
        if (res.code == 200) {
            this.orderForm = res.data;
        } else {
            Notify({ type: "warning", message: res.msg });
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push("/mine");
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
}
</style>
