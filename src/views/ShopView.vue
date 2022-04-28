<template>
    <div class="shop">
        <div class="title">购物车</div>
        <!-- 滚动通知 -->
        <van-notice-bar left-icon="volume-o" text="乔治队长 哥伦比亚手冲拼配咖啡豆草莓蜜桃双重厌氧冷泡150g包邮 限时8折优惠" class="inform" />
        <!-- 商品 -->

        <ShopProducts></ShopProducts>
        <!-- 提交订单 -->
        <van-submit-bar :price="0" button-text="提交订单" @submit="onSubmit" class="submit-your-order">
            <van-checkbox v-model="checkAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import ShopProducts from "@/components/ShopProducts.vue";
export default {
    data() {
        return {
            Url: require("../assets/img/ROMANTIC-STRAWBERRY-150G.jpg"),
        };
    },
    
    computed: {
        checkAll: {
            get() {
                // 受checkList数组的影响,所以写成计算属性:
                // checkList中,只要有一个(包含)false, checkAll就应该是false, 即return false
                if (this.checkList != null) {
                    return false;
                }
            },
            set(newVal) {
                // console.log("执行了set",newVal);
                // 用户点击全选按钮, 是在修改checkAll的值, 选中后值就是true, 取消选中,值就为假
                // checkAll的值就是true,  checkList的值就应该都为true
                // checkAll的值就是false,  checkList的值就应该都为false
                // checkList里面的每一个元素都应该被修改成 newVal
                this.checkList = this.checkList.map(item => newVal);
            },
        },
    },
    components: {
        ShopProducts,
    },
    methods: {
        onSubmit() {},
    },
};
</script>

<style lang="less" scoped>
.shop {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(180deg, #c4e2ff, #dbecfd, #eff7ff, #ffffff);
    .submit-your-order {
        margin-bottom: 50px;
    }
    .title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 20px;
        font-weight: 520;
        font-family: Tahoma, Helvetica, Arial;
    }

    .inform {
        margin-bottom: 8px;
    }
}
</style>
