<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.query.title}}</x-header>
    <data-sort :data="sortData"
               :enableSwitch="true"
               :enableFilter="false"
               :display="display"
               @sortChange="sortChange"
               @switchChange="changeDisplay"></data-sort>
    <div class="content">
      <div class="mescroll"
           id="packagegoods_mescroll">
        <div class="scroll">
          <goods-card v-for="item in data"
                      :key="item.id"
                      :data="item"
                      :consumption_types="$route.query.consumption_types"
                      :type="display"></goods-card>
        </div>
        <div id="packagegoods_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import dataSort from '@comps/dataSort'
import goodsCard from '@comps/card/goodsCard/package'
import { getGoodsListForPackage } from '@api'
import MeScroll from 'mescroll.js'
import { mapState, mapMutations } from 'vuex'
import qs from 'qs'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    XHeader,
    dataSort,
    goodsCard
  },
  computed: {
    ...mapState(['longitude', 'latitude'])
  },
  data () {
    return {
      sortData: [
        {
          type: 1,
          name: '距离',
          status: true,
          isUp: true,
          list: [
            { status: false, sidx: 'other', title: '综合', sord: 'desc' },
            { status: false, sidx: 'create_time', title: '新品', sord: 'desc' },
            { status: true, sidx: 'seller_distance', title: '距离', sord: 'asc' },
            { status: false, sidx: 'goods_evaluationnum', title: '评价', sord: 'desc' }
          ]
        }, {
          type: 2,
          name: '销量',
          status: false,
          isUp: false,
          list: [
            { status: false, sidx: 'goods_salenum', title: '销量从高到低', sord: 'desc' }
          ]
        }, {
          type: 3,
          name: '价格',
          status: false,
          isUp: true,
          list: [
            { status: false, sidx: 'package_price', title: '价格从低到高', sord: 'asc' },
            { status: false, sidx: 'package_price', title: '价格从高到低', sord: 'desc' }
          ]
        }
      ],
      data: [],
      postData: {
        package_id: this.$route.query.id,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'seller_distance'
      },
      display: true,
      meScroll: null
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载店铺商品
    async loadGoods (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      this.postData.longitude = this.longitude || 0
      this.postData.latitude = this.latitude || 0
      let res = await getGoodsListForPackage(qs.stringify(this.postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.data = []
        }
        this.data = [...this.data, ...res.data.list]
        let hasNext = (this.data.length < res.data.length)
        this.meScroll.endSuccess(res.data.length, hasNext)
      } else {
        this.meScroll.endErr()
      }
    },
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('packagegoods_mescroll', {
            up: {
              callback (page) {
                self.loadGoods(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: 'packagegoods_noData',
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    },
    // 排序商品
    sortChange (data) {
      this.postData.sord = data.sord
      this.postData.sidx = data.sidx
      this.postData.page = 1
      this.initMeScroll()
    },
    // 显示方式切换
    changeDisplay () {
      this.display = !this.display
    },
    // 加载位置
    loadLocation () {
      this.postData.longitude = this.longitude || 0
      this.postData.latitude = this.latitude || 0
    }
  },
  created () {
    this.loadLocation()
    this.initMeScroll()
  },
  activated () {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.content {
  height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
}
</style>
