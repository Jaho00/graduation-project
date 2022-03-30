<template>
    <div>
        <van-checkbox-group v-model="checkList" ref="checkboxGroup">
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
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            productInfo: [],

            checked: false,
            checkList: [],
            checkAll_num: 1,
            reProductInfo: [],
        };
    },
    async created() {
        await this.asyncgetShopCartProduct();
        this.productInfo = this.productinfo;
        console.log(this.reProductInfo.includes(3));
    },
    computed: {
        ...mapState({
            productinfo: state => state.shopcartproduct.productinfo,
        }),
    },
    methods: {
        ...mapActions({
            asyncgetShopCartProduct: "shopcartproduct/asyncgetShopCartProduct",
        }),
    },
};
</script>

<style lang="less" scoped>
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
</style>
