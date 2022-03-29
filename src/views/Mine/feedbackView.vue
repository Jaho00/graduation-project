<template>
    <div class="feedback">
        <!-- 导航栏 -->
        <van-nav-bar title="意见反馈" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- 留言 -->
        <van-field v-model="message" rows="6" autosize label="留言" type="textarea" maxlength="500" placeholder="请输入留言" show-word-limit />

        <div class="btn-container" @click="submitMessage">
            <a href="#" class="btn-3d blue">提交</a>
        </div>
    </div>
</template>

<script>
// 轻提示
import { Toast } from "vant";
// 通知提示
import { Notify } from "vant";
import { submitMessageAPI } from "@/request/api";
import "@/assets/css/feedbackButton.css";
export default {
    data() {
        return {
            message: "",
        };
    },
    methods: {
        // 返回按钮的跳转
        onClickLeft() {
            this.$router.push("/mine");
        },
        async submitMessage() {
            let userid = localStorage.getItem("id");
            let opinion = this.message;

            if (opinion == "") {
                Notify({ type: "warning", message: "请输入留言!" });
                return;
            }
            let res = await submitMessageAPI({
                userid,
                opinion,
            });
            if (res.code == 200) {
                Toast.success("留言成功");
                this.message = "";
            } else {
                Toast.fail("留言失败");
            }
        },
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
