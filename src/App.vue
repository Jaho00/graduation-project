<template>
    <div id="app">
        <router-view />
        <div class="box"></div>
        <TopBar></TopBar>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
    data() {
        return {};
    },
    components: {
        TopBar,
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
