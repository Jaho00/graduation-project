<template>
    <div class="address">
        <!-- 导航栏 -->
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- 地址管理 -->
        <van-address-list
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            :switchable="false"
            v-show="isListShow"
            :key="updateAddressKey"
        />

        <van-address-edit :show-area="false" show-detail @save="onSave" v-show="!isListShow" :address-info="addressInfo">
            <div class="van-address-edit__buttons cancel">
                <button @click="cancel" class="van-button van-button--default van-button--normal van-button--block van-button--round cancel">
                    <div class="van-button__content"><span class="van-button__text">返回</span></div>
                </button>
            </div>
        </van-address-edit>
    </div>
</template>

<script>
// 轻提示
import { Toast } from "vant";
// 引入省市区数据
import { areaList } from "@vant/area-data";
import { updateAddressAPI, idGetUserInfoAPI } from "@/request/api";
export default {
    data() {
        return {
            list: [
                {
                    id: "",
                    name: "",
                    tel: "",
                    address: "",
                    isDefault: true,
                },
            ],
            isListShow: true,
            addressInfo: {
                id: "",
                name: "",
                tel: "",
                address: "",
            },
            updateAddressKey: 1,
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        onAdd() {
            Toast("新增地址");
        },
        // 编辑地址按钮
        onEdit(item, index) {
            this.isListShow = !this.isListShow;
        },
        // 返回按钮跳转
        onClickLeft() {
            this.$router.push("/mine");
            this.isListShow = true;
        },
        async onSave(e) {
            console.log(e);
            let id = localStorage.getItem("id");
            let ari = this.addressInfo;
            if (e.name == ari.name && e.addressDetail == ari.addressDetail && e.tel == ari.tel) {
                Toast.fail("您的地址信息未修改！");

                return;
            }

            let res = await updateAddressAPI({
                id,
                addressee: e.name,
                address: e.addressDetail,
                addresseePhone: e.tel,
            });

            if (res.code == 200) {
                await this.getUserInfo();
                this.updateAddressKey++;
                this.isListShow = !this.isListShow;
                console.log(this.updateAddressKey);
            } else {
                Toast.fail(res.msg);
            }
        },
        async getUserInfo() {
            let id = localStorage.getItem("id");
            let res = await idGetUserInfoAPI({
                id,
            });

            let userinfo = res.data[0];
            let { addressee, addresseePhone, address } = userinfo;
            // console.log(userinfo);
            let List = this.list[0];
            List.id = id;
            List.name = addressee;
            List.address = address;
            List.tel = addresseePhone;
            this.addressInfo = {
                id,
                name: addressee,
                tel: addresseePhone,
                addressDetail: address,
            };
        },
        // 返回按钮
        cancel() {
            this.isListShow = !this.isListShow;
        },
    },
};
</script>

<style lang="less" scoped>
.address {
    width: 100%;
    position: absolute;
    height: 100vh;
    background-color: #fff;
    z-index: 999;
    /deep/.van-address-list__bottom {
        display: none;
    }
    /deep/.van-address-edit__buttons {
        padding: 10px 4px;
    }
    .cancel {
        padding-bottom: 0;
    }
}
</style>
