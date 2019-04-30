<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">我的优惠券</x-header>
    <tab :scroll-threshold="3">
      <tab-item v-for="(item, index) in tabData" :key="index" :selected="item.status===postData.status" @on-item-click="tabChanged">{{item.text}}</tab-item>
    </tab>
    <div class="content">
      <div class="mescroll" id="mycoupon_mescroll">
        <div class="scroll">
          <coupon-card :data="item" v-for="item in data" :key="item.receive_id" @handleClick="gotoUse"></coupon-card>
        </div>
        <div id="mycoupon_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, XHeader } from 'vux'
  import couponCard from '@comps/card/couponOrderCard'
  import { getCouponOrderList } from '@api'
  import MeScroll from 'mescroll.js'
  import {SET_LOADING} from '@store/type'
  import { mapState, mapMutations } from 'vuex'
  import qs from 'qs'

  export default {
    name: 'myPackageView',
    components: {
      Tab,
      TabItem,
      XHeader,
      couponCard
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        tabData: [
          {text: '未使用', status: 0},
          {text: '已使用', status: 1},
          {text: '已过期', status: 2}
        ],
        meScroll: null,
        data: [],
        postData: {
          status: null,
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'receive_date'
        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 状态切换
      tabChanged (index) {
        if (this.tabData && this.tabData.length > 0) {
          let tab = this.tabData[index]
          this.postData.status = tab.status
          this.initMeScroll()
        }
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
      // 初始化滚动控件
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          if (this.meScroll) {
            this.meScroll.resetUpScroll()
            return
          }
          this.meScroll = new MeScroll('mycoupon_mescroll', {
            up: {
              callback (page) {
                self.loadMyCoupons(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `mycoupon_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        })
      },
      // 加载我的优惠券
      async loadMyCoupons (page) {
        this.postData.page = page.num
        this.postData.rows = page.size
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCouponOrderList(qs.stringify(this.postData))
        this.setLoading(false)
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data = []
          }
          this.data = [
            ...this.data,
            ...res.data.list
          ]
          let hasNext = (this.data.length < res.data.length)
          this.meScroll.endSuccess(res.data.length, hasNext)
        } else {
          this.meScroll.endErr()
        }
      },
      async gotoUse (item) {
        if (item.coupon_userange === 0) {
          this.$router.push(`/sellerIndex/${item.seller_id}`)
        } else if (item.coupon_userange === 1) {
          this.$router.push({
            path: '/goodsListForCoupon',
            query: {
              id: item.coupon_id,
              title: item.coupon_name
            }
          })
        }
      }
    },
    created () {
      // 默认为未使用状态
      this.initTab(this.$route.query.tab || 0)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }

  .card {
    &:first-child {
      margin-top: 20px;
    }
  }

</style>
