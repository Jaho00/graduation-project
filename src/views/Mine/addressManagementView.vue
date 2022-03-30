<template>
    <div class="address">
        <!-- 导航栏 -->
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- 地址管理 -->
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />

        <!-- <van-address-edit
            :area-list="areaList"
            show-area
            show-detail
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-detail="onChangeDetail"
        /> -->
    </div>
</template>

<script>
// 轻提示
import { Toast } from "vant";
export default {
    data() {
        return {
            chosenAddressId: "1",
            list: [
                {
                    id: "1",
                    name: "张三",
                    tel: "13000000000",
                    address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                    isDefault: true,
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
            ],
            disabledList: [
                {
                    id: "3",
                    name: "王五",
                    tel: "1320000000",
                    address: "浙江省杭州市滨江区江南大道 15 号",
                },
            ],
            areaList: {
                110000: "北京市",
                120000: "天津市",
            },
            searchResult: [],
        };
    },
    methods: {
        onAdd() {
            Toast("新增地址");
        },
        onEdit(item, index) {
            Toast("编辑地址:" + index);
        },
        // 返回按钮跳转
        onClickLeft() {
            this.$router.push("/mine");
        },
        onSave() {
            Toast("save");
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: "黄龙万科中心",
                        address: "杭州市西湖区",
                    },
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
};
</script>

<style lang="less" scoped>
.address {
    width: 100%;
    position: relative;
    background-color: #fff;
    z-index: 999;
}
</style>
