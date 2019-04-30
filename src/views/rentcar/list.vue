<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">租车</x-header>
    <div class="content">
      <div class="mescroll" id="rentcar_mescroll">
        <div class="scroll">
          <rentcar-card v-for="item in data" :data="item" :key="item.article_id"></rentcar-card>
        </div>
        <div id="rentcar_noData"></div>
      </div>
    </div>
    <fixed-bot-btn @click="$router.push('/myRentcar')">我的租车</fixed-bot-btn>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import rentcarCard from '@comps/card/articleCard/rentcar'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import MeScroll from 'mescroll.js'
  import { mapMutations } from 'vuex'
  import { getArticleList } from '@api'
  import qs from 'qs'
  import {SET_LOADING} from '@store/type'

  export default {
    components: {
      XHeader,
      rentcarCard,
      fixedBotBtn
    },
    data () {
      return {
        data: [],
        postData: {
          keyword: this.$route.query.keyword || '',
          channel_code: 'rentcar',
          category_id: null,
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'article_sort asc,publish_time'
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
            this.meScroll = new MeScroll('rentcar_mescroll', {
              up: {
                callback (page) {
                  self.loadArticles(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: `rentcar_noData`,
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              }
            })
          }
        })
      },
      // 加载资讯集合
      async loadArticles (page) {
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getArticleList(qs.stringify(this.postData))
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
      }
    },
    created () {
      this.initMeScroll()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }
</style>
