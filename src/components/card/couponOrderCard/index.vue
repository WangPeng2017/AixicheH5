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
      <x-circle class="coupon-percent"
                :percent="100"
                :stroke-width="3"
                :trail-width="3"
                :stroke-color="'#0080ff'"
                trail-color="#fff"
                v-if="!edit && data.coupon_usestate===0"
                @click.native="handleClick">
        <p style="color:#0080ff">立即</p>
        <p style="color:#0080ff">使用</p>
      </x-circle>

      <x-circle class="coupon-percent"
                :stroke-width="0"
                :trail-width="0"
                v-if="!edit && data.coupon_usestate===1">
        <p style="color:#81838e">已使用</p>
      </x-circle>

      <x-circle class="coupon-percent"
                :stroke-width="0"
                :trail-width="0"
                v-if="!edit && data.coupon_usestate===2">
        <p style="color:#81838e">已过期</p>
      </x-circle>

      <check-icon v-if="edit" class="coupon-check" :value.sync="data.status" @click.native="handleChange(data)"></check-icon>
    </div>
    <div class="yuan1"></div>
    <div class="yuan2"></div>
  </div>
</template>

<script>
  import { XCircle, CheckIcon } from 'vux'

  export default {
    components: {
      XCircle,
      CheckIcon
    },
    props: {
      data: {},
      edit: false
    },
    methods: {
      async handleClick () {
        this.$emit('handleClick', this.data)
      },
      async handleChange () {
        this.$emit('handleChange', this.data)
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
      display: flex;
      flex-direction: column;
      align-items: center;
      .coupon-percent {
        width: 120px;
        height: 120px;
        margin: auto;
      }
      .coupon-check {
        margin: auto;
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

