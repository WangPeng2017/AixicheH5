<template>
  <div class="panel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="title">
          <p>可用套餐<i class="close-icon" @click="status = false"></i></p>
        </div>
        <div class="subtitle">
          <p><i class="packageinfo-icon"></i>由于套餐中商品享受特价，故单次仅能使用一个套餐！</p>
        </div>
        <div class="content">
          <div class="package-item" v-for="packageItem in pickerData.packages">
            <header class="package-header">
              <img v-lazy="packageItem.package_img"/>
              <span class="left">{{packageItem.package_title}}</span>
              <span class="right" v-if="packageItem.consumption_types===0">套餐余额：{{packageItem.package_remainprice.toFixed(2)}}元</span>
            </header>
            <div class="package-main">
              <div class="scroll">
                <figure class="goods-item" :class="{on: goodsItem.status}" v-for="goodsItem in packageItem.goods" @click="selectGoods(packageItem, goodsItem)">
                  <div class="image">
                    <img v-lazy="goodsItem.goods_img" />
                  </div>
                  <figcaption>
                    <p class="sell_money">¥{{goodsItem.package_price.toFixed(2)}}<span class="sell_num">×{{goodsItem.goods_num}}</span></p>
                    <p class="sale_count" v-if="packageItem.consumption_types===1">余：{{goodsItem.package_remainnum}} {{goodsItem.goods_type===1 ? '件' : '次'}}</p>
                    <p class="sale_count" v-if="packageItem.consumption_types===0">付：{{(goodsItem.package_price * goodsItem.goods_num - goodsItem.package_deductibleprice).toFixed(2)}}</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" class="ok" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'packagePickerPanel',
    props: {
      pickerData: {}
    },
    data: function () {
      return {
        status: false
      }
    },
    methods: {
      show () {
        this.status = true
        this.resetData()
      },
      hide () {
        this.status = false
      },
      // 确认选中套餐
      ok () {
        let packageOrder = this.pickerData.packages.find(p => p.status)
        if (packageOrder) {
          let totalDeductiblePrice = 0
          this.pickerData.goods.map(goods => {
            // 筛选使用套餐的商品
            let findGoods = null
            if (goods.sku_id !== null && goods.sku_id.length > 0) {
              findGoods = packageOrder.goods.find(g => g.sku_id === goods.sku_id && g.goods_id === goods.goods_id && g.status)
            } else {
              findGoods = packageOrder.goods.find(g => g.goods_id === goods.goods_id && g.status)
            }
            if (findGoods) {
              goods.package_deductibleprice = findGoods.package_deductibleprice                 // 商品抵扣金额为0
              goods.package_deductiblenum = findGoods.package_deductiblenum                      // 商品抵扣次数
              goods.package_price = findGoods.package_price                                         // 商品套餐价格
              goods.package_goods_id = findGoods.package_goods_id                                 // 套餐中的商品id
              goods.package_order_id = packageOrder.order_id                                        // 商品使用套餐订单id
              goods.package_id = packageOrder.package_id                                            // 商品使用套餐id
              goods.package_consumption_type = packageOrder.consumption_types                    // 商品使用套餐消费类型
              goods.package_type = packageOrder.package_type                                        // 商品使用套餐类型
              goods.is_settlement = packageOrder.is_settlement                                      // 商品使用套餐是否结算

              // 购物卡
              if (packageOrder.consumption_types === 0) {
                goods.goods_promotionprice = findGoods.package_price                              // 商品优惠价格为套餐价
                let payprice = goods.goods_promotionprice * goods.goods_num - goods.package_deductibleprice - goods.coupon_deductibleprice
                goods.goods_payprice = payprice > 0 ? payprice : 0                                    // 商品应付价格
              }

              // 次卡
              if (packageOrder.consumption_types === 1) {
                goods.goods_promotionprice = goods.package_price                                  // 商品优惠价格为原价
                goods.goods_payprice = 0                                                              // 商品应付价格
              }

              totalDeductiblePrice += goods.package_deductibleprice
            } else {
              // 非套餐使用商品重置为原价商品
              goods.package_deductibleprice = 0
              goods.package_deductiblenum = 0
              goods.package_price = 0
              goods.package_goods_id = null
              goods.goods_promotionprice = goods.goods_saleprice
              let payprice = goods.goods_promotionprice * goods.goods_num - goods.package_deductibleprice - goods.coupon_deductibleprice
              goods.goods_payprice = payprice
              goods.package_order_id = null
              goods.package_id = null
              goods.package_consumption_type = 0
              goods.package_type = 0
              goods.is_settlement = 0
            }
          })
          this.pickerData.seller.deductible_package_orderid = packageOrder.order_id
          this.pickerData.seller.deductible_package_price = totalDeductiblePrice
        } else {
          this.pickerData.goods.map(goods => {
            goods.package_deductibleprice = 0
            goods.package_deductiblenum = 0
            goods.package_price = 0
            goods.package_goods_id = null
            goods.goods_promotionprice = goods.goods_saleprice
            let payprice = goods.goods_promotionprice * goods.goods_num - goods.package_deductibleprice - goods.coupon_deductibleprice
            goods.goods_payprice = payprice
            goods.package_order_id = null
            goods.package_id = null
            goods.package_consumption_type = 0
            goods.package_type = 0
            goods.is_settlement = 0
          })
          this.pickerData.seller.deductible_package_orderid = null
          this.pickerData.seller.deductible_package_price = 0
        }
        this.hide()
        this.$emit('handleClick', this.pickerData)
      },
      // 重置套餐商品数据
      resetData () {
        this.pickerData.packages.map(p => {
          p.goods.map(goods => {
            let findGoods = null
            if (goods.sku_id === null) {
              findGoods = this.pickerData.goods.find(g => g.goods_id === goods.goods_id)
            } else {
              findGoods = this.pickerData.goods.find(g => g.sku_id === goods.sku_id && g.goods_id === goods.goods_id)
            }
            if (findGoods !== null) {
              this.$set(goods, 'goods_img', findGoods.goods_img)                    // 设置商品图片
              this.$set(goods, 'goods_price', findGoods.goods_saleprice)           // 设置商品销售价
              this.$set(goods, 'goods_type', findGoods.goods_saletype)                  //  商品类型
              this.$set(goods, 'goods_num', findGoods.goods_num)                    // 设置商品购买数量
              this.$set(goods, 'package_deductibleprice', 0)                      // 设置商品抵扣金额
              this.$set(goods, 'package_deductiblenum', 0)                        // 设置商品抵扣数量
              this.$set(goods, 'package_remainnum', goods.remain_num)                  // 设置商品剩余数量
            }
            this.$set(p, 'package_remainprice', p.remain_price)        // 设置套餐可抵扣金额
            this.$set(p, 'package_remainnum', p.surplus_second)        // 设置套餐可抵扣数量
          })
        })
      },
      // 选中商品
      selectGoods (packageItem, goodsItem) {
        goodsItem.status = !goodsItem.status
        // 商品选中计算抵扣金额或数量，取消选中则归还
        if (goodsItem.status) {
          if (packageItem.consumption_types === 0) {
            // 购物卡计算
            if (packageItem.package_remainprice <= 0) {
              this.$toasted.show('套餐余额不足，无法抵扣！')
              return
            }
            // 选中商品套餐价小计金额
            let goodsTotalPrice = goodsItem.goods_num * goodsItem.package_price
            if (packageItem.package_remainprice > goodsTotalPrice) {
              // 商品抵扣金额为商品套餐价小计
              goodsItem.package_deductibleprice = goodsTotalPrice
              // 套餐余额大于选中商品套餐价小计金额，套餐余额减去商品套餐价小计金额
              packageItem.package_remainprice -= goodsTotalPrice
            } else {
              // 选中商品套餐价小计大于套餐余额， 抵扣所有余额，不足等待补现
              goodsItem.package_deductibleprice = packageItem.package_remainprice
              // 套餐余额归0
              packageItem.package_remainprice = 0
            }
          }
          // 次卡计算
          if (packageItem.consumption_types === 1) {
            if (goodsItem.goods_num > goodsItem.package_remainnum) {
              // 如果购买数量大于次卡中商品余量无法抵扣
              this.$toasted.show('商品剩余数量不足，无法抵扣！')
              return
            }
            // 如果购买数量小于次卡中商品数量，抵扣商品数量
            goodsItem.package_deductiblenum = goodsItem.goods_num
            // 商品余量减去购买数量
            goodsItem.package_remainnum -= goodsItem.goods_num
            // 套餐总余量减去购买数量
            packageItem.package_remainnum -= goodsItem.goods_num
            // 套餐抵扣金额显示
            let goodsTotalPrice = goodsItem.package_deductiblenum * goodsItem.package_price
            goodsItem.package_deductibleprice = goodsTotalPrice
          }
        } else {
          // 购物卡归还
          if (packageItem.consumption_types === 0) {
            // 取消选中商品则还原商品抵扣金额到套餐余额
            packageItem.package_remainprice += goodsItem.package_deductibleprice
            // 商品抵扣金额归0
            goodsItem.package_deductibleprice = 0
          }
          // 次卡归还
          if (packageItem.consumption_types === 1) {
            // 取消选中商品
            packageItem.package_remainnum += goodsItem.package_deductiblenum
            goodsItem.package_remainnum += goodsItem.package_deductiblenum
            goodsItem.package_deductiblenum = 0
            // 套餐抵扣金额显示
            goodsItem.package_deductibleprice = 0
          }
        }
        // 根据套餐商品选中数量判断套餐是否选中
        let selected = packageItem.goods.some(goods => goods.status)
        packageItem.status = selected
        if (selected) {
          // 套餐选中后清除其他套餐和商品的选中状态
          this.pickerData.packages.map(p => {
            // 非当前套餐状态重置
            if (p !== packageItem) {
              p.status = false
              p.package_remainprice = p.remain_price     // 重置为初始总余额
              p.package_remainnum = p.surplus_second     // 重置为初始总余量
              p.goods.map(goods => {
                goods.status = false
                goods.package_deductibleprice = 0           // 重置抵扣金额为0
                goods.package_deductiblenum = 0             // 重置抵扣数量为0
                goods.package_remainnum = goods.remain_num       // 重置可抵扣数量为初始余量
              })
            }
          })
        } else {
          packageItem.package_remainprice = packageItem.remain_price     // 重置为初始总余额
          packageItem.package_remainnum = packageItem.surplus_second     // 重置为初始总余量
          packageItem.goods.map(goods => {
            goods.status = false
            goods.package_deductibleprice = 0           // 重置抵扣金额为0
            goods.package_deductiblenum = 0             // 重置抵扣数量为0
            goods.package_remainnum = goods.remain_num       // 重置可抵扣数量为初始余量
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
      height: 80%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .title {
        padding: 20px;
        width: 100%;
        text-align: center;
        font-size: $default_font_size;
        color: $default_title_color;
        .close-icon {
          float: right;
          width: 24px;
          height: 24px;
          margin-top: 5px;
        }
      }
      .subtitle {
        width: 100%;
        text-align: left;
        font-size: $default_smallfont_size;
        color: #f60;
        padding: 10px;
        background-color: #fff7cc;
      }
      .content {
        width: 100%;
        height: calc(100% - 228px);
        overflow: hidden;
        overflow-y: auto;
        background-color: $default_background_color;

        .package-item {
          background-color: #fff;
          margin-bottom: 20px;
          .package-header {
            padding: 20px;
            display: flex;
            span {
              color: $default_title_color;
            }
            img {
              width: 88px;
              height: 44px;
              border-radius: 10px;
              margin-right: 10px;
            }
            .left {
              flex: 1;
            }
            .right {
              text-align: right;
            }
          }
          .package-main {
            border-top: 1px solid $default_border_color; /*no*/
            overflow-x: scroll;
            overflow-y: hidden;
            .scroll {
              padding: 10px 6px;
              width: 100%;
              display: inline-block;
              font-size: 0;
              white-space: nowrap;
              .goods-item {
                width: 32%;
                margin: 8px 6px;
                margin-top: 12px;
                display: inline-block;
                overflow: hidden;
                border-radius: 10px;
                margin-bottom: 10px;
                border: 2px solid $default_border_color;
                .image {
                  width: 100%;
                  height: 100%;
                  padding: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: 200px;
                    height: 200px;
                  }
                }
                figcaption {
                  p {
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: $default_subtitle_color;
                    padding: 4px 10px;
                  }
                }
                .sell_money {
                  color: $default_price_color;
                  font-size: $default_smallfont_size;
                  .sell_num {
                    color: $default_subtitle_color;
                    float: right;
                    text-decoration: none;
                  }
                }
                .old_money {
                  font-size: $default_smallfont_size;
                  text-decoration: line-through;
                }
                .sale_count {
                  font-size: $default_smallfont_size;
                  .sell_remainnum {
                    color: $default_subtitle_color;
                    float: right;
                  }
                }
              }
            }
          }
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
    .on {
      line-height: inherit !important;
      border: 2px solid $default_red_color !important;
      display: inline-block;
      @include backimg('../../../../assets/image/rbchecked_icon', 72px 72px);
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: 101% 100%;
    }
    .packageinfo-icon {
      margin-right: 4px;
      margin-bottom: 4px;
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

