<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">我的套餐</x-header>
    <tab :scroll-threshold="5">
      <tab-item v-for="(item, index) in tabData" :key="index" :selected="item.status===postData.status" @on-item-click="tabChanged">{{item.text}}</tab-item>
    </tab>
    <div class="content">
      <div class="mescroll" id="packageorder_mescroll">
        <div class="scroll">
          <package-order-card v-for="item in data" :key="item.order_id" :data="item" :showBalance="false">
            <div slot="footer" class="btnGroup">
              <package-order-tag :data="item">{{ item.statusName}}</package-order-tag>
              <template v-if="item.pay_status === 1">
                <a href="javascript:void(0);" class="button" @click="gotoUselog(item)">使用记录</a>
              </template>

              <template v-if="item.pay_status === 0 && new Date(item.expirydate) > new Date()">
                <a href="javascript:void(0);" class="button borderbtn" @click="payOrder(item)">去付款</a>
                <a href="javascript:void(0);" class="button" @click="delOrder(item)">取消</a>
              </template>

            </div>
          </package-order-card>
        </div>
        <div id="packageorder_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, XHeader } from 'vux'
  import packageOrderCard from '@comps/card/packageOrderCard'
  import packageOrderTag from '@comps/tag/packageOrderTag'
  import { getPackageOrderList, deletePackageOrder } from '@api'
  import MeScroll from 'mescroll.js'
  import { mapState, mapMutations } from 'vuex'
  import {SET_LOADING} from '@store/type'
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
      packageOrderCard,
      packageOrderTag
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        tabData: [
          {text: '全部', status: -1},
          {text: '待付款', status: 1},
          {text: '待使用', status: 2},
          {text: '已作废', status: 3}
        ],
        meScroll: null,
        data: [],
        postData: {
          status: null,
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'create_time'
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
          this.meScroll = new MeScroll('packageorder_mescroll', {
            up: {
              callback (page) {
                self.loadMyPackages(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `packageorder_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        })
      },
      // 加载我的套餐
      async loadMyPackages (page) {
        this.postData.page = page.num
        this.postData.rows = page.size

        let res = await getPackageOrderList(qs.stringify(this.postData))
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
      // 去支付
      async payOrder (item) {
        let no = item.order_no
        let totalPayprice = item.package_price
        this.$router.push({
          path: '/cashier',
          query: {
            id: no,
            no: no,
            price: totalPayprice,
            type: 'package',
            body: no,
            attach: true
          }
        })
      },
      // 取消或删除套餐
      async delOrder (item) {
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
          form.append('order_id', item.order_id)
          deletePackageOrder(form).then((res) => {
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
      // 查看使用记录
      async gotoUselog (item) {
        let jsonStr = JSON.stringify(item)
        sessionStorage.setItem('package_info', jsonStr)
        this.$router.push(`/myPackageUseLog/${item.order_id}`)
      }
    },
    created () {
      // 默认为待付款状态
      this.initTab(this.$route.query.tab || 1)
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

  .btnGroup {
    border-top: 1px solid $default_border_color;/*no*/
    height: $default_cell_height;
    line-height: $default_cell_height;
    padding-left: 20px;
    background-color: #fff;
    display: block;
    flex-direction: row-reverse;
    a {
      margin-top: 16px;
    }
    a.button {
      float: right;
      /*height: 50px;*/
      line-height: 50px;
      padding: 0 20px;
      border: solid 1px $default_border_color;/*no*/
      border-radius: 10px;
      background-color: transparent;
      font-size: $default_middlefont_size;
      margin-right: 20px;
      box-sizing: border-box;
      &.borderbtn {
        color: $default_orange_color;
        background-color: transparent;
        border: 1px solid $default_orange_color;/*no*/
      }
    }
  }

</style>
