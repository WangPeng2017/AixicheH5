<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">使用记录</x-header>
    <package-order-card class="orderCard" :data="packageOrderData" :showBalance="packageOrderData.consumption_types===0"></package-order-card>
    <div class="content">
      <div class="mescroll" id="packageorderlog_mescroll">
        <div class="scroll">
          <money-use-log-card v-for="group in data" :data="group" :key="group.date" v-if="packageOrderData.consumption_types === 0"></money-use-log-card>
          <times-use-log-card v-for="group in data" :data="group" :key="group.group_package_goods_id" v-if="packageOrderData.consumption_types === 1"></times-use-log-card>
        </div>
        <div id="packageorderlog_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import packageOrderCard from '@comps/card/packageOrderCard'
  import moneyUseLogCard from '@comps/card/packageLogCard/moneyUseLog'
  import timesUseLogCard from '@comps/card/packageLogCard/timesUseLog'
  import { getPackageOrderRecordsList } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  import qs from 'qs'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      XHeader,
      packageOrderCard,
      moneyUseLogCard,
      timesUseLogCard
    },
    data () {
      return {
        data: [],
        packageOrderData: {},
        postData: {
          order_id: this.$route.params.id,
          consumption_types: 0,
          sord: 'desc',
          sidx: 'create_time'
        },
        meScroll: null
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 初始化滚动区
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          if (this.meScroll) {
            this.meScroll.resetUpScroll()
          } else {
            this.meScroll = new MeScroll('packageorderlog_mescroll', {
              down: {
                use: false
              },
              up: {
                callback (page) {
                  self.loadUseLog(page)
                },
                noMoreSize: 10,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: `packageorderlog_noData`,
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              }
            })
          }
        })
      },
      // 加载套餐
      loadPackageOrder () {
        let jsonStr = sessionStorage.getItem('package_info')
        this.packageOrderData = JSON.parse(jsonStr)
        this.postData.order_id = this.packageOrderData.order_id
        this.postData.consumption_types = this.packageOrderData.consumption_types
      },
      // 加载套餐使用记录
      async loadUseLog (page) {
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getPackageOrderRecordsList(qs.stringify(this.postData))
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data = []
          }
          this.data = [
            ...this.data,
            ...res.data.list
          ]
          let len = 0
          this.data.map(i => {
            len += i.records.length
          })
          let hasNext = (len < res.data.length)
          this.meScroll.endSuccess(res.data.length, hasNext)
        } else {
          this.meScroll.endErr()
        }
      }
    },
    created () {
      this.loadPackageOrder()
      this.initMeScroll()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - 180px);
  }

  .orderCard {
    width: 100%;
    box-shadow: 0 0.013333rem 0.026667rem 0 rgba(0, 0, 0, 0.13);
  }
</style>
