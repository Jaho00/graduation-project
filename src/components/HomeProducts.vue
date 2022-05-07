<template>
    <div>
        <van-divider :style="{ color: '#978b8d', borderColor: '#978b8d', padding: '0 16px' }">全部商品</van-divider>
        <van-grid :border="true" :column-num="2" :gutter="15" :clickable="true">
            <van-grid-item v-for="item in productInfo" :key="item.id" :to="{ path: '/productdetail', query: { productid: item.id } }">
                <van-image :src="item.imgsrc" radius="10px" />
                <div class="title">{{ item.name }}</div>
                <div class="price">{{ item.price | priceForm }}</div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { getProductInfoAPI } from "@/request/api";
export default {
    data() {
        return {
            productInfo: [],
        };
    },
    created() {
        setTimeout(async () => {
            let res = await getProductInfoAPI();
            if (res.code == 200) {
                // console.log(res.data);
                this.productInfo = res.data;
            }
        });
    },
    filters: {
        priceForm: function (value) {
            return "￥" + value.toFixed(1);
        },
    },
};
</script>

<style lang="less" scoped>
.title {
    margin-top: 10px;
    width: 38vw;
    text-overflow: ellipsis; // 用省略号
    overflow: hidden; // 超出部分隐藏
    white-space: nowrap; // 文本不换行，这样超出一行的部分被截取，显示...
}
.price {
    margin-top: 10px;
    font-size: 14px;
    color: #fb5103;
    font-weight: bold;
}

/deep/.van-grid-item__content--center {
    // width: 100%;
}
</style>
