<template>
  <div class="panel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <x-header :left-options="{showBack: false}" class="vux-1px-b">
          可用套餐
          <i class="close-icon" slot="right" @click="status = false"></i>
        </x-header>
        <div class="content">
          <group :gutter="10">
            <cell :title="item.value"
                  :border-intent="false"
                  :inline-desc="item.inlineDesc"
                  :key="item.key"
                  :disabled="item.isdisabled"
                  v-for="item in packageOrderList"
                  @click.native="selectPackage(item)">
              <check-icon slot="icon" :value="item.status"></check-icon>
            </cell>
          </group>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" class="ok" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Group, Cell, CheckIcon } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CheckIcon
    },
    data: function () {
      return {
        status: false,
        seller: {},
        packageOrderList: []
      }
    },
    methods: {
      show (seller) {
        this.status = true
        this.seller = seller
        // 读取商家可用的套餐列表
        this.packageOrderList = []
        this.seller.packageList.map(order => {
          order.status = (seller.deductible_package_orderid === order.order_id)
          order.isdisabled = false
          order.key = order.order_id
          order.value = order.package_title
          let desc = ''
          if (order.consumption_types === 0) {
            desc += '余额：￥' + order.remain_price.toFixed(2) + '， '
            desc += '可消费商品：' + order.goods.length + '个'
            if (!order.status && order.remain_price === 0) {
              order.isdisabled = true
            }
          }
          if (order.consumption_types === 1) {
            let hasNotRemain = order.goods.every(g => g.remain_num === 0)
            if (!order.status && hasNotRemain) {
              order.isdisabled = true
            }
          }
          order.inlineDesc = desc
          this.packageOrderList.push(order)
        })
      },
      hide () {
        this.status = false
      },
      ok () {
        let order = this.packageOrderList.find(o => o.status)
        if (order) {
          // 设置商家商品的套餐抵扣信息
          let packageDeductiblePrice = 0
          this.seller.goods.map(goods => {
            let findGoods = null
            if (goods.sku_id) {
              findGoods = order.goods.find(psg => psg.goods_id === goods.goods_id && psg.sku_id === goods.sku_id)
            } else {
              findGoods = order.goods.find(psg => psg.goods_id === goods.goods_id)
            }
            if (findGoods) {
              let totalPrice = findGoods.package_price * goods.goods_num
              goods.package_goods_id = findGoods.package_goods_id
              goods.package_deductibleprice = findGoods.deductible_price > totalPrice ? totalPrice : findGoods.deductible_price
              goods.package_deductiblenum = findGoods.deductible_num
              goods.package_order_id = order.order_id
              goods.package_id = order.package_id
              goods.package_consumption_type = order.consumption_types
              goods.package_type = order.package_type
              goods.goods_promotionprice = findGoods.package_price
              // 商品实付总价设置为商品促销总价-商品总抵扣价
              goods.goods_payprice = totalPrice - goods.package_deductibleprice
              packageDeductiblePrice += goods.package_deductibleprice
            }
          })
          this.seller.package_desc = order.package_title
          this.seller.package_id = order.package_id
          this.seller.deductible_package_orderid = order.order_id
          this.seller.deductible_package_price = packageDeductiblePrice
        } else {
          // 清除商家商品的套餐抵扣信息
          this.seller.goods.map(goods => {
            goods.package_goods_id = null
            goods.package_deductibleprice = 0
            goods.package_deductiblenum = 0
            goods.package_order_id = null
            goods.package_id = null
            goods.package_consumption_type = 0
            goods.package_type = 0
            goods.goods_promotionprice = goods.goods_saleprice
            // 商品实付总价还原为商品一口价*购买数量
            let totalPrice = goods.goods_promotionprice * goods.goods_num
            goods.goods_payprice = totalPrice
          })
          this.seller.package_desc = this.seller.packageList.length + '个套餐可用'
          this.seller.package_id = null
          this.seller.deductible_package_orderid = null
          this.seller.deductible_package_price = 0

          this.seller.shop_id = this.seller.seller_id
          this.seller.shop_name = this.seller.seller_name
          this.seller.shop_address = this.seller.seller_address
          this.seller.shop_logo = this.seller.seller_logo
          this.seller.shop_distance = this.seller.seller_distance
        }
        this.hide()
        this.$emit('handleClick', this.seller)
      },
      resetPackage (order) {
        // 计算选中套餐中可以使用的商家商品集合
        let packageSellerGoodsList = order.goods.filter(g => g.seller_id === this.seller.seller_id)
        if (order.status) {
          // 购物卡抵钱
          if (order.consumption_types === 0) {
            // 购物卡抵扣费用
            packageSellerGoodsList.map(g => {
              if (order.remain_price > 0) {
                if (order.remain_price >= g.goods_totalprice) {
                  g.deductible_price = g.goods_totalprice             // 商品抵扣价格为商品促销总价
                  g.deductible_num = g.goods_num                       // 商品抵扣数量为商品购买总数
                  order.remain_price -= g.deductible_price       // 总余额减去商品抵扣总价
                } else {
                  g.deductible_price = order.remain_price                // 商品抵扣价格为套餐余额
                  g.deductible_num = g.deductible_price / g.package_price    // 商品抵扣数量为套餐余额/商品套餐价
                  order.remain_price -= g.deductible_price       // 总余额减去商品促销总价
                }
              } else {
                g.deductible_price = 0
                g.deductible_num = 0
              }
            })
          }
          // 服务卡抵消次数
          if (order.consumption_types === 1) {
            // 购物卡抵扣次数
            packageSellerGoodsList.map(g => {
              if (g.remain_num > 0) {
                if (g.remain_num >= g.goods_num) {
                  g.deductible_price = g.goods_totalprice     // 商品抵扣价格为商品促销总价
                  g.deductible_num = g.goods_num                // 商品抵扣数量为商品购买总数
                  g.remain_num -= g.deductible_num              // 商品剩余数量减去商品抵扣总数
                } else {
                  g.deductible_price = g.remain_num * g.package_price   // 商品抵扣价格为剩余数量*商品套餐价
                  g.deductible_num = g.remain_num                // 商品抵扣数量为商品剩余数量
                  g.remain_num -= g.deductible_num              // 商品剩余数量减去商品抵扣总数
                }
              } else {
                g.deductible_price = 0
                g.deductible_num = 0
              }
            })
          }
        } else {
          // 购物卡归还抵钱
          if (order.consumption_types === 0) {
            packageSellerGoodsList.map(g => {
              order.remain_price += g.deductible_price
              g.deductible_price = 0
              g.deductible_num = 0
            })
          }
          // 服务卡归还抵消次数
          if (order.consumption_types === 1) {
            packageSellerGoodsList.map(g => {
              g.remain_num += g.deductible_num
              g.deductible_num = 0
              g.deductible_price = 0
            })
          }
        }
        let desc = ''
        if (order.consumption_types === 0) {
          desc += '余额：￥' + order.remain_price.toFixed(2) + '， '
          desc += '可消费商品：' + order.goods.length + '个'
        }
        order.inlineDesc = desc
      },
      // 选中优惠券
      selectPackage (item) {
        if (item.isdisabled) {
          return
        }
        this.packageOrderList.map(order => {
          if (order !== item) {
            order.status = false
            this.resetPackage(order)
          }
        })
        let index = this.packageOrderList.indexOf(item)
        item.status = !item.status
        this.$set(this.packageOrderList, index, item)
        this.resetPackage(item)
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

