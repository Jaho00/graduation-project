<template>
    <div class="collect">
        <!-- 导航栏 -->
        <van-nav-bar title="收藏夹" left-text="返回" left-arrow @click-left="onClickLeft" />
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
.collect {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 999;
}
</style>
