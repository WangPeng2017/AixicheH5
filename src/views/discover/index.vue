<template>
  <div class="view">
    <x-header :left-options="{showBack: false}"
              class="vux-1px-b">发现</x-header>
    <tab custom-bar-width="80px">
      <tab-item v-for="(item, index) in tabData"
                :key="index"
                :selected="item.id===postData.category_id"
                @on-item-click="tabChanged">{{item.text}}</tab-item>
    </tab>
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
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import { Tab, TabItem, XHeader } from 'vux'
import footerNav from '@comps/footerNav'
import articleCard from '@comps/card/articleCard'
import { getArticleList, getArticleCategoryList } from '@api'
import MeScroll from 'mescroll.js'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import qs from 'qs'

export default {
  components: {
    Tab,
    TabItem,
    footerNav,
    XHeader,
    articleCard
  },
  data () {
    return {
      tabData: [],
      data: [],
      postData: {
        keyword: this.$route.query.keyword || '',
        channel_code: 'news',
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
    // 加载新闻分类
    async loadCategories () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getArticleCategoryList(this.postData.channel_code)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.tabData = res.data
        if (this.tabData.length > 0) {
          this.initTab(this.$route.query.tab || 0)
        }
      }
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
    },
    // 选项卡切换
    tabChanged (index) {
      if (this.tabData && this.tabData.length > 0) {
        let tab = this.tabData[index]
        this.postData.category_id = tab.id
        this.initMeScroll()
      }
    },
    // 初始化选项卡
    initTab (val) {
      if (this.tabData && this.tabData.length > 0) {
        // 通过值查询索引
        let index = this.tabData.findIndex(i => i.id === val)
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
    this.loadCategories()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.content {
  height: calc(
    100% - #{$default_navbar_height} - #{$default_tabbar_height} - #{$default_toolbar_height}
  );
}
</style>
