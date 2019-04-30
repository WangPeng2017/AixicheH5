<template>
  <div class="view">
    <search-header :keyword="postData.keyword"
                   @input="handleChange"
                   ref="search"
                   @search="enterSearch"></search-header>
    <tab :scroll-threshold="4"
         active-color="#f15353"
         bar-active-color="#f15353">
      <tab-item v-for="(item, index) in tabData"
                :key="index"
                :selected="index===tabIndex"
                @on-item-click="tabChanged">{{item}}</tab-item>
    </tab>
    <div class="content">
      <div class="hothistroy"
           v-if="matchSearchData.length === 0 && hotSearchData.length > 0">
        <list-card class="myhistory-header"
                   :label="'热门搜索'"></list-card>
        <div class="myhistroy-content">
          <search-history-tag :label="item"
                              v-for="(item, index) in hotSearchData"
                              :key="index"
                              @click="tagSearch(item)"></search-history-tag>
        </div>
      </div>

      <div class="myhistroy"
           v-if="matchSearchData.length === 0 && historyData.length > 0">
        <list-card class="myhistory-header"
                   :label="'历史搜索'">
          <i class="rubbish-icon"
             slot="ricon"
             @click="clearHistroy"></i>
        </list-card>
        <div class="myhistroy-content">
          <search-history-tag :label="item"
                              v-for="(item, index) in historyData"
                              :key="index"
                              @click="tagSearch(item)"></search-history-tag>
        </div>
      </div>

      <div class="matchHothistroy"
           v-if="matchSearchData.length > 0">
        <list-card class="myhistory-header"
                   :label="'推荐相关搜索'"></list-card>
        <list-card :label="item"
                   v-for="(item, index) in matchSearchData"
                   :key="index"
                   @click="tagSearch(item)">
          <i class="right-icon"
             slot="ricon"></i>
        </list-card>
      </div>
      <withoutdata label="暂无历史搜索记录"
                   v-if="historyData.length == 0"></withoutdata>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Divider } from 'vux'
import searchHeader from '@comps/header/searchHeader'
import listCard from '@comps/card/listCard'
import searchHistoryTag from '@comps/tag/searchHistoryTag'
import withoutdata from '@comps/withoutdata'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import { getKeywordsList } from '@api'
import qs from 'qs'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Confirm)

export default {
  name: 'searchView',
  components: {
    searchHeader,
    Tab,
    TabItem,
    Divider,
    listCard,
    searchHistoryTag,
    withoutdata
  },
  data () {
    return {
      tabIndex: 0,
      tabData: ['商品', '店铺', '套餐', '专区'],
      hotSearchData: [],
      matchSearchData: [],
      historyData: [],
      // 匹配热搜参数
      postData: {
        keyword: '',
        type: 1,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'keywords_count'
      },
      // 热搜参数
      hotPostData: {
        keyword: '',
        type: 1,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'keywords_count'
      }
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 清除历史记录
    clearHistroy () {
      this.$confirm({
        title: '',
        content: '您确定要清除搜索历史吗？',
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
        this.historyData = []
        localStorage.removeItem('search_histroy')
      }).catch(() => {

      })
    },
    // 回车或点击搜索
    enterSearch () {
      let keyword = this.$refs.search.getVal()
      this.search(keyword)
    },
    // 点击搜索历史搜索
    tagSearch (keyword) {
      this.search(keyword)
    },
    // 开始搜索
    search (keyword) {
      if (keyword.length > 0) {
        if (this.historyData.length > 30) {
          this.historyData.pop()
        }
        this.historyData = this.historyData.filter(item => item !== keyword)
        this.historyData = [keyword, ...this.historyData]
        localStorage.setItem('search_histroy', JSON.stringify(this.historyData))
        if (this.postData.type === 1) {
          this.$router.replace({
            path: '/goodsList',
            query: {
              a: 'search',
              keyword: keyword
            }
          })
        } else if (this.postData.type === 2) {
          this.$router.replace({
            path: '/sellerList',
            query: {
              a: 'search',
              keyword: keyword
            }
          })
        } else if (this.postData.type === 3) {
          this.$router.replace({
            path: '/packageList',
            query: {
              a: 'search',
              keyword: keyword
            }
          })
        } else if (this.postData.type === 4) {
          this.$router.replace({
            path: '/goodsPointsList',
            query: {
              a: 'search',
              keyword: keyword
            }
          })
        }
      } else {
        this.$toasted.show('请选择您要搜索的內容！')
      }
    },
    // 搜索框内容改变
    handleChange (ev) {
      let keyword = this.$refs.search.getVal()
      this.postData.keyword = keyword
      if (keyword && keyword.length > 0) {
        this.loadMatchHotSearch()
      } else {
        this.matchSearchData = []
      }
    },
    // 加载我的历史搜索记录
    async loadMyHistory () {
      if (localStorage.getItem('search_histroy')) {
        this.historyData = JSON.parse(localStorage.getItem('search_histroy'))
      } else {
        this.historyData = []
      }
      this.historyData = localStorage.getItem('search_histroy') ? JSON.parse(localStorage.getItem('search_histroy')) : []
    },
    // 加载热搜记录
    async loadHotSearch () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.hotSearchData.keyword = ''   // 热搜记录不需要关键词
      let res = await getKeywordsList(qs.stringify(this.hotPostData))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.hotSearchData = res.data
      }
    },
    // 加载匹配的热搜记录
    async loadMatchHotSearch () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getKeywordsList(qs.stringify(this.postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.matchSearchData = res.data
      }
    },
    // 导航选项卡切换
    tabChanged (index) {
      this.tabIndex = index
      let type = index + 1
      this.postData.type = type
      this.hotPostData.type = type
      let keyword = this.$refs.search.getVal()
      if (keyword && keyword.length > 0) {
        this.loadMatchHotSearch()
      }
      this.loadHotSearch()
    },
    // 初始化选项卡
    initTab (index) {
      this.tabChanged(index)
    }
  },
  created () {
    this.loadMyHistory()
  },
  mounted () {
    this.initTab(this.$route.query.tab || 0)
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

.card {
  margin-bottom: 0px;
}

.hothistroy {
  margin-bottom: 20px;
}

.myhistory-header {
  font-weight: bold;
}
.myhistroy-content {
  background-color: #fff;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: left;
  padding-top: 30px;
  .tag {
    margin-right: 30px;
    margin-bottom: 30px;
  }
}
</style>
