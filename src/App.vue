<template>
    <div id="app">
        <router-view />
        <div class="box"></div>
        <TopBar v-show="isShowTopBar"></TopBar>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
    data() {
        return {
            isShowTopBar:true
        };
    },
    components: {
        TopBar,
    },
    /* created() {
        console.log(this.$route.path);
    }, */
    watch: {
        // 判断是否进入到我的页面中的功能模块,进入之后隐藏TopBar
        '$route.path': {
            handler(newval,oldval) {
                let arr=[
                    "/collect",
                    "/feedback",
                    "/order",
                    "/address",
                ]
                if (arr.includes(newval)) {
                    this.isShowTopBar=false;
                }else{
                    this.isShowTopBar=true;
                }
            }
        }
    },
};
</script>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
