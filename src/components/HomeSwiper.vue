<template>
    <div class="homeSwiper">
        <div class="box">
            <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
            >
                <van-swipe-item v-for="(item, index) in img_src" :key="index"
                    ><img :src="item" alt=""
                /></van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img_src: [
                "https://s2.loli.net/2022/03/16/Sa2ulxeDiWYMwmy.jpg",
                "https://s2.loli.net/2022/03/16/6FbyxlpYP5B7IkQ.jpg",
                "https://s2.loli.net/2022/03/16/7eGWqMShHzgE6Pu.jpg",
                "https://s2.loli.net/2022/03/16/mx1Z4qD5V6wSjCo.jpg",
                "https://s2.loli.net/2022/03/16/ax3f1lImQ8ZRibz.jpg",
                "https://s2.loli.net/2022/03/16/iV6BcRHUDKsSxZd.jpg",
            ],
        };
    },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    text-align: center;
    line-height: 1px;
    img {
        width: 100%;
    }
}
.box {
    border-radius: 20px;
    overflow: hidden;
}
.homeSwiper {
    padding: 0 12px;
    margin-bottom: 15px;
}
</style>
