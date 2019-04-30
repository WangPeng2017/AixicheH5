<template>
  <div class="view">
    <search-header disabled :keyword="postData.keyword" :replace="true" :searchType="1">
      <i slot="rbuttons" class="msgs-icon" @click="$router.push('/message')"></i>
    </search-header>
    <div class="content">
      <div class="mescroll" id="seller_mescroll">
        <div class="scroll">
          <seller-card v-for="item in data" :key="item.seller_id" :data="item" ></seller-card>
        </div>
        <div id="seller_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchHeader from '@comps/header/searchHeader'
  import sellerCard from '@comps/card/sellerCard/search'
  import { getSellerList } from '@api'
  import qs from 'qs'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      searchHeader,
      sellerCard
    },
    data () {
      return {
        postData: {
          a: this.$route.query.a,
          keyword: (this.$route.query.a === 'search' ? this.$route.query.keyword : ''),
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'seller_evaluate'
        },
        data: [],
        meScroll: null
      }
    },
    methods: {
      // 加载套餐列表
      async loadSellers (page) {
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getSellerList(qs.stringify(this.postData))
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
            this.meScroll = new MeScroll('seller_mescroll', {
              up: {
                callback (page) {
                  self.loadSellers(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: `seller_noData`,
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              }
            })
          }
        })
      }
    },
    created () {
      this.initMeScroll()
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

</style>
