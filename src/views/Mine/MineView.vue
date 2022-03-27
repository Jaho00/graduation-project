<template>
    <div class="mine" :key="refresh">
        <router-view></router-view>
        <div class="unlogin-box" v-show="!isShowlogin">
            <div class="head-portrait" @click="shadeOpenClick">
                <img src="https://s2.loli.net/2022/03/23/L7AefwBqNhGSj3T.png" alt="" />
            </div>
            <div class="userinfo" @click="shadeOpenClick">
                <div class="username">未登录</div>
                <div class="gt">&gt;</div>
            </div>
        </div>
        <div class="login-box" v-show="isShowlogin">
            <div class="head-portrait">
                <van-uploader :after-read="afterRead" />
            </div>
            <div class="userinfo">
                <div class="l_username">{{ userInfo.username }}</div>
                <van-button
                    class="relogin"
                    type="danger"
                    @click="relogin"
                    size="mini"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    :round="true"
                    >退出登录</van-button
                >
            </div>
        </div>
        <!-- 四宫格 -->
        <van-grid :gutter="50" column-num="2" class="grid">
            <van-grid-item icon="orders-o" text="我的订单" class="grid" @click="fm('order')" />
            <van-grid-item icon="location-o" text="地址管理" class="grid" @click="fm('address')" />
            <van-grid-item icon="star-o" text="我的收藏" class="grid" @click="fm('collect')" />
            <van-grid-item icon="records" text="意见反馈" class="grid" @click="fm('feedback')" />
        </van-grid>
        <!-- 遮罩 -->
        <van-overlay :show="show" @click="(show = false), (isShowModal = true)">
            <!-- 登录模态框 -->
            <div class="login-modal" @click.stop v-show="isShowModal">
                <div class="back" @click="show = false">×</div>
                <input type="text" name="" id="username" placeholder="请输入用户名" v-model="username" />
                <input type="password" name="" id="psd" placeholder="请输入密码" v-model="password" ref="l_psd_inp" />

                <drag-verify
                    ref="dragVerify7"
                    :height="34"
                    :width="201"
                    :isPassing.sync="isPassing7"
                    completedBg="#93a6ff"
                    text="请按住滑块拖动"
                    successText="验证通过"
                    handlerIcon="el-icon-d-arrow-right"
                    successIcon="el-icon-circle-check"
                    handlerBg="#fff"
                    @passcallback="passcallback3"
                >
                </drag-verify>
                <div class="login" @click="loginClick">登录</div>
                <div class="signin" @click="isShowModal = false">注册</div>
            </div>
            <!-- 注册模态框 -->
            <div class="sigin-modal" @click.stop v-show="!isShowModal">
                <div class="back" @click="(show = false), (isShowModal = true)">×</div>
                <input type="text" name="" id="s_username" placeholder="请输入用户名" v-model="s_username" />
                <input type="password" name="" id="s_psd" placeholder="请输入密码" v-model="s_password" />
                <input type="text" name="" id="s_phone" placeholder="请输入手机号" v-model="s_userphone" />
                <drag-verify
                    ref="dragVerify7"
                    :height="34"
                    :width="201"
                    :isPassing.sync="isPassing7"
                    completedBg="#93a6ff"
                    text="请按住滑块拖动"
                    successText="验证通过"
                    handlerIcon="el-icon-d-arrow-right"
                    successIcon="el-icon-circle-check"
                    handlerBg="#fff"
                    @passcallback="passcallback3"
                >
                </drag-verify>
                <div class="login" @click="sigin">注册</div>
                <div class="signin" @click="isShowModal = true">登录</div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
