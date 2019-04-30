<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">订单详情</x-header>

    <div class="content">
      <div class="header-group">
        <div class="header-row">
          <p class="seller-state">
            <goods-order-tag :data="data"></goods-order-tag>
          </p>
        </div>
      </div>
      <address-card :data="data"></address-card>
      <div class="order-card">
        <div class="order-header">
          <div class="left"
               @click="$router.push(`/sellerIndex/${data.seller_id}`)">
            <img class="seller-logo"
                 :src="data.seller_logo"
                 alt=""
                 v-imgField />
            <span class="seller-name">{{data.seller_name}}</span>
            <i class="right-icon"></i>
          </div>
          <div class="right"></div>
        </div>
        <goods-card v-for="(details, index) in data.goods"
                    :key="details.details_id"
                    :data="details"
                    :isPay="data.pay_status === 2"></goods-card>
        <!-- 订单小计 -->
        <div class="order-total">
          <div class="right">
            <p>
              共{{data.total_num}}{{data.order_type === 1 ? '件商品' : '次服务'}}，
              合计：￥{{parseFloat(data.total_money).toFixed(2)}}
              {{(data.order_freight > 0) ? '(含运费￥' + data.order_freight.toFixed(2) + ')' : ''}}
              {{(data.order_doorfee > 0) ? '(含上门费' + data.order_doorfee.toFixed(2) + ')' : ''}}
            </p>
          </div>
        </div>
      </div>

      <div class="item-group">
        <p class="item-row">订单编号<span>{{ data.order_sn || '无' }}</span></p>
        <p class="item-row">下单时间<span>{{ data.create_time || '无' }}</span></p>
        <p class="item-row"
           v-if="data.order_type===1">发货时间<span>{{ data.delivery_time || '无' }}</span></p>
        <p class="item-row">成交时间<span>{{ data.receive_time || '无' }}</span></p>
      </div>
      <div class="item-group"
           v-if="data.pay_status===2">
        <p class="item-row">支付方式<span>{{ data.pay_name || '无' }}</span></p>
        <p class="item-row">支付时间<span>{{ data.pay_time || '无' }}</span></p>
        <p class="item-row"
           v-if="data.pay_type === 4 && data.deductible_package_price > 0">使用套餐<span>{{ data.deductible_package_name || '' }}</span></p>
        <p class="item-row"
           v-if="data.pay_type === 5 && data.deductible_coupon_price > 0">使用优惠券<span>{{ data.deductible_coupon_name || '' }}</span></p>
      </div>

      <div class="item-group">
        <p class="item-row">发票
          <span>{{ data | invoiceName }}</span>
        </p>
      </div>

      <div class="item-group margin-bottom">
        <p class="item-row">商品金额<span>￥{{ parseFloat(data.total_money).toFixed(2) }}</span></p>
        <p class="item-row"
           v-if="data.order_freight > 0">运费<span class="red-color">+￥{{ parseFloat(data.order_freight).toFixed(2) }}</span></p>
        <p class="item-row"
           v-if="data.order_doorfee > 0">上门费<span class="red-color">+￥{{ parseFloat(data.order_doorfee).toFixed(2) }}</span></p>
        <p class="item-row">套餐立减<span class="red-color">-￥{{ parseFloat(data.deductible_package_price).toFixed(2) }}</span></p>
        <p class="item-row">优惠券立减<span class="red-color">-￥{{ parseFloat(data.deductible_coupon_price).toFixed(2) }}</span></p>
      </div>
    </div>

    <footer class="footer">
      <div class="left">
        <span>实付：<em>￥{{ parseFloat(data.order_amount).toFixed(2) }}</em></span>
      </div>
      <div class="right">
        <div class="btn-group">
          <template v-if="!data.hasAllRefund">
            <a class="button borderbtn"
               @click="payOrder(data)"
               v-if="(data.order_status === 0 || data.order_status === 1) && data.pay_status === 0 && data.shipping_status === 0">付款</a>
            <a class="button"
               @click="cancelOrder(data)"
               v-if="(data.order_status === 0 || data.order_status === 1) && data.pay_status === 0 && data.shipping_status === 0">取消订单</a>

            <a class="button"
               @click="confirmOrder(data)"
               v-if="(data.order_status === 0 || data.order_status === 1) && data.pay_status === 2 && data.shipping_status === 2">确认收货</a>
            <a class="button"
               @click="$router.push(`/myEvaluateAdd/` + item.order_id)"
               v-if="data.order_status === 200 && data.pay_status === 2 && data.shipping_status === 3 && data.order_evaluatestatus === 0">评价</a>
          </template>
          <a class="button"
             :href="`tel:${data.shop_phone}`">联系卖家</a>
        </div>
      </div>
    </footer>

    <!-- 消息区 -->
    <div v-transfer-dom>
      <alert v-model="showMsg"
             title="感谢您的购买">{{msgContent}}</alert>
    </div>
  </div>
