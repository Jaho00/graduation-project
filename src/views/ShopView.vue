<template>
    <div class="shop">
        <div class="title">购物车</div>
        <!-- 滚动通知 -->
        <van-notice-bar left-icon="volume-o" :text="preferential_text" class="inform" />
        <!-- 商品 -->

        <van-checkbox-group v-model="checkList" ref="checkboxGroup" :key="splKey">
            <van-swipe-cell class="shop-products" v-for="item in productInfo" :key="item.id">
                <van-checkbox :name="item.productid" class="checkbox">
                    <van-card
                        :num="item.num"
                        :price="item.price + '.00'"
                        :desc="item.describe"
                        :title="item.name"
                        :thumb="item.imgsrc"
                        class="product"
                    >
                    </van-card>
                </van-checkbox>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </van-checkbox-group>
        <!-- 提交订单 -->
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" class="submit-your-order">
            <van-checkbox v-model="checkAll">全选</van-checkbox>
        </van-submit-bar>
        <div class="clear"></div>
    </div>
</template>

<script>
import ShopProducts from "@/components/ShopProducts.vue";
import { getShopCartAPI, deleteShoppingCarProductAPI, submitOrderAPI } from "@/request/api";
// 引入轻提示
import { Toast } from "vant";
export default {
    data() {
        return {
            Url: require("../assets/img/ROMANTIC-STRAWBERRY-150G.jpg"),
            productInfo: [],
            checkList: [],
            splKey: 0,
            preferential_text: "乔治队长 哥伦比亚手冲拼配咖啡豆草莓蜜桃双重厌氧冷泡150g包邮 限时8折优惠",
        };
    },

    created() {
        this.getShopCartProduct();
    },

    computed: {
        total() {
            let pi = this.getpdid();
            let sum = 0;

            for (let j = 0; j < this.checkList.length; j++) {
                if (pi.includes(this.checkList[j])) {
                    for (let l = 0; l < this.productInfo.length; l++) {
                        if (this.checkList[j] == this.productInfo[l].productid) {
                            let pl = this.productInfo[l];
                            sum += pl.num * pl.price;
                        }
                    }
                }
            }
            return sum * 100;
        },
        checkAll: {
            get() {
                // 受checkList数组的影响,所以写成计算属性:
                // checkList中,只要有一个(包含)false, checkAll就应该是false, 即return false
                if (this.checkList.length != this.productInfo.length || this.checkList.length == 0) {
                    return false;
                } else {
                    return true;
                }
            },
            set(newVal) {
                // console.log("执行了set", newVal);
                // 用户点击全选按钮, 是在修改checkAll的值, 选中后值就是true, 取消选中,值就为假
                // checkAll的值就是true,  checkList的值就应该都为true
                // checkAll的值就是false,  checkList的值就应该都为false
                // checkList里面的每一个元素都应该被修改成 newVal
                if (newVal == true) {
                    let pi = [];
                    for (let i = 0; i < this.productInfo.length; i++) {
                        pi.push(this.productInfo[i].productid);
                    }
                    this.checkList = pi;
                } else if (newVal == false) {
                    this.checkList = [];
                }
                // this.checkList = this.checkList.map(item => this.productInfo.productid);
            },
        },
    },
    components: {
        ShopProducts,
    },
    methods: {
        cc() {
            console.log(this.checkList);
        },
        getpdid() {
            let pi = [];
            for (let i = 0; i < this.productInfo.length; i++) {
                pi.push(this.productInfo[i].productid);
            }
            return pi;
        },
        // 提交订单
        async onSubmit() {
            let pi = this.getpdid();
            let userid = localStorage.getItem("id");
            if (this.checkList.length == 0) {
                Toast.fail("您还未选择要购买的商品");
            }

            for (let j = 0; j < this.checkList.length; j++) {
                if (pi.includes(this.checkList[j])) {
                    let res = await deleteShoppingCarProductAPI({
                        userid,
                        productid: this.checkList[j],
                    });
                    if (res.code == 200) {
                        console.log(res.msg);
                    }
                    for (let i = 0; i < this.productInfo.length; i++) {
                        if (this.checkList[j] == this.productInfo[i].productid) {
                            console.log(this.checkList[j]);
                            let num = this.productInfo[i].num;
                            let res1 = await submitOrderAPI({
                                userid,
                                productid: this.checkList[j],
                                num,
                            });
                            if (res1.code == 200) {
                                Toast.success("提交订单成功");
                            }
                        }
                    }
                }
            }
            await this.getShopCartProduct();

            this.checkList = [];
            this.splKey++;
        },
        async getShopCartProduct() {
            let userid = localStorage.getItem("id");
            let res = await getShopCartAPI({
                userid,
            });
            if (res.code == 200) {
                this.productInfo = res.data;
                console.log(res.data);
            } else {
                console.log("查询失败");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.shop {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(180deg, #c4e2ff, #dbecfd, #eff7ff, #ffffff);
    .clear {
        height: 110px;
    }
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
    .van-card__num {
        border: 1px solid #978b8d;
        border-radius: 10px;
        padding: 1px 8px;
        margin-right: 10px;
    }
    .van-card__price {
        color: #fb5103;
        font-weight: bold;
    }
    .product {
        background-color: #fff;
    }
    .van-card__title {
        width: 215px;
        display: block;
        overflow: hidden; //超出一行文字自动隐藏
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
    }
    .checkbox {
        background-color: #fff;
        padding-left: 20px;
    }
    .delete-button {
        height: 100%;
    }
    .shop-products {
        margin-bottom: 10px;
    }
}
</style>
