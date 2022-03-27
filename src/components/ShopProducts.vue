<template>
  <div class="shop-products">
    <van-card num="2" price="85.00" desc="150g新鲜烘焙" title="乔治队长 哥斯达黎加音乐家莫扎特精品手冲咖啡豆" thumb="https://s2.loli.net/2022/03/16/37atN89CEoiqQfK.png" class="product"> </van-card>
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
.van-card__num {
  border: 1px solid #978b8d;
  border-radius: 10px;
  padding: 1px 8px;
  margin-right: 10px;
}
.van-card__price {
  color: #fb5103;
  font-weight: bold;
}
.product {
  background-color: #fff;
}
.van-card__title {
  width: 215px;
  display: block;
  overflow: hidden; //超出一行文字自动隐藏
  text-overflow: ellipsis; //文字隐藏后添加省略号
  white-space: nowrap; //强制不换行
}
</style>