</template>

<script>
import { TransferDom, Alert } from 'vux'
import addressCard from '@comps/card/addressCard/order'
import goodsCard from '@comps/card/goodsCard/order'
import goodsOrderTag from '@comps/tag/goodsOrderTag'
import { getOrderDetail, cancelOrder, confirmOrder, deleteOrder, createGoodsOtherPay } from '@api'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Confirm)

export default {
  components: {
    TransferDom,
    Alert,
    addressCard,
    goodsCard,
    goodsOrderTag
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      data: {},
      showMsg: false,
      msgContent: ''
    }
  },
  filters: {
    // 发票
    invoiceName (item) {
      let text = ''
      if (item.is_invoice === 1) {
        switch (item.inv_type) {
          case 0:
            text += '个人'
            break
          case 1:
            text += '公司'
            break
          default:
            break
        }

        switch (item.inv_property) {
          case 0:
            text += '普通发票'
            break
          case 1:
            text += '增值税发票'
            break
          default:
            break
        }

        if (item.inv_content) {
          text += item.inv_content
        }
      } else {
        text += '不开发票'
      }

      return text
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载订单详情
    async loadOrderDetail () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getOrderDetail(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        res.data.hasAllRefund = res.data.goods.every(g => g.process_status === 1)
        this.data = res.data
      }
    },
    // 支付待付款订单
    async payOrder (order) {
      let totalPayprice = order.order_amount
      let payType = order.pay_type
      let no = order.order_sn
      if (totalPayprice <= 0) {
        // 套餐全额支付，支付成功
        let self = this
        let payName = '其他'
        if (order.deductible_package_price > 0) {
          payName = '套餐'
          payType = 4
        } else if (order.deductible_coupon_price > 0) {
          payName = '优惠券'
          payType = 5
        }
        this.$confirm({
          title: '',
          content: '您确定要使用' + payName + '支付吗？',
          yesText: '确定',
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
          let form = new FormData()
          form.append('order_no', no)
          form.append('pay_type', payType)
          createGoodsOtherPay(form).then((res) => {
            if (res && res.code === 200) {
              // 无需付款，购买成功，跳转购买成功
              let totalPrice = order.total_money
              self.$router.push(`/paySuccess/` + no + `/` + totalPrice)
            }
          })
        })
      } else {
        // 需要现金支付，跳转收银台
        this.$router.push({
          path: '/cashier',
          query: {
            id: no,
            no: no,
            price: totalPayprice,
            type: 'goods',
            body: no,
            attach: false    // 子订单单独支付
          }
        })
      }
    },
    // 取消订单
    async cancelOrder (order) {
      let self = this
      this.$confirm({
        title: '',
        content: '您确定要取消订单吗？',
        yesText: '确定',
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
        self.setLoading({
          status: true,
          opacity: 0
        })
        let form = new FormData()
        form.append('order_id', order.order_id)
        cancelOrder(form).then(res => {
          self.setLoading(false)
          if (res && res.code === 200) {
            self.$toasted.show(res.msg)
            // 返回我的订单列表
            this.$router.back()
          }
        })
      }).catch(() => {

      })
    },
    // 确认订单
    async confirmOrder (order) {
      let self = this
      this.$confirm({
        title: '',
        content: '您确定订单已经完成？',
        yesText: '确定',
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
        self.setLoading({
          status: true,
          opacity: 0
        })
        let form = new FormData()
        form.append('order_id', order.order_id)
        confirmOrder(form).then(res => {
          self.setLoading(false)
          if (res && res.code === 200) {
            if (res.data > 0) {
              self.msgContent = '您已成功获得红心' + res.data
              self.showMsg = true
            }
            self.$toasted.show(res.msg)
            // 刷新订单详情
            this.loadMyOrder()
          }
        })
      }).catch(() => {

      })
    },
    // 删除订单
    async deleteOrder (order) {
      let self = this
      this.$confirm({
        title: '',
        content: '您确定要删除吗？',
        yesText: '确定',
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
        self.setLoading({
          status: true,
          opacity: 0
        })
        let form = new FormData()
        form.append('order_id', order.order_id)
        deleteOrder(form).then(res => {
          self.setLoading(false)
          if (res && res.code === 200) {
            self.$toasted.show(res.msg)
            // 返回我的订单列表
            this.$router.back()
          }
        })
      }).catch(() => {

      })
    }
  },
  created () {

  },
  activated () {
    this.loadOrderDetail()
  }
}
</script>

