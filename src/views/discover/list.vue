<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.query.title}}</x-header>
    <div class="content">
      <div class="mescroll"
           id="discover_mescroll">
        <div class="scroll">
          <article-card v-for="item in data"
                        :data="item"
                        :key="item.article_id"></article-card>
        </div>
        <div id="discover_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import articleCard from '@comps/card/articleCard'
import { getArticleList } from '@api'
import MeScroll from 'mescroll.js'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import qs from 'qs'

export default {
  components: {
    XHeader,
    articleCard
  },
  data () {
    return {
      data: [],
      postData: {
        keyword: this.$route.query.keyword || '',
        channel_id: this.$route.query.channel_id,
        category_id: null,
        page: 1,
        rows: 10,
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
    // 加载频道资讯集合
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
    },
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('discover_mescroll', {
            up: {
              callback (page) {
                self.loadArticles(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `discover_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    }
  },
  async created () {
    this.initMeScroll()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
</style>
