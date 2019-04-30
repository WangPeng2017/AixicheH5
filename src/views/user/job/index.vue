<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">我的求职</x-header>
    <tab :scroll-threshold="5">
      <tab-item v-for="(item, index) in tabData"
                :key="index"
                :selected="item.status===postData.audit_status"
                @on-item-click="tabChanged">{{item.text}}</tab-item>
    </tab>
    <div class="content">
      <div class="mescroll"
           id="myjob_mescroll">
        <div class="scroll">
          <job-card v-for="item in data"
                    :data="item"
                    :key="item.article_id">
            <div slot="footer"
                 class="bottom"
                 v-if="postData.audit_status!==0">
              <div class="left">
              </div>
              <div class="right">
                <a href="javascript:void(0)"
                   @click="editArticle(item)">
                  <i class="edit-icon"></i>
                  编辑</a>
                <a href="javascript:void(0)"
                   @click="deleteArticle(item)">
                  <i class="del-icon"></i>
                  删除</a>
              </div>
            </div>
          </job-card>
        </div>
        <div id="myjob_noData"></div>
      </div>
    </div>
    <fixed-bot-btn @click="gotoDetail()">发布求职</fixed-bot-btn>
  </div>
</template>

<script>
import { Tab, TabItem, XHeader } from 'vux'
import jobCard from '@comps/card/articleCard/job'
import fixedBotBtn from '@comps/fixedBotBtn'
import MeScroll from 'mescroll.js'
import { mapMutations } from 'vuex'
import { getMyArticleList, deleteArticle } from '@api'
import qs from 'qs'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    Tab,
    TabItem,
    XHeader,
    jobCard,
    fixedBotBtn
  },
  data () {
    return {
      tabData: [
        { text: '待审核', status: 0 },
        { text: '已通过', status: 1 },
        { text: '已拒绝', status: 2 }
      ],
      data: [],
      postData: {
        channel_code: 'jobhunting',
        category_id: null,
        audit_status: 0,
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
    gotoDetail () {
      this.$router.push({
        path: '/myJobForm',
        query: {
          channel_code: this.postData.channel_code
        }
      })
    },
    // 状态切换
    tabChanged (index) {
      if (this.tabData && this.tabData.length > 0) {
        let tab = this.tabData[index]
        this.postData.audit_status = tab.status
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
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('myjob_mescroll', {
            up: {
              callback (page) {
                self.loadArticles(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `myjob_noData`,
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
      let res = await getMyArticleList(qs.stringify(this.postData))
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
    // 编辑内容
    async editArticle (item) {
      this.$router.push({
        path: '/myJobForm/' + item.article_id,
        query: {
          channel_code: this.postData.channel_code
        }
      })
    },
    // 删除内容
    async deleteArticle (item) {
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
        deleteArticle(item.article_id).then(res => {
          self.setLoading(false)
          if (res && res.code === 200) {
            this.initMeScroll()
          }
        })
      }).catch(() => {

      })
    }
  },
  created () {
    // 默认为待付款状态
    this.initTab(this.$route.query.tab || 0)
  },
  activated () {
    this.initMeScroll()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.content {
  height: calc(
    100% - #{$default_navbar_height} - #{$default_toolbar_height} - #{$default_toolbar_height}
  );
}

.bottom {
  padding: 0 20px;
  border-top: 1px solid $default_border_color;
  height: $default_cell_height;
  font-size: $default_font_size;
  color: $default_subtitle_color;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
  }
  .right {
    a {
      display: inline-flex;
      align-items: center;
      margin-left: 20px;
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
