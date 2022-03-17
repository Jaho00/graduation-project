<template>
    <div class="home">
        <form action="/">
            <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @search="onSearch" />
        </form>
        <HomeSwiper name="swiper"></HomeSwiper>

        <HomeProducts></HomeProducts>
        <div class="box"></div>
    </div>
</template>

<script>
import HomeProducts from "@/components/HomeProducts.vue";
import HomeSwiper from "@/components/HomeSwiper.vue";
export default {
    data() {
        return {
            value: "",
        };
    },
    components: {
        HomeSwiper,
        HomeProducts,
    },
    methods: {
        onSearch() {},
    },
};
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    background-image: linear-gradient(0deg, #c4e2ff, #dbecfd, #eff7ff, #ffffff);
    .box {
        height: 50px;
    }
    .b {
        color: #978b8d;
    }
}
</style>
