<template>
  <div class="panel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <x-header :left-options="{showBack: false}" class="vux-1px-b">
          可用优惠券
          <i class="close-icon" slot="right" @click="status = false"></i>
        </x-header>
        <div class="content">
          <coupon-card :edit="true" :data="item" v-for="item in couponList" :key="item.receive_id" @handleChange="selectCoupon(item)"></coupon-card>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" class="ok" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import couponCard from '@comps/card/couponOrderCard'
  export default {
    components: {
      couponCard
    },
    data: function () {
      return {
        status: false,
        seller: {},
        couponList: []
      }
    },
    methods: {
      show (seller) {
        this.status = true
        this.seller = seller
        this.couponList = []
        this.seller.couponList.map(coupon => {
          coupon.status = (seller.deductible_coupon_receiveid === coupon.receive_id)
          this.couponList.push(coupon)
        })
      },
      hide () {
        this.status = false
      },
      ok () {
        let couponReceive = this.couponList.find(coupon => coupon.status)
        if (couponReceive) {
          let totalDeductiblePrice = 0
          // 全店通用
          if (couponReceive.coupon_userange === 0) {
            // 全店通用，分配到订单所有商品
            let totalNum = this.seller.goods.length   // 订单商品种类数
            let avgMoney = (couponReceive.coupon_money / totalNum).toFixed(2)
            let leaveMoney = (couponReceive.coupon_money - avgMoney * totalNum).toFixed(2)
            let i = 0
            this.seller.goods.map(goods => {
              let totalPrice = goods.goods_promotionprice * goods.goods_num
              goods.receive_coupon_id = couponReceive.receive_id
              if (i === 0) {
                goods.coupon_deductibleprice = avgMoney * 1 + leaveMoney * 1
              } else {
                goods.coupon_deductibleprice = avgMoney * 1
              }
              goods.coupon_deductibleprice = goods.coupon_deductibleprice > totalPrice ? totalPrice : goods.coupon_deductibleprice
              // 使用套餐后商品促销价仍为一口价
              goods.goods_promotionprice = goods.goods_saleprice
              // 使用套餐后商品实付价为促销价*购买数量-套餐抵扣-优惠券抵扣
              goods.goods_payprice = totalPrice - goods.coupon_deductibleprice
              totalDeductiblePrice += goods.coupon_deductibleprice
              i++
            })
          }
          // 指定商品
          if (couponReceive.coupon_userange === 1) {
            // 部分商品适用，分配到订单指定商品
            let totalNum = couponReceive.goods.length   // 订单商品种类数
            let avgMoney = (couponReceive.coupon_money / totalNum).toFixed(2)
            let leaveMoney = (couponReceive.coupon_money - avgMoney * totalNum).toFixed(2)
            let i = 0
            couponReceive.goods.map(goods => {
              goods.receive_coupon_id = couponReceive.receive_id
              if (i === 0) {
                goods.coupon_deductibleprice = avgMoney * 1 + leaveMoney * 1
              } else {
                goods.coupon_deductibleprice = avgMoney * 1
              }
              i++
            })

            this.seller.goods.map(goods => {
              let findGoods = couponReceive.goods.find(g => g.goods_id === goods.goods_id)
              if (findGoods) {
                let totalPrice = goods.goods_promotionprice * goods.goods_num
                goods.receive_coupon_id = findGoods.receive_coupon_id
                goods.coupon_deductibleprice = findGoods.coupon_deductibleprice > totalPrice ? totalPrice : findGoods.coupon_deductibleprice
                // 使用套餐后商品促销价仍为一口价
                goods.goods_promotionprice = goods.goods_saleprice
                // 使用套餐后商品实付价为促销价*购买数量-套餐抵扣-优惠券抵扣
                goods.goods_payprice = totalPrice - goods.coupon_deductibleprice
                totalDeductiblePrice += goods.coupon_deductibleprice
              }
            })
          }

          this.seller.deductible_coupon_receiveid = couponReceive.receive_id
          this.seller.deductible_coupon_price = totalDeductiblePrice
          this.seller.coupon_desc = couponReceive.coupon_name
        } else {
          this.seller.goods.map(goods => {
            goods.receive_coupon_id = null
            goods.coupon_deductibleprice = 0
            goods.goods_promotionprice = goods.goods_saleprice
            let totalPrice = goods.goods_promotionprice * goods.goods_num
            goods.goods_payprice = totalPrice
          })
          this.seller.deductible_coupon_receiveid = null
          this.seller.deductible_coupon_price = 0
          this.seller.coupon_desc = this.seller.couponList.length + '个优惠券可用'
        }
        this.hide()
        this.$emit('handleClick', this.seller)
      },
      // 选中优惠券
      selectCoupon (item) {
        if (item.status) {
          this.couponList.map(coupon => {
            if (coupon !== item) {
              coupon.status = false
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .panel {
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
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .content {
        width: 100%;
        height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
        overflow: hidden;
        overflow-y: auto;
        background-color: $default_background_color;
      }
      .card {
        &:first-child {
          margin-top: 20px;
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 99;
      a {
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        margin: 0;
        width: 100%;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        display: block;
        float: left;
      }
      .ok {
        background-color: $default_red_color;
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

