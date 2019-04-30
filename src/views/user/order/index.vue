<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">我的订单</x-header>
    <tab :scroll-threshold="5">
      <tab-item v-for="(item, index) in tabData"
                :key="index"
                :selected="item.status===postData.status"
                @on-item-click="tabChanged">{{item.text}}</tab-item>
    </tab>
    <div class="content">
      <div class="mescroll"
           id="goodsorder_mescroll">
        <div class="scroll">
          <div class="order-card"
               v-for="order in data"
               :key="order.order_id">
            <div class="order-header">
              <div class="left"
                   @click="$router.push(`/sellerIndex/${order.seller_id}`)">
                <img class="seller-logo"
                     :src="order.seller_logo"
                     alt=""
                     v-imgField />
                <span class="seller-name">{{order.seller_name}}</span>
                <i class="right-icon"></i>
              </div>
              <div class="right">
                <goods-order-tag :data="order"></goods-order-tag>
              </div>
            </div>
            <router-link :to="'/myOrderDetail/' + order.order_id">
              <goods-card v-for="(details, index) in order.goods"
                          :key="details.details_id"
                          :data="details"></goods-card>
            </router-link>
            <!-- 订单小计 -->
            <div class="order-total">
              <div class="right">
                <p>
                  共{{order.total_num}}{{order.order_type === 1 ? '件商品' : '次服务'}}，
                  合计：￥{{parseFloat(order.total_money).toFixed(2)}}
                  {{(order.order_freight > 0) ? '(含运费￥' + order.order_freight.toFixed(2) + ')' : ''}}
                  {{(order.order_doorfee > 0) ? '(含上门费' + order.order_doorfee.toFixed(2) + ')' : ''}}
                </p>
                <p>
                  实付：￥{{parseFloat(order.order_amount).toFixed(2)}}
                </p>
              </div>
            </div>
            <div class="btn-group"
                 v-if="order.showToolbar">
              <a class="button borderbtn"
                 @click="payOrder(order)"
                 v-if="(order.order_status === 0 || order.order_status === 1) && order.pay_status === 0 && order.shipping_status === 0">付款</a>
              <a class="button"
                 @click="cancelOrder(order)"
                 v-if="(order.order_status === 0 || order.order_status === 1) && order.pay_status === 0 && order.shipping_status === 0">取消订单</a>
              <a class="button"
                 @click="confirmOrder(order)"
                 v-if="(order.order_status === 0 || order.order_status === 1) && order.pay_status === 2 && order.shipping_status === 2">确认收货</a>
              <a class="button"
                 @click="$router.push(`/myEvaluateAdd/` + order.order_id)"
                 v-if="order.order_status === 200 && order.pay_status === 2 && order.shipping_status === 3 && order.order_evaluatestatus === 0">评价</a>
            </div>
          </div>
        </div>
        <div id="goodsorder_noData"></div>
      </div>

      <!-- 消息区 -->
      <div v-transfer-dom>
        <alert v-model="showMsg"
               title="感谢您的购买">{{msgContent}}</alert>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, XHeader, TransferDom, Alert } from 'vux'
import goodsCard from '@comps/card/goodsCard/order'
import goodsOrderTag from '@comps/tag/goodsOrderTag'
import MeScroll from 'mescroll.js'
import { getOrderList, cancelOrder, confirmOrder, deleteOrder, createGoodsOtherPay } from '@api'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Confirm)

export default {
  components: {
    Tab,
    TabItem,
    XHeader,
    Alert,
    TransferDom,
    goodsCard,
    goodsOrderTag
  },
  computed: {
    ...mapState(['token'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      tabData: [
        { text: '全部', status: -1 },
        { text: '待付款', status: 1 },
        { text: '待发货', status: 2 },
        { text: '待收货', status: 3 },
        { text: '待评价', status: 200 }
      ],
      meScroll: null,
      data: [],
      postData: {
        status: null,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'create_time'
      },
      isCreate: true,
      showMsg: false,
      msgContent: ''
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 状态切换
    tabChanged (index) {
      if (this.tabData && this.tabData.length > 0) {
        let item = this.tabData[index]
        this.postData.status = item.status
        this.initMeScroll()
      }
    },
    // 是否显示工具栏
    showToolbar (item) {
      // 存在至少一个非售后商品
      let hasAllRefund = item.goods.every(g => g.process_status === 1)
      if (hasAllRefund) {
        return false
      }
      // 付款，删除订单
      if ((item.order_status === 0 || item.order_status === 1) && item.pay_status === 0 && item.shipping_status === 0) {
        return true
      }
      // 确认收货
      if ((item.order_status === 0 || item.order_status === 1) && item.pay_status === 2 && item.shipping_status === 2) {
        return true
      }
      // 评价
      if (item.order_status === 200 && item.pay_status === 2 && item.shipping_status === 3 && item.order_evaluatestatus === 0) {
        return true
      }
      return false
    },
    // 初始化选项卡状态
    initTab (val) {
      if (this.tabData && this.tabData.length > 0) {
        // 通过值查询索引
        let index = this.tabData.findIndex(i => i.status === val)
        if (index === -1) {
          index = 0
        }
        this.tabChanged(index)
      }
    },
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
          return
        }
        this.meScroll = new MeScroll('goodsorder_mescroll', {
          up: {
            callback (page) {
              self.loadOrders(page)
            },
            noMoreSize: 1,
            htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
            empty: {
              warpId: `goodsorder_noData`,
              tip: '没有更多的数据',
              icon: '/static/withoutData@2x.png'
            }
          }
        })
      })
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
        // 判断此订单商品是否为积分商品
        if (order.order_sn.substring(0, 1) === 'J') {
          // 需要现金支付，跳转积分收银台
          this.$router.push({
            path: '/pocashier',
            query: {
              id: no,
              no: no,
              price: totalPayprice,
              type: 'goods',
              body: no,
              attach: false    // 子订单单独支付
            }
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
            if (self.meScroll) {
              self.meScroll.resetUpScroll()
            }
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
            if (self.meScroll) {
              self.meScroll.resetUpScroll()
            }
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
            if (self.meScroll) {
              self.meScroll.resetUpScroll()
            }
          }
        })
      }).catch(() => {

      })
    },
    // 加载我的订单
    async loadOrders (page) {
      this.postData.page = page.num
      this.postData.rows = page.size

      let res = await getOrderList(qs.stringify(this.postData))
      if (res && res.code === 200) {
        res.data.list.map(i => {
          i.showToolbar = this.showToolbar(i)
        })
        if (page.num === 1) {
          this.data = []
        }
        this.data = [
          ...this.data,
          ...res.data.list
        ]
        let hasNext = (this.data.length < res.data.length)
        this.meScroll.endSuccess(res.data.length, hasNext)
      }
    }
  },
  created () {
    // 默认为待付款状态
    this.initTab(this.$route.query.tab || 1)
  },
  activated () {
    if (this.isCreate) {
      this.isCreate = false
    } else {
      if (this.meScroll) {
        this.meScroll.resetUpScroll()
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import "../../../assets/css/pub";

.content {
  height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
}

.order-card {
  margin-top: 20px;
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
      height: $default_row_height;
      line-height: $default_row_height;
      color: $default_title_color;
      text-align: right;
    }
    em {
      font-style: normal;
      font-size: $default_font_size;
      color: $default_title_color;
    }
  }

  .btn-group {
    border-top: 1px solid $default_border_color; /*no*/
    height: $default_cell_height;
    line-height: $default_cell_height;
    padding: 0px 20px;
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
</style>
