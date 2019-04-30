<template>
  <router-link :to="`/goodsDetail/${data.goods_id}`"
               class="goods">
    <img v-lazy="data.goods_image"
         alt="" />
    <div class="msg">
      <p class="goods-name">{{data.goods_name}}</p>
      <p class="goods-price-sale">
        <span class="goods-price"><em>￥</em>{{data.goods_price}}</span>
        <span class="goods-sale">已售出 {{data.goods_salenum}}</span>
      </p>
      <p class="seller-name">{{data.seller_name}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/pub";

.goods {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
  img {
    width: 218px;
    height: 218px;
    margin-right: 20px;
  }
  .msg {
    height: 218px;
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 29px;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .goods-price {
      font-size: 36px;
      color: $active_background_color;
      em {
        font-style: normal;
        font-size: 19px;
      }
    }
    .goods-sale {
      font-size: 23px;
      color: #999;
      float: right;
    }
    .seller-name {
      font-size: 25px;
    }
  }
}
</style>
