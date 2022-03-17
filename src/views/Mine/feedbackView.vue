<template>
    <div class="feedback">
        <!-- 导航栏 -->
        <van-nav-bar title="意见反馈" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- 留言 -->
        <van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="500" placeholder="请输入留言" show-word-limit />
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
.feedback {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 999;
}
</style>
