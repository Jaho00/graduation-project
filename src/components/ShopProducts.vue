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

<style lang="less" scoped></style>
