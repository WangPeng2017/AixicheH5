<template>
  <div class="card">
    <div class="left">
      <p class="coupon-money">¥<em>{{data.coupon_money}}</em></p>
      <p class="coupon-moneylimit">{{data.coupon_usemode === 0 ? '不限额' : ('满' + data.coupon_ordermoney + '使用')}}</p>

    </div>
    <div class="center">
      <p class="coupon-name">{{data.coupon_name}}</p>
      <p class="coupon-seller">{{data.seller_name}}</p>
      <p class="coupon-goodslimit">{{data.coupon_userange===0 ? '全店商品通用' : '仅限部分商品'}}</p>
      <p class="coupon-usedate">{{data.coupon_usestartdate}}-{{data.coupon_useenddate}}</p>
    </div>
    <div class="right">
      <x-circle class="coupont-percent"
                :percent="data.coupon_percent"
                :stroke-width="6"
                :trail-width="6"
                :stroke-color="['#36D1DC', '#0080ff']"
                trail-color="#fff">
        <p style="color:#36D1DC">{{data.coupon_percent}}%</p>
      </x-circle>
      <a class="coupon-receive" @click="handleClick">立即领取</a>
    </div>
    <div class="yuan1"></div>
    <div class="yuan2"></div>
  </div>
</template>

<script>
  import { XCircle } from 'vux'
  export default {
    components: {
      XCircle
    },
    props: {
      data: {}
    },
    methods: {
      async handleClick () {
        this.$emit('handleClick', this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    position: relative;
    height: 250px;
    margin: 0 20px 20px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    .left {
      width: 240px;
      justify-content: flex-start;
      p {
        text-align: center;
        color: $default_theme_color;
        font-size: $default_middlefont_size;
        @include textHideByLine(1);
        line-height: 1.1;
      }
      .coupon-money {
        font-weight: bold;
        em {
          font-size: 78px;
          font-style: normal;
        }
      }
      .coupon-moneylimit {
        margin-top: 30px;
        overflow: initial;

      }
    }
    .center {
      flex: 1;
      justify-content: center;
      p {
        text-align: left;
        color: $default_title_color;
        font-size: $default_middlefont_size;
        @include textHideByLine(1);
        padding-right: 20px;
      }
      .coupon-name {
        font-weight: bold;
        font-size: $default_largefont_size;
      }
      .coupon-seller {
        margin-top: 14px;
      }
      .coupon-goodslimit {
        margin-top: 14px;
      }
      .coupon-usedate {
        margin-top: 14px;
      }
    }
    .right {
      text-align: center;
      justify-content: flex-end;
      width: 160px;
      background-color: #EBEBEB;
      height: 100%;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      margin: auto;
      .coupont-percent {
        width: 100px;
        height: 100px;
        margin: 50px 30px 20px;
      }
      .coupon-receive {
        margin-top: 30px;
        padding: 8px 20px;
        border-radius: 20px;
        background-color: $default_theme_color;
        color: #fff;
        font-size: $default_smallfont_size;
      }
    }
    .yuan1{
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: $default_background_color;
      left: 530px;
      top: -20px;
    }
    .yuan2{
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: $default_background_color;
      left: 530px;
      top: 230px;
    }
  }


</style>
