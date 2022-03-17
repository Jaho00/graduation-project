<template>
    <div>
        <van-divider :style="{ color: '#978b8d', borderColor: '#978b8d', padding: '0 16px' }">热卖商品</van-divider>
        <van-grid :border="false" :column-num="2" :gutter="20">
            <van-grid-item>
                <van-image src="https://s2.loli.net/2022/03/16/ZL2VUtDKCWhGQPJ.png" radius="10px" />
                <div class="title">标题</div>
                <div class="price">价格</div>
            </van-grid-item>
            <van-grid-item>
                <van-image src="https://s2.loli.net/2022/03/16/mWeUfIjYLatBEc3.png" radius="10px" />
                <div class="title">标题</div>
                <div class="price">价格</div>
            </van-grid-item>
            <van-grid-item>
                <van-image src="https://s2.loli.net/2022/03/16/37atN89CEoiqQfK.png" radius="10px" />
                <div class="title">标题</div>
                <div class="price">价格</div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.title {
    margin-top: 10px;
}
.price {
    margin-top: 10px;
    font-size: 14px;
    color: #fb5103;
    font-weight: bold;
}
</style>
