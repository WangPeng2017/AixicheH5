<template>
  <div class="view">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              class="vux-1px-b"
              @on-click-back="back">确认订单</x-header>
    <div class="content">
      <group :gutter="10">
        <address-card :data="address"></address-card>
      </group>
      <group :gutter="10"
             v-for="(seller, index) in sellers"
             :key="index">
        <div class="order-info">
          <div class="order-seller">
            <img class="seller-logo"
                 v-lazy="seller.seller_logo"
                 alt="" />
            <span class="seller-name">{{seller.seller_name}}</span>
          </div>
          <div class="order-goods"
               v-for="goods in seller.goods">
            <img class="goods-img"
                 v-lazy="goods.goods_img"
                 alt="" />
            <div class="goods-info">
              <p class="goods-name">{{goods.goods_name}}</p>
              <p class="goods-skuname">{{goods.sku_valuenames}}</p>
              <p class="goods-price-num">
                <!-- 默认 -->
                <template v-if="goods.package_order_id === null && goods.receive_coupon_id === null">
                  <span class="goods-points"><em class="jifen-icon"></em>&nbsp;{{goods.pointslevel}}<em class="redprice"
                        v-if="goods.pricelevel"> + ￥{{goods.pricelevel.toFixed(2)}}</em></span>
                </template>
                <!-- 使用套餐 -->
                <template v-if="goods.package_order_id !== null && goods.receive_coupon_id === null">
                  <!-- 使用购物卡 -->
                  <template v-if="goods.package_consumption_type === 0">
                    <span class="goods-price">
                      <em>￥</em>{{goods.goods_promotionprice.toFixed(2)}} <em class="old">{{goods.goods_saleprice.toFixed(2)}}</em>
                    </span>
                    <span class="package-consume">套餐抵扣{{goods.package_deductibleprice.toFixed(2)}}</span>
                  </template>
                  <!-- 使用服务卡 -->
                  <template v-if="goods.package_consumption_type === 1">
                    <span class="goods-price">
                      <em>￥</em>{{goods.goods_promotionprice.toFixed(2)}} <em class="old">{{goods.goods_saleprice.toFixed(2)}}</em>
                    </span>
                    <span class="package-consume">套餐抵扣{{goods.package_deductiblenum}}{{goods.goods_saletype===1?'件':'次'}}</span>
                  </template>
                </template>
                <!-- 使用优惠券 -->
                <template v-if="goods.receive_coupon_id !== null && goods.package_order_id === null">
                  <span class="goods-price">
                    <em>￥</em>{{goods.goods_promotionprice.toFixed(2)}}
                  </span>
                  <span class="package-consume">优惠券抵扣{{goods.coupon_deductibleprice.toFixed(2)}}</span>
                </template>
                <!-- 购买数量 -->
                <span class="goods-num">×{{goods.goods_num}}</span>
              </p>
            </div>
          </div>
          <div class="order-other">
            <cell title="套餐"
                  :border-intent="false"
                  @click.native="showPackage(seller)"
                  :value.sync="seller.package_desc"
                  is-link
                  primary="content"
                  v-if="seller.packageList && seller.packageList.length > 0"></cell>
            <cell title="优惠券"
                  :border-intent="false"
                  @click.native="showCoupon(seller)"
                  :value.sync="seller.coupon_desc"
                  is-link
                  primary="content"
                  v-if="seller.couponList && seller.couponList.length > 0"></cell>
            <cell title="配送方式"
                  :border-intent="false"
                  @click.native="showShip(seller)"
                  :value.sync="seller.shipping_methoddesc"
                  is-link
                  primary="content"
                  v-if="seller.order_type === 1"></cell>
            <cell title="服务方式"
                  :border-intent="false"
                  @click.native="showShip(seller)"
                  :value.sync="seller.shipping_methoddesc"
                  is-link
                  primary="content"
                  v-if="seller.order_type === 2"></cell>
            <cell :title="seller.shop_name"
                  :inline-desc="seller.shop_address"
                  :is-link="false"
                  :value="(seller.shop_distance ? seller.shop_distance.toFixed(1) + 'km' : '')"
                  primary="content"
                  v-if="seller.shipping_method===2 || seller.shipping_method===3"
                  @click.native="selectShop(seller)"></cell>
            <cell title="预约时间"
                  :border-intent="false"
                  @click.native="showAppointment(seller)"
                  :value.sync="seller.appointment_desc"
                  is-link
                  primary="content"
                  v-if="seller.order_type === 2 && seller.is_appointment === 1"></cell>
            <cell-box :border-intent="false"
                      class="seller-message">
              <input type="text"
                     placeholder="选填：给卖家捎句话（45字以内）"
                     maxlength="45"
                     v-model="seller.order_desc" />
            </cell-box>

            <cell-box :border-intent="false"
                      class="seller-summary">
              <template v-if="seller.order_type === 1">
                共{{seller | sellerTotalCount}}件商品，{{seller | sellerFreight}}小计：￥{{seller | sellerTotalPrice}}
              </template>
              <template v-if="seller.order_type === 2">
                共{{seller | sellerTotalCount}}次服务，{{seller | sellerDoorfee}}小计：￥{{seller | sellerTotalPrice}}
              </template>
            </cell-box>
          </div>
        </div>
      </group>
      <group :gutter="10">
        <cell title="发票"
              :border-intent="false"
              @click.native="showInvoice()"
              :value.sync="invoice.inv_desc"
              is-link
              primary="content"></cell>
      </group>
      <group :gutter="10">
        <div class="order-summary">
          <p class="item-row">商品金额<span>￥{{ totalPrice }}</span></p>
          <p class="item-row"
             v-if="order_type === 1">运费<span class="red-color">+￥{{ totalFreightFee }}</span></p>
          <p class="item-row"
             v-if="order_type === 2">上门费<span class="red-color">+￥{{ totalDoorFee }}</span></p>
          <p class="item-row">套餐立减<span class="red-color">-￥{{ totalPackageDeductible }}</span></p>
          <p class="item-row">优惠券立减<span class="red-color">-￥{{ totalCouponDeductible }}</span></p>
        </div>
      </group>
      <group :gutter="10"></group>
    </div>
    <footer class="footer">
      <span>共{{ totalCount }}{{order_type===1 ? '件' : '次'}}，合计：<em>￥{{ totalPayPrice }}&nbsp;+&nbsp;<em class="jifen-icon"></em>&nbsp;{{totalPoints}}</em></span>
      <a href="javascript:void(0)"
         @click="buy">确认兑换</a>
    </footer>
    <ship-picker-panel ref="shipSheet"
                       @handleClick="selectShip"></ship-picker-panel>
    <appointment-picker-panel ref="appointmentSheet"
                              @handleClick="selectAppointment"></appointment-picker-panel>
    <invoice-picker-panel ref="invoiceSheet"
                          @handleClick="selectInvoice"></invoice-picker-panel>
    <coupon-picker-panel ref="couponSheet"
                         @handleClick="selectCoupon"></coupon-picker-panel>
    <package-picker-panel ref="packagesSheet"
                          @handleClick="selectPackage"></package-picker-panel>
  </div>
