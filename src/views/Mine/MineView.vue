<template>
    <div class="mine">
        <div class="login-box">
            <router-view></router-view>
            <div class="head-portrait" @click="shadeOpenClick">
                <img src="../../assets/img/unhead.png" alt="" />
            </div>
            <div class="userinfo" @click="shadeOpenClick">
                <div class="username">未登录</div>
                <div class="gt">&gt;</div>
            </div>
        </div>
        <!-- 四宫格 -->
        <van-grid :gutter="50" column-num="2" class="grid">
            <van-grid-item icon="orders-o" text="我的订单" class="grid" to="/mine/order" />
            <van-grid-item icon="location-o" text="地址管理" class="grid" to="/mine/address" />
            <van-grid-item icon="star-o" text="我的收藏" class="grid" to="/mine/collect" />
            <van-grid-item icon="records" text="意见反馈" class="grid" to="/mine/feedback" />
        </van-grid>
        <!-- 遮罩 -->
        <van-overlay :show="show" @click="show = false">
            <!-- 登录模态框 -->

            <div class="login-modal" @click.stop>
                <div class="back" @click="show = false">×</div>
                <input type="text" name="" id="username" placeholder="请输入用户名" @keyup="btKeyUp" v-model="userName" />
                <input type="password" name="" id="psd" placeholder="请输入密码" />
                <drag-verify :width="210" class="checking" :height="30" text="请将滑块拖动到最右侧" ref="Verify" text-size="12"></drag-verify>
                <div class="login">登录</div>
                <div class="signin">注册</div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
// 滑块验证码组件
import dragVerify from "vue-drag-verify";
export default {
    data() {
        return {
            show: false,
            userName: "",
        };
    },
    components: {
        // 滑块验证码组件
        dragVerify,
    },
    methods: {
        // 登录模态框的显示
        shadeOpenClick() {
            this.show = true;
        },
        // 限制用户名输入框只能输入数字与英文
        btKeyUp(e) {
            //没有显示‘破折号’和 '.' 需要的可以手动加上
            this.userName = e.target.value.replace(/[\u4e00-\u9fa5/\s+/]|[`~!@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~！@#￥%……&*（）—— \+ ={}|《》？：“”【】、；‘’，。、.]/g, "");
            console.log(this.userName);
        },
    },
};
</script>

<style lang="less" scoped>
.mine {
    background-image: linear-gradient(0deg, #c4e2ff, #dbecfd, #eff7ff, #ffffff);
    width: 100%;
    height: 100vh;
    position: relative;

    .login-box {
        height: 160px;
        // width: 200%;
        background-image: linear-gradient(0deg, #c4e2ff, #dbecfd, #eff7ff, #ffffff);
        display: flex;
        align-items: center;
        border-radius: 0 0 50% 50%;
        padding-bottom: 20px;
        box-sizing: border-box;
        .head-portrait {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 50px;

            img {
                width: 100%;
            }
        }
        .userinfo {
            display: flex;
            align-items: center;
            .username {
                color: rgb(77, 89, 92);
                font-weight: 600;
                margin-left: 30px;
                margin-right: 130px;
            }
            .gt {
                font-family: "黑体";
                font-weight: 520;
                font-size: 18px;
            }
        }
    }
    .grid {
        margin-top: 50px;
    }
    .login-modal {
        position: fixed;
        left: 50%;
        top: 50%;
        height: 300px;
        width: 300px;
        background-color: #fff;
        border-radius: 15px;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .back {
            position: absolute;
            top: 6px;
            right: 10px;
            font-size: 30px;
        }
        input {
            outline-width: 1px;
            border: 1px solid #abb1b8;
            text-indent: 10px;
            border-radius: 5px;
            height: 30px;
        }
        .login {
            padding: 10px 30px;
            background-color: #89c6ff;
            border-radius: 10px;
            color: #fff;
        }
        .signin {
            font-size: 12px;
            color: #89c6ff;
        }
    }
}
</style>
