<template>
  <div >
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/shop" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  
};
</script>

<style lang="less" scoped></style>