// 通知
import { Notify } from "vant";
import axios from "axios";
// 滑块验证码
import dragVerify from "vue-drag-verify2";
// 验证工具
import { validateUserName, validatePassword, validatePhoneNumber } from "@/utils";
// 请求API
import { getUserInfoAPI, uploadHeadImgAPI, idGetUserInfoAPI, userRegistrationAPI } from "@/request/api";
export default {
    data() {
        return {
            show: false,
            // 登录的用户名和密码
            username: "",
            password: "",
            // 注册的用户名、密码和电话
            s_username: "",
            s_password: "",
            s_userphone: "",
            // 滑块验证码的状态
            isPassing7: false,
            // 登录界面的显示与隐藏
            isShowlogin: false,
            // 登录框和注册框的显示与隐藏
            isShowModal: false,
            userInfo: [],
            // key值
            refresh: 0,
            // 验证通过的布尔值
            isPass: false,
            // 登录框内:判断是否要发送请求,防止多次点击而后多次发送请求导致后端出问题
            isGet: false,
        };
    },
    components: {
        // 滑块验证码
        dragVerify,
    },
    created() {
        let token = localStorage.getItem("token");
        let id = localStorage.getItem("id");
        this.userInfo = [];
        if (!token) {
            return;
        }
        this.isShowlogin = true;
        setTimeout(async () => {
            let res = await idGetUserInfoAPI({ id });
            // console.log(res.data[0]);
            this.userInfo = res.data[0];
        }, 100);
    },
    methods: {
        // 登录模态框的显示
        shadeOpenClick() {
            this.show = true;
        },
        // 登录按钮
        async loginClick() {
            // 验证用户名是否为空
            if (this.username == "") {
                Notify({ type: "warning", message: "账号不能为空!" });
                return;
            }

            // 限制账号必须字母开头，只允许长度5-16，字母数字下划线!
            if (!validateUserName(this.username)) {
                Notify({ type: "warning", message: "账号必须字母开头，只允许长度5-8，字母数字下划线!" });
                return;
            }

            // 请求用户数据,并用isGet判断是否已经请求过一次有内容的数据
            if (this.isGet == false) {
                // setTimeout(() => {
                let res = await getUserInfoAPI({
                    username: this.username,
                });

                this.userInfo = res.data[0];
                this.isGet = true;
                // }, 100);
            }
            // console.log(res);
            // console.log(data);
            console.log(this.userInfo);

            // 验证账号是否注册
            if (this.userInfo == undefined || this.userInfo.length == 0) {
                Notify({ type: "warning", message: "您输入的账号未注册,请先注册账号!" });
                // this.isShowModal = false;
                this.show = true;
                this.isGet = false;
                // console.log(this.userInfo);
                // console.log(1);
                return;
            }
            // 验证账号是否有误
            if (this.username != this.userInfo.username) {
                Notify({ type: "warning", message: "您输入的账号有误或未注册!" });
                this.show = true;
                this.isGet = false;
                return;
            }
            // 验证密码是否为空
            if (this.password == "") {
                Notify({ type: "warning", message: "密码不能为空!" });
                return;
            }
            // 密码正确性校验
            if (this.password != this.userInfo.password) {
                Notify({ type: "warning", message: "密码错，请重新输入！" });
                this.password = "";
                this.$nextTick(() => {
                    //正确写法
                    this.$refs.l_psd_inp.focus();
                });

                // this.reset_d();
                return;
            }
            // 滑块校验
            if (this.isPass == false) {
                Notify({ type: "warning", message: "请把滑块滑至正确的位置!" });
                return;
            }
            let token = this.userInfo.token;
            let id = this.userInfo.id;
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            this.isShowlogin = true;
            this.show = false;
            Notify({ type: "success", message: "登录成功!" });
            // this.reset_d();
            // }
        },
        // 滑块验证码成功的回调函数
        passcallback3() {
            this.isPass = true;
        },
        // 退出登录
        relogin() {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            // 切换回未登录的状态
            this.isShowlogin = false;
            // 恢复验证码为未认证的状态
            this.isPassing7 = false;
            this.isPass = false;
            // 更改key值实现页面重载以重置验证码未认证的状态
            this.refresh++;
        },
        // 功能模块验证是否登录,未登录无法使用,登录后即可跳转至功能模块内
        fm(type) {
            let token = localStorage.getItem("token");
            if (!token) {
                Notify({ type: "warning", message: "请先登录，才能使用该功能！" });
                return;
            }
            this.$router.push("/mine/" + type);
        },
        // 注册按钮
        async sigin() {
            // 验证用户名是否为空
            if (this.s_username == "") {
                Notify({ type: "warning", message: "账号不能为空!" });
                return;
            }

            // 验证用户名是否按要求填写
            if (!validateUserName(this.s_username)) {
                Notify({ type: "warning", message: "账号必须字母开头，长度在 5-16 之间，可以使用字母数字下划线!" });
                return;
            }

            // 验证密码是否为空
            if (this.s_password == "") {
                Notify({ type: "warning", message: "密码不能为空!" });
                return;
            }

            // 验证密码是否按要求填写
            if (!validatePassword(this.s_password)) {
                Notify({ type: "warning", message: "密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在5-15之间!" });
                return;
            }

            // 验证密码是否为空
            if (this.s_userphone == "") {
                Notify({ type: "warning", message: "手机不能为空!" });
                return;
            }

            // 验证手机号是否正确
            if (!validatePhoneNumber(this.s_userphone)) {
                Notify({ type: "warning", message: "请输入正确的手机号!" });
                return;
            }

            // 滑块校验
            if (this.isPass == false) {
                Notify({ type: "warning", message: "请把滑块滑至正确的位置!" });
                return;
            }

            // 发送注册请求
            let res = await userRegistrationAPI({
                username: this.s_username,
                password: this.s_password,
                userphone: this.s_userphone,
            });
            console.log(res.code);
            if (res.code == 200) {
                // 发送用户信息请求
                let res1 = await getUserInfoAPI({
                    username: this.s_username,
                });
                this.userInfo = res1.data[0];
                // 设置token和id
                let token = this.userInfo.token;
                let id = this.userInfo.id;
                localStorage.setItem("token", token);
                localStorage.setItem("id", id);
                // 切换为登录状态
                this.isShowlogin = true;
                // 关闭注册界面
                this.show = false;
                Notify({ type: "success", message: "注册成功,已为您自动登录!" });
            } else {
                Notify({ type: "warning", message: "注册失败!" });
            }
        },
        // 上传文件
        async afterRead(file) {
            console.log(file.file);
            var formdata = new FormData();
            formdata.append("smfile", file.File);
            console.log(formdata.get("smfile"));
            let res = await uploadHeadImgAPI({
                id: 4,
                smfile: formdata.get("smfile"),
            });
            /* axios.post(
                "",
                {
                    smfile: formdata,
                    format: "json",
                },
            ); */
            console.log(res);
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

    .unlogin-box,
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
            .l_username {
                color: rgb(77, 89, 92);
                font-weight: 600;
                margin-left: 6vw;
                margin-right: 20vw;
            }
            .relogin {
                font-size: 12px;
            }
        }
    }
    .grid {
        margin-top: 50px;
    }
    .login-modal,
    .sigin-modal {
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
        .drag_verify[data-v-1fcc95d8] {
            border: 2px solid #eee;
        }
    }
}
</style>