<style lang="scss">
@import "../../../assets/css/pub";
.seller-state {
  .tag {
    i {
      color: #fff !important;
      font-size: $default_bigfont_size !important;
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../../assets/css/pub";
.content {
  height: calc(
    100% - #{$default_navbar_height} - #{$default_buytoolbar_height}
  );
}

.header-group {
  height: 200px;
  width: 100vw;
  background: $default_theme_color url(../../../assets/image/order_header.png)
    no-repeat 90% center;
  background-size: auto 100%;
  .header-row {
    position: static;
    padding: 0 5rem 0 1.06667rem;
    height: 100%;
    -webkit-box-align: center;
    -ms-box-align: center;
    -o-box-align: center;
    box-align: center;
    display: -webkit-box;
    display: -moz-box;
    height: 2.66667rem;
  }
}

.order-card {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  .order-header {
    padding: 0 20px;
    height: $default_cell_height;
    line-height: $default_cell_height;
    font-size: $default_font_size;
    color: $default_title_color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      .seller-logo {
        width: $default_cell_icon_size;
        height: $default_cell_icon_size;
        border-radius: $default_cell_icon_size;
        margin-right: 20px;
      }
      .seller-name {
        margin-right: 20px;
      }
    }
    .right {
      height: $default_row_height;
      line-height: $default_row_height;
      text-align: right;
    }
  }

  .order-total {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: $default_font_size;
    .left {
      text-align: left;
      flex: none;
    }
    .right {
      text-align: right;
      flex: 1;
    }
    p {
      height: $default_cell_height;
      line-height: $default_cell_height;
      color: $default_title_color;
      text-align: right;
    }
    em {
      font-style: normal;
      font-size: $default_font_size;
      color: $default_title_color;
    }
  }
}

.item-group {
  background-color: #fff;
  margin-bottom: 20px;
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
      color: $default_subtitle_color;
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
  align-items: center;
  box-shadow: -1.9px -5.7px 12.9px 0.1px rgba(8, 1, 3, 0.27);
  .left {
    flex: 1;
    span {
      font-size: $default_font_size;
      color: $default_font_color;
      margin-left: 30px;
      em {
        color: $default_red_color;
        font-style: normal;
        font-size: $default_font_size;
      }
    }
  }
  .right {
    .btn-group {
      height: $default_cell_height;
      line-height: $default_cell_height;
      padding: 0 20px;
      background-color: #fff;
      display: block;
      flex-direction: row-reverse;
      a.button {
        margin: 14px 0px;
        margin-left: 20px;
        float: right;
        line-height: 56px;
        padding: 0 20px;
        border: 1px solid $default_border_color; /*no*/
        border-radius: 40px;
        background-color: transparent;
        font-size: $default_middlefont_size;
        box-sizing: border-box;
      }
      a.borderbtn {
        color: $default_orange_color;
        background-color: transparent;
        border: 1px solid $default_orange_color; /*no*/
      }
    }
  }
}
</style>
