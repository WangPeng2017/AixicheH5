<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">支付成功</x-header>
      <div class="tutu">
        <i class="red_success"></i>
        <p class="succe">支付成功！</p>
      </div>
      <div class="main">
        <p class="title">支付金额:<span class="price">￥{{$route.params.price}}</span></p>
        <p class="orderNumber">付款方式：微信</p>
        <p class="orderNumber">收款方：红幸云商</p>
        <router-link to="/home" class="button">确定</router-link>
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
  @import "../../../assets/css/pub";
  .tutu{
    width:96%;
    margin: 2%;
    background: #fff;
    height: 303px;
    text-align: center;
    i{
      margin-top: 5%;
    }
    .succe{
      margin-top: 4.5%;
      font-size:32px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
  }
  .main {
    width:96%;
    height: 180px;
    margin: 2%;
    background: #fff;
    text-align: left;
    padding: 3%;
    p{
      margin-top: 1.3%;
      font-size:24px;
    }
    .title {
      color: #000;
      margin-left: 3%;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
    .price {
      color: $default_price_color;
      margin-left: 3%;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color: #ff0036;
    }
    .orderNumber {
      margin-left: 3%;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
    .button {
      width: 75%;
      height: 70px;
      background-color: #ff0036;
      color: #fff;
      font-size: 32px;
      text-align: center;
      line-height: 68px;
      border: 0;
      box-sizing: border-box;
      display: block;
      border-radius: 10px;
      margin: 80px auto 0;
    }
  }
</style>
