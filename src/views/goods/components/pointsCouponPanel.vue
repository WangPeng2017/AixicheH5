<template>
  <div class="couponPanel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="title">
          <p>优惠券<i class="close-icon" @click="status = false"></i></p>
        </div>
        <div class="content">
          <div class="subtitle" v-if="couponEnableData && couponEnableData.length > 0">
            <p>可领优惠券</p>
          </div>
          <div class="item" v-for="item in couponEnableData" v-if="couponEnableData && couponEnableData.length > 0">
            <div class="left">
              <p class="adapt">{{item.coupon_userangedesc}}</p>
              <p class="price"><em>￥</em>{{item.coupon_money}}</p>
              <p class="order">{{item.coupon_orderdesc}}</p>
            </div>
            <div class="right">
              <p class="start">{{item.coupon_usestartdate}}</p>
              <p class="end">{{item.coupon_useenddate}}</p>
              <a class="receive" href="javascript:void(0);" @click="addCouponOrder(item)" v-if="item.coupon_remainnum>0">点击领取</a>
            </div>
          </div>
          <div class="subtitle" v-if="couponDisableData && couponDisableData.length > 0">
            <p>已领优惠券</p>
          </div>
          <div class="item on" v-for="item in couponDisableData" v-if="couponDisableData && couponDisableData.length > 0">
            <div class="left">
              <p class="adapt">{{item.coupon_userangedesc}}</p>
              <p class="price"><em>￥</em>{{item.coupon_money}}</p>
              <p class="order">{{item.coupon_orderdesc}}</p>
            </div>
            <div class="right">
              <p class="start">{{item.coupon_usestartdate}}</p>
              <p class="end">{{item.coupon_useenddate}}</p>
              <a class="receiveOver" href="javascript:void(0);" v-if="item.coupon_remainnum<=0">已领完</a>
            </div>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {SET_LOADING} from '@store/type'
  import { addCouponOrder } from '@api'

  export default {
    props: {
      couponData: {
        type: Array
      }
    },
    computed: {
      ...mapState(['token'])
    },
    data: function () {
      return {
        status: false,
        couponEnableData: [],
        couponDisableData: []
      }
    },
    watch: {
      couponData: function () {
        this.splitCoupon()
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      show () {
        this.status = true
      },
      hide () {
        this.status = false
      },
      // 分割优惠券为已领取和待领取
      splitCoupon () {
        this.couponDisableData = []
        this.couponEnableData = []
        this.couponData.map(i => {
          if (i.coupon_remainnum > 0) {
            this.couponEnableData.push(i)
            if ((i.coupon_limitnum - i.coupon_remainnum) > 0) {
              this.couponDisableData.push(i)
            }
          } else {
            this.couponDisableData.push(i)
          }
        })
      },
      // 领取优惠券
      addCouponOrder (item) {
        this.setLoading({
          status: true,
          opacity: 0
        })

        let form = new FormData()
        form.append('coupon_id', item.coupon_id)
        addCouponOrder(form).then(res => {
          this.setLoading(false)
          this.$emit('loadCoupon')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .couponPanel {
    .back {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .wrapper {
      z-index: 3;
      padding: 0 20px;
      width: 100%;
      height: 65%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
      .title {
        margin-top: 20px;
        text-align: center;
        font-size: $default_largefont_size;
        color: $default_title_color;
        .close-icon {
          float: right;
          width: 24px;
          height: 24px;
          margin-top: 12px;
        }
      }

      .content {
        width: 100%;
        height: calc(100% - 124px);
        overflow: hidden;
        overflow-y: auto;
        .subtitle {
          margin-top: 20px;
          text-align: left;
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
        }
        .item {
          margin-top: 20px;
          position: relative;
          overflow: hidden;
          height: 200px;
          background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, $default_blue_color 4px);
          background-size: 12px 8px;
          background-position: -5px 10px;
          &.on {
            background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, $default_border_color 4px);
            &:before {
              background-color:$default_border_color;
            }
          }
          &:before {
            content: '';
            position: absolute;
            top:0;
            bottom:0;
            z-index: -1;
            background-color:$default_blue_color;
            left: 5px;
            right: 5px;
          }

          i {
            position: absolute;
            left: 20%;
            top: 45px;
            height: 200px;
            width: 100%;
            background-color: rgba(255, 255, 255, .15);
            transform: rotate(-30deg);
          }

          .left {
            float: left;
            padding: 20px;
            width: 60%;
            height: 200px;
            line-height: 44px;
            border-right:2px dashed rgba(255, 255, 255, .3);
            text-align: left;
            p {
              color:#fff;
              font-size: 19px;
            }
            .price {
              height: 50%;
              font-size: 60px;
              line-height: 80px;
              vertical-align: middle;
              em {
                font-size: 19px;
                font-style: normal;
              }
            }
            .order, .adapt {
              height: 25%;
              vertical-align: middle;
            }
          }

          .right {
            display: inline-block;
            width:40%;
            height: 200px;
            vertical-align: text-bottom;
            color:rgb(255,255,255);
            text-align: center;
            line-height: initial;
            padding: 20px;
            font-size: 24px;
            p {
              font-size: 19px;
              color:#fff;
            }
            .start, .end {
              height: 25%;
              vertical-align: middle;
            }
            .receive {
              background-color:#fff;
              color:#333;
              font-size: 19px;
              margin-top: 20px;
              height: 50px;
              line-height: 50px;
              text-decoration:none;
              padding:5px 10px;
              border-radius:3px;
              display: block;
            }
            .receiveOver {
              color:#fff;
              font-size: 36px;
              margin-top: 20px;
              height: 50px;
              line-height: 50px;
              text-decoration:none;
              padding:5px 10px;
              border-radius:3px;
              display: block;
            }
          }
        }
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(0, 100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

