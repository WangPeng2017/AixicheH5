<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">支付成功</x-header>
    <div class="content">
      <div class="main">
        <img src="./image/ok.png" alt="">
        <p class="title">您已成功支付金额
        <p class="price">￥{{$route.params.price}}</p>
        <p class="orderNumber">订单编号：{{$route.params.id}}</p>
        <router-link to="/home" class="button">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    components: {
      XHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .main {
    text-align: center;
    line-height: 1;
    img {
      width: 188px;
      height: 188px;
      margin-top: 73px;
    }
    .title {
      font-size: 32px;
      color: #000;
      margin-top: 49px;
    }
    .price {
      font-size: 42px;
      color: $default_price_color;
      margin-top: 39px;
    }
    .orderNumber {
      margin-top: 38px;
      font-size: 24px;
    }
    .button {
      width: 326px;
      height: 70px;
      background-color: #fff;
      color: #333;
      font-size: 32px;
      text-align: center;
      line-height: 68px;
      border: solid 1px rgba(0, 0, 0, 0.3);/*no*/
      box-sizing: border-box;
      display: block;
      border-radius: 10px;
      margin: 80px auto 0;
    }
  }
</style>
