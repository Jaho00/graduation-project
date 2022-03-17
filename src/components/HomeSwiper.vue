<template>
    <div class="homeSwiper">
        <div class="box">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item><img src="../assets/img/Ethiopian-grapefruit-black-tea.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Hazelnut-white-coincidence.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Jackfruit-anaerobic-sun-exposure.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Raspberry-fruit-stuffing.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Rwandan-raisins-are-sunburned.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Super-sunbathing-in-Colombia.jpg" alt="" /></van-swipe-item>
                <van-swipe-item><img src="../assets/img/Yunnan-apricot-cocoa.jpg" alt="" /></van-swipe-item>
            </van-swipe>
        </div>
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
