<template>
    <div class="collect">
        <!-- 导航栏 -->
        <van-nav-bar title="收藏夹" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-swipe-cell v-for="item in favorites" :key="item.id"
            ><van-card :price="item.price + '.00'" :desc="item.describe" :title="item.name" :thumb="item.imgsrc" />
            <template #right>
                <van-button square text="取消收藏" type="warning" class="delete-button" @click="unSell(item.productid, item.name)" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<script>
// 通知提示
import { Notify } from "vant";
// 确认弹出框
import { Dialog } from "vant";
import { getFavoritesAPI, unSellAPI } from "@/request/api";
export default {
    data() {
        return {
            favorites: [],
            key_num: 1,
        };
    },
    created() {
        this.getFavorites();
    },
    methods: {
        onClickLeft() {
            this.$router.push("/mine");
        },
        unSell(productid, message) {
            Dialog.confirm({
                title: "确定要取消收藏",
                message,
            })
                .then(async () => {
                    let userid = localStorage.getItem("id");
                    let res = await unSellAPI({ userid, productid });
                    if (res.code == 200) {
                        Notify({ type: "success", message: "取消收藏成功" });
                        await this.getFavorites();
                        // this.$forceUpdate();
                    } else {
                        Notify({ type: "warning", message: "取消收藏失败" });
                    }
                })
                .catch(() => {
                    // on cancel
                });
        },
        async getFavorites() {
            let userid = localStorage.getItem("id");
            let res = await getFavoritesAPI({ userid });
            if (res.code == 200) {
                this.favorites = res.data;
            } else {
                Notify({ type: "warning", message: res.msg });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.collect {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 999;
    .van-card__title {
        width: 215px;
        display: block;
        overflow: hidden; //超出一行文字自动隐藏
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
    }
    /deep/.van-swipe-cell {
        margin-bottom: 10px;
    }
    /deep/.delete-button {
        height: 100%;
    }
}
</style>
