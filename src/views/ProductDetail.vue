<template>
    <div class="productdetail">
        <!-- 导航栏 -->
        <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-image width="100%" height="" :src="productInfo.imgsrc" />
        <div class="title_box">
            <div class="price">￥{{ productInfo.price }}</div>
            <div class="title">{{ productInfo.name }} {{ productInfo.describe }}</div>
        </div>
        <div class="num_box">
            <div class="text">请选择购买商品的数量：</div>
            <van-stepper v-model="num" theme="round" button-size="22" disable-input @change="numChange" />
        </div>

        <van-goods-action :key="shopCarNumChan">
            <van-goods-action-icon icon="cart-o" text="购物车" to="/shop" :badge="shopCarNum" />
            <van-goods-action-icon :icon="favorites_icon" :text="favorites_text" color="#ff5000" @click="favoritesChan" />
            <van-goods-action-button type="warning" text="加入购物车" @click="shopBtnClick" />
        </van-goods-action>
        <div class="clear"></div>
    </div>
</template>

<script>
// 引入轻提示
import { Toast } from "vant";
import { idGetProductInfoAPI, getShopCartAPI, addShoppingAPI, addFavoritesAPI, deleteFavoritesAPI, idGetFavoritesAPI } from "@/request/api";
export default {
    data() {
        return {
            productInfo: {},
            favorites_icon: "star-o",
            favorites_text: "收藏",
            num: 1,
            shopCarNum: "",
            shopCarNumChan: 0,
        };
    },
    async created() {
        let userid = localStorage.getItem("id");
        let res = await idGetProductInfoAPI({
            id: this.$route.query.productid,
        });
        if (res.code == 200) {
            this.productInfo = res.data[0];
            console.log(this.productInfo);
            this.getShopInfo();
        }
        let res1 = await idGetFavoritesAPI({
            userid,
            productid: this.$route.query.productid,
        });
        if (res1.data.length == 0) {
            this.favorites_icon = "star-o";
            this.favorites_text = "收藏";
        } else {
            this.favorites_icon = "star";
            this.favorites_text = "已收藏";
        }
    },
    methods: {
        // 返回按钮跳转
        onClickLeft() {
            this.$router.push("/home");
            this.isListShow = true;
        },
        async shopBtnClick() {
            let userid = localStorage.getItem("id");

            let res = await addShoppingAPI({
                userid,
                productid: this.$route.query.productid,
                num: this.num,
            });
            if (res.code == 200) {
                Toast.success("加入购物车成功");
                this.getShopInfo();
            }
        },
        numChange(val) {
            this.num = val;
        },
        async getShopInfo() {
            let userid = localStorage.getItem("id");

            let res1 = await getShopCartAPI({
                userid,
            });
            if (res1.code == 200) {
                if (res1.data.length != 0) {
                    this.shopCarNum = res1.data.length;
                    this.shopCarNumChan++;
                }
            }
        },
        async favoritesChan(e) {
            let userid = localStorage.getItem("id");

            this.favorites_icon == "star-o" ? (this.favorites_icon = "star") : (this.favorites_icon = "star-o");
            this.favorites_text == "收藏" ? (this.favorites_text = "已收藏") : (this.favorites_text = "收藏");
            if (this.favorites_text != "收藏") {
                let res = await addFavoritesAPI({
                    userid,
                    productid: this.$route.query.productid,
                });
            }
            if (this.favorites_text != "已收藏") {
                let res = await deleteFavoritesAPI({
                    userid,
                    productid: this.$route.query.productid,
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.productdetail {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #f0f0f0;
    height: 100vh;
    .clear {
        height: 50px;
    }
    .title_box {
        margin: 1.5vw 1vw;
        background-color: #fff;
        border-radius: 12px;
        .title {
            padding: 0 20px 20px 20px;
            text-align: left;
            line-height: 6vw;
            font-size: 4vw;
            font-weight: bold;
        }
        .price {
            padding: 20px;
            color: #f24c05;
            text-align: left;
        }
    }
    .num_box {
        background-color: #fff;
        border-radius: 12px;
        margin: 1.5vw 1vw;
        display: flex;
        height: 13vw;
        justify-content: center;
        align-items: center;
    }
}
</style>
