<template>
  <div class="coupon" :class="{usedCoupon: data.coupon_receive_usestatus !== 0 && data.coupon_receive_usestatus}">
    <div class="title">
      <span>{{data.coupon_name}}</span>
      <span>{{useStatus}}</span>
    </div>
    <div class="warpper">
      <div class="price">
        <span class="number">{{data.coupon_money}}<em>元</em></span>
      </div>
      <div class="des">
        <div class="seller">
          <i class="house-icon"></i>
          <span>{{data.seller_name}}</span>
        </div>
        <p>满{{data.coupon_ordermoney}}元使用</p>
        <p>{{data.coupon_userange === 0 ? '全场通用' : '指定商品'}}</p>
      </div>
      <span class="canpickup" @click="pickupFn" v-if="pickup && data.iscanreceive === 1">领取</span>
      <span class="cantpickup"  v-if="pickup  && data.iscanreceive === 0">已领取</span>
    </div>
    <div class="time">
      <time>有效期至{{data.coupon_useenddate}}</time>
      <router-link :to="`/todayHot?couponId=${data.coupon_id}`" v-if="goodsBtnStatus">点击查看使用商品</router-link>
    </div>
  </div>
</template>

<script>
  import {SET_LOADING} from '@store/type'
  import {mapMutations} from 'vuex'
  import {getCoupon} from '@api'

  export default {
    props: {
      data: {},
      pickup: {
        type: Boolean,
        default: true
      },
      goodsBtnStatus: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      useStatus () {
        switch (this.data.coupon_receive_usestatus) {
          case -1:
            return '过期'
          case 0:
            return '未使用'
          case 1:
            return '已使用'
        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      async pickupFn () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCoupon(`coupon_id=${this.data.coupon_id}`)
        this.setLoading(false)
        if (res.code === 200) {
          this.$toasted.show(res.msg)
          this.$emit('pickup', this.data.coupon_id)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .coupon {
    margin-top: 20px;
    width: 100%;
    height: 175px;/*no*/
    position: relative;
    overflow: hidden;
    background-color: #fff;
    padding: 18px 20px 0;/*no*/
    &.usedCoupon {
      background-color: #e4e4e4;
      &:after, &:before {
        background: radial-gradient(circle, #f5f5f5 0, #f5f5f5 4px, #e4e4e4 4px);/*no*/
        background-size: 13px 13px;/*no*/
        background-position: 0px 5px;/*no*/
      }
      .price {
        .number, em {
          color: #818181!important;
        }
      }
    }

    &:after,&:before {
      content: '';
      width: 10px;/*no*/
      height: 100%;
      position: absolute;
      background: radial-gradient(circle, #f5f5f5 0, #f5f5f5 4px, #fff 4px);/*no*/
      background-size: 13px 13px;/*no*/
      background-position: 0px 5px;/*no*/
    }

    &:before {
      top: -2px;/*no*/
      left: -4px;/*no*/
    }

    &:after {
      top: -2px;/*no*/
      right: -2.5px;/*no*/
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;/*no*/
      color: #333;
      display: flex;
      align-items: center;
      line-height: 1;
      .house-icon {
        margin-right: 10px;
      }
    }
  }

  .warpper {
    width: 100%;
    margin-top: 18px; /*no*/
    display: flex;
    position: relative;
    .seller {
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
      }
      span {
        flex: 1;
        width: 0;
        @include textHideByLine(1);
      }
    }
    .price {
      flex: 1;
      .number {
        font-size: 70px;
        color: $default_price_color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        em {
          font-style: normal;
          font-size: 12px;/*no*/
        }
      }
    }
    .des {
      flex: 1;
      width: 0;
      padding-right: 80px;

      p {
        font-size: 12px;/*no*/
        color: #999;
        margin-bottom: 8px;
        @include textHideByLine(1);
      }
    }
    .canpickup {
      width: 70px;
      height: 35px;
      border: 1px solid $active_font_color;/*no*/
      border-radius: 10px;
      color: $active_font_color;
      font-size: 12px;/*no*/
      text-align: center;
      line-height: 34px;
      position: absolute;
      right: 0px;/*no*/
      top: 0px;/*no*/
      z-index: 2;
    }
    .cantpickup {
      width: 90px;
      height: 35px;
      border: 1px solid $default_border_color;/*no*/
      border-radius: 10px;
      color: $default_font_color;
      font-size: 12px;/*no*/
      text-align: center;
      line-height: 34px;
      position: absolute;
      right: 0px;/*no*/
      top: 0px;/*no*/
      z-index: 2;
    }
  }

  .time {
    position: absolute;
    bottom: 0;
    left: 20px;/*no*/
    right: 20px;/*no*/
    height: 40px;/*no*/
    line-height: 40px;/*no*/
    border-top: 1px solid #dcdcdc;/*no*/
    font-size: 12px;/*no*/
    color: #999;
    display: flex;
    justify-content: space-between;
    a {
      color: #999;
    }
  }
</style>