</template>

<script>
import { XHeader, Group, Cell, CellBox, XSwitch } from 'vux'
import addressCard from '@comps/card/addressCard/select'
import shipPickerPanel from './components/ship'
import appointmentPickerPanel from './components/appointment'
import invoicePickerPanel from './components/invoice'
import couponPickerPanel from './components/coupon'
import packagePickerPanel from './components/package'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import { getDefaultAddress, pointsaddOrder, getParamValue, getLevelOrderFreightFeeList, getLevelOrderIndoorFeeList, getLevelOrderExpressList, getOrderTimelotList, getOrderCouponList, getOrderPackageList } from '@api'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
import qs from 'qs'

Vue.use(Confirm)
export default {
  name: 'firmOrder',
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    XSwitch,
    addressCard,
    shipPickerPanel,
    appointmentPickerPanel,
    invoicePickerPanel,
    couponPickerPanel,
    packagePickerPanel
  },
  data () {
    return {         // 服务订单的预约模板id
      sellers: [],
      address: null,
      rate: 0,
      integral_deduction_total: 0,
      detailsList: [],
      invoice: {
        is_invoice: 0,
        inv_property: 0,
        inv_type: 0,
        inv_payee: null,
        inv_content: '不开发票',
        inv_taxnumber: null,
        inv_tax: 0,
        inv_desc: '不开发票'
      },
      order_type: 1,
      jointPackageList: []       // 联营购物卡
    }
  },
  filters: {
    // 商家商品件数小计
    sellerTotalCount (item) {
      let count = 0
      item.goods.map(g => {
        count += g.goods_num
      })
      return +count
    },
    // 商家运费小计
    sellerFreight (item) {
      let text = ''
      let totalfee = item.order_freight
      let undeliverGoods = item.undeliverList
      let shippingMethod = item.shipping_method
      if (shippingMethod === 1) {
        // 商家配送模式
        if (undeliverGoods && undeliverGoods.length > 0) {
          text = '无法配送，'
        } else {
          if (totalfee > 0) {
            text = '运费：￥' + totalfee.toFixed(2) + '，'
          } else {
            text = '免运费，'
          }
        }
      } else if (shippingMethod === 2) {
        // 到店自提模式
        text = ''
      }
      return text
    },
    // 商家上门费小计
    sellerDoorfee (item) {
      let text = ''
      let totalfee = item.order_doorfee
      let shippingMethod = item.shipping_method
      if (shippingMethod === 3) {
        // 到店服务模式
        text = ''
      } else if (shippingMethod === 4) {
        // 上门服务模式
        if (totalfee > 0) {
          text = '上门费：￥' + totalfee.toFixed(2) + '，'
        } else {
          text = '免费上门，'
        }
      }
      return text
    },
    // 商家商品费用小计
    sellerTotalPrice (item) {
      let price = 0
      item.goods.map(g => {
        // 促销价 * 购买数量
        price += g.pricelevel * g.goods_num
      })
      price += item.order_doorfee
      price += item.order_freight
      return price.toFixed(2)
    }
  },
  computed: {
    ...mapState(['token', 'user']),
    // 全部订单商品购买总数量
    totalCount () {
      let num = 0
      this.sellers.map(seller => {
        seller.goods.map(goods => {
          num += goods.goods_num
        })
      })
      return num
    },
    // 全部订单的套餐抵扣总额
    totalPackageDeductible () {
      let price = 0
      this.sellers.map(seller => {
        seller.goods.map(goods => {
          price += goods.package_deductibleprice
        })
      })
      return price.toFixed(2)
    },
    // 全部订单的优惠券抵扣总额
    totalCouponDeductible () {
      let price = 0
      this.sellers.map(seller => {
        price += seller.deductible_coupon_price
      })
      return price.toFixed(2)
    },
    // 全部订单商品的总运费
    totalFreightFee () {
      let price = 0
      this.sellers.map(seller => {
        price += seller.order_freight
      })
      return price.toFixed(2)
    },
    // 全部订单商品的总上门费
    totalDoorFee () {
      let price = 0
      this.sellers.map(seller => {
        price += seller.order_doorfee
      })
      return price.toFixed(2)
    },
    // 全部订单商品的应付总金额
    totalPrice () {
      let price = 0
      this.sellers.map(item => {
        item.goods.map(g => {
          price += g.pricelevel * g.goods_num
        })
      })
      return price.toFixed(2)
    },
    // 全部订单商品的实付总金额
    totalPayPrice () {
      let price = 0
      this.sellers.map(item => {
        item.goods.map(g => {
          price += g.pricelevel
        })
      })
      price += parseFloat(this.totalFreightFee)
      price += parseFloat(this.totalDoorFee)
      if (price <= 0) {
        price = 0
      }
      return price.toFixed(2)
    },
    // 全部商品总积分数量
    totalPoints () {
      let point = 0
      this.sellers.map(item => {
        item.goods.map(g => {
          point += g.pointslevel
        })
      })
      if (point <= 0) {
        point = 0
      }
      return point
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 后退
    back () {
      this.$confirm({
        title: '',
        content: '您确定要放弃本次购买吗？',
        yesText: '去意已决',
        noText: '我再想想',
        yesStyle: {
          'background-color': '#f15353',
          'color': '#ffffff',
          'font-size': '16px'
        },
        noStyle: {
          'color': '#666666',
          'font-size': '16px'
        }
      }).then(() => {
        this.$router.back()
      }).catch(() => {

      })
    },
    // 显示配送或服务方式
    showShip (seller) {
      this.$refs.shipSheet.show(seller)
    },
    // 选中配送方式
    selectShip (seller) {
      this.loadFreightFees(seller)
      this.loadIndoorFees(seller)
    },
    // 显示预约时间
    showAppointment (seller) {
      this.$refs.appointmentSheet.show(seller)
    },
    // 选择预约时间
    selectAppointment (seller) {
    },
    // 显示发票
    showInvoice () {
      this.$refs.invoiceSheet.show(this.invoice)
    },
    // 选中发票
    selectInvoice (invoice) {
    },
    // 显示店铺商品可用套餐
    showCoupon (seller) {
      this.$refs.couponSheet.show(seller)
    },
    // 选中优惠券
    selectCoupon (seller) {
      if (seller.deductible_coupon_receiveid) {
        // 清除商家的套餐和积分
        this.clearSellerPromotion(seller, true, false, true)
      }
    },
    // 显示店铺商品可用套餐
    showPackage (seller) {
      this.$refs.packagesSheet.show(seller)
    },
    // 选中套餐
    selectPackage (seller) {
      if (seller.deductible_package_orderid) {
        // 清除商家的优惠券和积分
        this.clearSellerPromotion(seller, false, true, true)
      }
    },
    // 清除指定商家促销信息
    clearSellerPromotion (seller, isClearPackage, isClearCoupon) {
      // 清除订单中的选中优惠券
      if (isClearCoupon) {
        seller.coupon_desc = seller.couponList.length + '个优惠券可用'    // 订单选用优惠券描述
        seller.deductible_coupon_receiveid = null                         // 订单选用领券记录id
        seller.deductible_coupon_price = 0                                  // 订单选用优惠券抵扣金额
      }
      // 清除订单中的选用套餐
      if (isClearPackage) {
        if (seller.deductible_package_orderid) {
          let order = seller.packageList.find(o => o.order_id === seller.deductible_package_orderid)
          let packageSellerGoodsList = order.goods.filter(g => g.seller_id === seller.seller_id)
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
        seller.package_desc = seller.packageList.length + '个套餐可用'            // 订单选用套餐描述
        seller.package_id = null              // 订单选用套餐订单对应的套餐id
        seller.deductible_package_orderid = null        // 订单选用套餐订单id
        seller.deductible_package_price = 0  // 订单选用套餐抵扣金额
      }

      seller.goods.map(goods => {
        // 清除订单商品中的选中优惠券
        if (isClearCoupon) {
          goods.receive_coupon_id = null              // 优惠券领取id
          goods.coupon_deductibleprice = 0            // 优惠券抵扣金额
        }
        // 清除订单商品中的选中套餐
        if (isClearPackage) {
          goods.package_goods_id = null               // 选用的套餐中对应的加入商品id
          goods.package_order_id = null               // 使用套餐订单id
          goods.package_id = null                      // 使用套餐订单所属套餐id
          goods.package_deductibleprice = 0           // 套餐订单抵扣金额
          goods.package_deductiblenum = 0             // 套餐订单抵扣数量
          goods.package_consumption_type = 0          // 套餐订单所属套餐的消费类型
          goods.package_type = 0                        // 套餐订单所属套餐的类型
        }
      })
    },
    // 清除促销相关信息
    clearPromotion (isClearPackage, isClearCoupon) {
      this.sellers.map(seller => {
        this.clearSellerPromotion(seller, isClearPackage, isClearCoupon)
      })
    },
    // 获取购买方式
    getBuytype (goods) {
      // 计算购买类型
      let buytype = 0       // 现金支付
      if (goods.receive_coupon_id) {
        buytype = 5         // 优惠券支付
      }
      if (goods.package_order_id) {
        if (goods.package_type === 0) {
          // 店铺套餐
          if (goods.package_consumption_type === 0) {
            // 店铺购物卡
            buytype = 3
          } else {
            // 店铺次卡
            buytype = 4
          }
        } else if (goods.package_type === 1) {
          // 联营套餐
          if (goods.package_consumption_type === 0) {
            // 联营购物卡
            buytype = 1
          } else {
            // 联营次卡
            buytype = 2
          }
        }
      }
      return buytype
    },
    // 购买商品
    async buy () {
      if (!this.address) {
        this.$toasted.show('请先选择您的收货地址！')
        return
      }

      for (let i = 0; i < this.sellers.length; i++) {
        let seller = this.sellers[i]
        if (seller.undeliverList && seller.undeliverList.length > 0) {
          let undeliver = seller.undeliverList[0]
          this.$toasted.show('【' + undeliver.goods_name + '】无法配送到该地区！')
          return
        }
      }

      let orderList = []
      let totalPayprice = 0
      this.sellers.map(seller => {
        let goodsList = []
        let extrafee = seller.order_type === 1 ? seller.order_freight : seller.order_doorfee
        let sellerPayPrice = extrafee           // 订单商品实付总价，含运费或上门费
        let sellerTotalPrice = extrafee         // 订单商品销售总价，含运费或上门费
        let sellerTotalNum = 0                  // 订单商品总数量
        seller.goods.map(goods => {
          // 计算购买类型
          let buytype = this.getBuytype(goods)
          let goodsTotalPrice = goods.goods_promotionprice * goods.goods_num   // 商品销售总格
          let goodsPayPrice = goods.pricelevel       // 商品的实付总价，积分兑换商品实付0
          let goodsPointslevel = goods.pointslevel  // 商品实付积分数量
          this.integral_deduction_total = goodsPointslevel
          let goodsObj = {
            shopping_id: goods.shopping_id,                                    // 购物车id
            goods_id: goods.goods_id,                                           // 商品id
            sku_id: goods.sku_id,                                                // 商品sku id
            goods_name: goods.goods_name,                                       // 商品名
            sku_name: goods.sku_valuenames,                                     // 商品sku描述
            sku_nameids: goods.sku_valueids,                                    // 商品sku id
            goods_img: goods.goods_img,                                          // 商品封面图
            goods_unit: goods.goods_saletype === 1 ? '件' : '次',              // 商品单位
            goods_num: goods.goods_num,                                          // 商品购买数量
            goods_saletype: goods.goods_saletype,                               // 商品类型
            goods_price: goods.goods_saleprice,                                 // 商品一口价
            promotion_price: goods.goods_promotionprice,                       // 商品促销价，默认为一口价
            total_price: goodsTotalPrice,                                          // 商品销售总价
            pay_price: goodsPayPrice,                                               // 商品的实付总价，积分兑换商品实付0
            Pointslevel: goodsPointslevel,                                           // 商品积分价
            buy_type: buytype,                                                     // 商品购买方式
            appointment_time: seller.appointment_timename,                    // 服务商品预约日期
            start_time: seller.start_timename,                                   // 服务商品预约开始时间
            end_time: seller.end_timename,                                        // 服务商品预约结束时间
            delivery_mode: seller.shipping_method,                                // 商品配送方式或服务方式
            shop_id: seller.shop_id,                                                // 服务或上门店铺id
            shop_name: seller.shop_name,                                            // 服务或上门店铺名称
            shop_address: seller.shop_address,                                      // 服务或上门店铺地址
            receive_coupon_id: goods.receive_coupon_id,                          // 商品使用优惠券id
            coupon_deductibleprice: goods.coupon_deductibleprice,              // 商品使用优惠券抵扣金额
            package_order_id: goods.package_order_id,                            // 商品使用套餐id
            package_goods_id: goods.package_goods_id,                            // 商品使用套餐商品id
            package_deductibleprice: goods.package_deductibleprice,            // 商品使用套餐抵扣金额
            package_deductiblenum: goods.package_deductiblenum,                 // 商品使用套餐抵扣数量
            goods_purchaseprice: goods.goods_purchaseprice                      // 商品进货价
          }
          goodsList.push(goodsObj)

          sellerPayPrice += goodsPayPrice
          sellerTotalPrice += goodsTotalPrice
          sellerTotalNum += goods.goods_num
        })
        let orderObj = {
          seller_id: seller.seller_id,
          order_type: seller.order_type,                                                // 订单商品销售类型
          address_id: this.address ? this.address.delivery_addressid : null,      // 收货地址id
          receive_name: this.address ? this.address.receiver_name : null,          // 收货人姓名
          receive_address: this.address ? this.address.address : null,             // 收货人地址
          region_id: this.address ? this.address.district : null,                   // 收货人所在地区
          user_mobile: this.address ? this.address.receiver_mobile : null,         // 收货人手机号
          user_tel: '',                                                                   // 收货人电话
          zip_code: '',                                                                   // 收货人邮政编码
          user_email: '',                                                                 // 收货人邮箱
          total_num: sellerTotalNum,                                                      // 订单商品总数量
          total_money: sellerTotalPrice,                                                  // 订单商品总销售价
          order_freight: seller.order_freight,                                          // 订单运费
          order_doorfee: seller.order_doorfee,                                          // 订单上门费
          order_amount: sellerPayPrice,                                                   // 订单实际应付总价
          order_referer: 'H5',                                                            // 订单来源
          best_time: seller.best_time,                                                    // 订单商品最佳送货时间
          is_invoice: this.invoice.is_invoice,                                                  // 订单是否开发票
          inv_property: this.invoice.inv_property,                                             // 订单发票性质
          inv_type: this.invoice.inv_type,                                                       // 订单发票类型
          inv_payee: this.invoice.inv_payee,                                                     // 订单发票抬头
          inv_content: this.invoice.inv_content,                                                // 订单发票内容
          inv_taxnumber: this.invoice.inv_taxnumber,                                            // 订单发票纳税人识别号
          inv_tax: this.invoice.inv_tax,                                                          // 订单发票税额
          order_desc: seller.order_desc,                                                   // 订单买家留言
          how_oos: seller.how_oos,                                                          // 订单缺货处理方式
          deductible_coupon_receiveid: seller.deductible_coupon_receiveid,            // 订单使用我的优惠券id
          deductible_coupon_price: seller.deductible_coupon_price,                     // 订单使用优惠券金额
          deductible_package_orderid: seller.deductible_package_orderid,              // 订单使用我的套餐id
          deductible_package_price: seller.deductible_package_price,                   // 订单使用套餐金额
          withoutShopcar: seller.withoutShopcar,
          integral_deduction_total: this.integral_deduction_total,                     // 订单所需支付积分
          goods_points: 1,                                                             // 订单是否积分商品 0否 1是
          goods: goodsList
        }
        orderList.push(orderObj)
        totalPayprice += sellerPayPrice
      })
      this.setLoading({
        status: true,
        opacity: 0
      })
      let postData = {
        orders: orderList
      }
      let res = await pointsaddOrder(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        let no = res.data.order_no
        if (totalPayprice <= 0) {
          // 无需付款，购买成功，跳转购买成功
          let totalPrice = 0
          this.$router.replace(`/paySuccess/` + no + `/` + totalPrice)
        } else {
          // 需要付款，下单成功，跳转支付页面
          this.$router.replace({
            path: '/pocashier',
            query: {
              id: no,
              no: no,
              price: totalPayprice,
              type: 'goods',
              body: no,
              attach: true,   // 主订单下的多个订单支付
              points: this.totalPoints
            }
          })
        }
      }
    },
    // 加载我的默认收货地址
    async loadMyDefaultAddress () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getDefaultAddress()
      this.setLoading(false)
      if (res && res.code === 200) {
        this.address = res.data
        let reg = new RegExp(',', 'g')
        this.address.region = this.address.region.replace(reg, '')
        this.sellers.map(seller => {
          this.loadFreightFees(seller)
          this.loadIndoorFees(seller)
        })
      }
    },
    // 加载我的优惠券
    async loadMyCoupons () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList
      let postData = {
        detailsList: detailsList
      }
      let res = await getOrderCouponList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.sellers.map(seller => {
          seller.couponList = res.data.filter(i => i.seller_id === seller.seller_id)
          seller.coupon_desc = seller.couponList.length + '个优惠券可用'
        })
      }
    },
    // 加载我的套餐
    async loadMyPackages () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList
      let postData = {
        detailsList: detailsList
      }
      let res = await getOrderPackageList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        // 初始化套餐订单和商品的相关信息
        res.data.map(order => {
          let orderTotalNum = 0
          let orderTotalPrice = 0
          order.goods.map(goods => {
            goods.deductible_price = 0        // 套餐订单中商品的实际抵扣价格
            goods.deductible_num = 0          // 套餐订单中商品的实际抵扣数量
            let findGoods = null
            let goodsTotalNum = 0
            let goodsTotalPrice = 0
            if (goods.sku_id) {
              findGoods = this.detailsList.find(psg => psg.goods_id === goods.goods_id && psg.sku_id === goods.sku_id)
            } else {
              findGoods = this.detailsList.find(psg => psg.goods_id === goods.goods_id)
            }
            if (findGoods) {
              goodsTotalNum = findGoods.goods_num
              goodsTotalPrice = goods.package_price * goodsTotalNum
              orderTotalNum += goodsTotalNum
              orderTotalPrice += goodsTotalPrice
              goods.goods_num = goodsTotalNum   // 套餐订单中商品的实际购买数量
              goods.goods_totalprice = goodsTotalPrice // 套餐订单中商品的实际促销总价
            }
          })
          order.order_totalnum = orderTotalNum            // 套餐订单中的实际购买商品总数
          order.order_totalprice = orderTotalPrice        // 套餐订单中实际购买的商品促销总价
        })
        // 设置联营套餐
        this.jointPackageList = res.data.filter(i => i.package_type === 1)
        // 设置商家的商家套餐和联营套餐
        this.sellers.map(seller => {
          // 设置商家套餐
          seller.packageList = res.data.filter(i => (i.package_type === 0 && i.seller_id === seller.seller_id))
          // 设置联营套餐
          for (let i = 0; i < this.jointPackageList.length; i++) {
            let jointPackage = this.jointPackageList[i]
            let joinGoodsList = jointPackage.goods.filter(i => i.seller_id === seller.seller_id)
            if (joinGoodsList && joinGoodsList.length > 0) {
              seller.packageList.push(jointPackage)
            }
          }
          seller.package_desc = seller.packageList.length + '个套餐可用'
        })
      }
    },
    // 加载要购买的商品
    async loadGoods () {
      let data = sessionStorage.getItem('orderlist')
      let orderList = JSON.parse(data)
      orderList.map(seller => {
        seller.goods.map(goods => {
          // 套餐抵扣使用
          goods.package_goods_id = null               // 选用的套餐中对应的加入商品id
          goods.package_order_id = null               // 使用套餐订单id
          goods.package_id = null                      // 使用套餐订单所属套餐id
          goods.package_deductibleprice = 0           // 套餐订单抵扣金额
          goods.package_deductiblenum = 0             // 套餐订单抵扣数量
          goods.package_consumption_type = 0          // 套餐订单所属套餐的消费类型
          goods.package_type = 0                        // 套餐订单所属套餐的类型
          // 优惠券抵扣使用
          goods.receive_coupon_id = null              // 优惠券领取id
          goods.coupon_deductibleprice = 0            // 优惠券抵扣金额
          // 商品促销价、实付价
          goods.goods_promotionprice = goods.goods_saleprice      // 商品促销价
          goods.goods_payprice = goods.goods_saleprice * goods.goods_num   // 商品应支付总金额

          this.detailsList.push({
            goods_id: goods.goods_id,
            sku_id: goods.sku_id,
            total_price: goods.goods_saleprice * goods.goods_num,
            goods_num: goods.goods_num,
            seller_id: seller.seller_id,
            shop_id: seller.shop_id
          })
        })
        seller.order_type = seller.order_type || 1      // 默认为商品订单
        // 初始化套餐
        seller.packageList = []                // 订单可用套餐集合
        seller.package_desc = null            // 订单选用套餐描述
        seller.package_id = null              // 订单选用套餐订单对应的套餐id
        seller.deductible_package_orderid = null        // 订单选用套餐订单id
        seller.deductible_package_price = 0  // 订单选用套餐抵扣金额
        // 初始化优惠券
        seller.couponList = []                 // 订单选用优惠券集合
        seller.coupon_desc = null              // 订单选用优惠券描述
        seller.deductible_coupon_receiveid = null        // 订单选用领券记录id
        seller.deductible_coupon_price = 0     // 订单选用优惠券抵扣金额
        // 初始化留言
        seller.order_desc = null                    // 订单留言
        seller.how_oos = 0                            // 缺货处理方式
        seller.best_time = ''                         // 最佳送货时间
        // 初始化配送方式
        seller.order_freight = 0              // 订单实际运费
        seller.order_doorfee = 0              // 订单实际上门费
        seller.expressList = []               // 订单运费中可用的快递公司
        seller.undeliverList = []             // 订单不支持配送的商品
        let shippingmethod = 0
        let shippingmethoddesc = ''
        if (seller.order_type === 1) {
          shippingmethod = 1
          shippingmethoddesc = '商家配送'
        } else if (seller.order_type === 2) {
          shippingmethod = 3
          shippingmethoddesc = '到店服务'
        }
        seller.shipping_method = shippingmethod               // 配送或服务方式（商品为1,服务3）
        seller.shipping_methoddesc = shippingmethoddesc          // 配送方式描述
        seller.shipping_expressid = null                     // 配送指定快递公司id
        // 初始化门店
        seller.shop_id = seller.seller_id                          // 订单店铺id
        seller.shop_name = seller.seller_name                     // 订单店铺名称
        seller.shop_logo = seller.seller_logo                     // 订单店铺logo
        seller.shop_address = seller.seller_address              // 订单店铺地址
        seller.shop_distance = seller.seller_distance            // 订单店铺距离
        // 初始化预约
        seller.appointList = []                                 // 预约时段列表
        seller.appointment_time = null                        // 预约日期
        seller.start_time = null                               // 预约开始时间
        seller.end_time = null                                  // 预约结束时间
        seller.appointment_timename = ''                        // 预约日期
        seller.start_timename = ''                               // 预约开始时间
        seller.end_timename = ''                                  // 预约结束时间
        seller.appointment_desc = ''                          // 预约时间描述
        this.loadExpresss(seller)
        this.loadTimeslots(seller)
      })
      orderList = orderList.filter(seller => seller.goods.length > 0)
      this.order_type = orderList.every(i => i.order_type === 2) ? 2 : 1
      this.sellers = orderList
    },
    // 加载汇率参数
    async loadRate () {
      let res = await getParamValue('lucky_coins_rate_cg')
      if (res && res.code === 200) {
        let rate = parseFloat(res.data.param_value)
        this.rate = rate
      }
    },
    // 加载商家运费
    async loadFreightFees (seller) {
      let isreturn = false
      // 非商品订单
      if (seller.order_type !== 1) isreturn = true
      // 配送缺少收货地址
      if (!this.address) isreturn = true
      // 配送方式非商家配送
      if (seller.shipping_method !== 1) isreturn = true
      if (isreturn) {
        seller.undeliverList = []
        seller.order_freight = 0
        return
      }
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList.filter(i => i.seller_id === seller.seller_id)
      let postData = {
        detailsList: detailsList,
        delivery_addressid: this.address.delivery_addressid,
        express_id: seller.shipping_expressid
      }

      let res = await getLevelOrderFreightFeeList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        let shipObj = res.data.find(i => i.seller_id === seller.seller_id)
        if (shipObj) {
          seller.undeliverList = shipObj.undeliver_goods || []
          if (shipObj.undeliver_goods.length > 0) {
            seller.order_freight = 0
          } else {
            seller.order_freight = shipObj.total_fee || 0
          }
        } else {
          seller.undeliverList = []
          seller.order_freight = 0
        }
      }
    },
    // 加载商家上门费
    async loadIndoorFees (seller) {
      let isreturn = false
      // 非服务订单
      if (seller.order_type !== 2) isreturn = true
      // 缺少上门服务地址
      if (!this.address) isreturn = true
      // 服务方式非上门服务
      if (seller.shipping_method !== 4) isreturn = true
      if (isreturn) {
        seller.order_doorfee = 0
        return
      }
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList.filter(i => i.seller_id === seller.seller_id)
      let postData = {
        detailsList: detailsList,
        delivery_addressid: this.address.delivery_addressid
      }
      let res = await getLevelOrderIndoorFeeList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        let shipObj = res.data.find(i => i.seller_id === seller.seller_id)
        if (shipObj) {
          seller.order_doorfee = shipObj.total_fee || 0
        } else {
          seller.order_doorfee = 0
        }
      }
    },
    // 加载商家运费的快递公司
    async loadExpresss (seller) {
      // 非商品订单
      if (seller.order_type !== 1) return
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList.filter(i => i.seller_id === seller.seller_id)
      let postData = {
        detailsList: detailsList
      }
      let res = await getLevelOrderExpressList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (!res.data) {
          return
        }
        seller.expressList = res.data.filter(i => i.seller_id === seller.seller_id)
      }
    },
    // 加载商家商品预约时段
    async loadTimeslots (seller) {
      // 非服务订单
      if (seller.order_type === 1) return
      // 不支持预约
      if (!seller.is_appointment) return
      if (seller.is_appointment === 0) return
      if (!seller.appoint_template_id) return
      this.setLoading({
        status: true,
        opacity: 0
      })
      let detailsList = this.detailsList.filter(i => i.seller_id === seller.seller_id)
      let postData = {
        detailsList: detailsList,
        template_id: seller.appoint_template_id
      }
      let res = await getOrderTimelotList(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        seller.appointList = res.data
      }
    }
  },
  created () {
    this.loadGoods()
    this.loadRate()
    this.loadMyCoupons()
    this.loadMyPackages()
  },
  activated () {
    this.loadMyDefaultAddress()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.content {
  height: calc(
    100% - #{$default_navbar_height} - #{$default_buytoolbar_height}
  );
}

.order-info {
  background-color: #fff;
  .order-seller {
    padding: 0 20px;
    height: $default_cell_height;
    line-height: $default_cell_height;
    display: flex;
    border-bottom: 1px solid #e6e6e6; /*no*/
    .seller-name {
      font-size: $default_font_size;
      color: $default_title_color;
      vertical-align: middle;
    }
    .seller-logo {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      margin-right: 8px;
      margin-top: 28px;
    }
  }

  .order-goods {
    padding: 20px 20px;
    border-bottom: 1px solid #e6e6e6; /*no*/
    display: table;
    width: 100%;
    .goods-img {
      width: 160px;
      height: 160px;
      margin-right: 20px;
      float: left;
    }
    .goods-info {
      width: calc(100% - 180px);
      min-height: 160px;
      float: left;
      .goods-name {
        font-size: $default_middlefont_size;
        color: $default_title_color;
        @include textHideByLine(2);
      }
      .goods-skuname {
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        margin-top: 14px;
        @include textHideByLine(2);
      }
      .goods-price-num {
        margin-top: 14px;
        .goods-price {
          font-size: 36px;
          height: 54px;
          line-height: 54px;
          color: $default_price_color;
          em {
            font-size: $default_smallfont_size;
            font-style: normal;
            &.old {
              text-decoration: line-through;
              color: $default_subtitle_color;
            }
          }
        }
        .goods-points {
          font-size: 36px;
          height: 54px;
          line-height: 54px;
          color: #ffc600;
          em {
            font-size: $default_smallfont_size;
            font-style: normal;
            &.old {
              text-decoration: line-through;
              color: $default_subtitle_color;
            }
          }
          .redprice {
            color: $default_price_color;
          }
        }
        .package-consume {
          margin-left: 20px;
          height: 54px;
          line-height: 54px;
          padding: 6px 10px;
          font-size: $default_smallfont_size;
          border: 1px solid $default_blue_color;
          color: $default_blue_color;
        }
        .goods-num {
          float: right;
          height: 54px;
          line-height: 54px;
        }
      }
    }
    .goods-other-info {
      margin-top: 10px;
      width: 100%;
      float: left;
      p {
        height: 42px;
        line-height: 42px;
        font-size: $default_smallfont_size;
        color: $default_subtitle_color;
        @include textHideByLine(1);
      }
      .goods-apptime {
        .right {
          float: right;
        }
      }
    }
  }

  .order-other {
    .seller-message {
      padding: 20px;
      display: block;
      font-size: 24px;
      input[type="text"] {
        font-size: $default_font_size;
        color: $default_subtitle_color;
        background-color: #f7f7f7;
        height: 68px;
        width: 100%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        line-height: 68px;
        border-radius: 34px;
        border: 1px solid #eee;
        padding: 0 20px;
      }
    }
    .seller-summary {
      justify-content: flex-end;
    }
  }
}

.order-summary {
  background-color: #fff;
  .item-row {
    padding: 0 20px;
    display: block;
    font-size: $default_font_size;
    height: $default_cell_height;
    line-height: $default_cell_height;
    text-align: left;
    span {
      float: right;
      font-size: $default_font_size;
      color: $default_font_color;
    }
    .red-color {
      color: $default_price_color;
    }
  }
}

.footer {
  width: 100%;
  height: $default_buytoolbar_height;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
  span {
    font-size: $default_font_size;
    color: $default_font_color;
    margin-right: 20px;
    em {
      color: $default_red_color;
      font-style: normal;
      font-size: $default_font_size;
    }
  }
  a {
    width: 168px;
    height: $default_buytoolbar_height;
    text-align: center;
    line-height: $default_buytoolbar_height;
    background-color: $default_red_color;
    color: #fff;
    font-size: $default_font_size;
  }
}
</style>

<style lang="scss">
@import "../../assets/css/pub";
.order-info {
  .weui-cell:before {
    left: 0 !important;
  }
  .weui-cells {
    background-color: $default_background_color;
  }
}
</style>
