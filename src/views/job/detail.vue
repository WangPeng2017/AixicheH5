<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">求职详情</x-header>
    <div class="content">
      <div class="article-section article-header">
        <img :src="data.article.article_image" alt="" v-if="data.article.ext.jobhunting_xb && data.article.ext.jobhunting_xb==='男'" v-male-field />
        <img :src="data.article.article_image" alt="" v-if="data.article.ext.jobhunting_xb && data.article.ext.jobhunting_xb==='女'" v-female-field />
        <p class="article-title">
          <i class="male-icon" v-if="data.article.ext.jobhunting_xb && data.article.ext.jobhunting_xb==='男'"></i>
          <i class="female-icon" v-if="data.article.ext.jobhunting_xb && data.article.ext.jobhunting_xb==='女'"></i>
          {{data.article.ext.jobhunting_xm}}
        </p>
        <p class="article-subtitle">{{data.article.ext.jobhunting_mbzw || ''}}</p>
        <p class="article-tag">
          <span>工作经验：{{data.article.ext.jobhunting_gzjy || ''}}</span>
          <span class="middle">学历：{{data.article.ext.jobhunting_zgxl || ''}}</span>
          <span>年龄：{{data.article.ext.jobhunting_nl || ''}}</span>
        </p>
      </div>

      <div class="article-section">
        <h4>基本信息</h4>
        <div class="article-flex">
          <p class="left">现居地：{{data.article.ext.jobhunting_xjd || '无'}}</p>
          <p class="right">邮箱/微信：{{data.article.ext.jobhunting_yx || '无'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">手机：{{data.article.ext.jobhunting_sj || '无'}}</p>
          <p class="right">求职区域：{{data.article.ext.jobhunting_qzqy || '无'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">毕业时间：{{data.article.ext.jobhunting_bysj || '无'}}</p>
          <p class="right">毕业院校：{{data.article.ext.jobhunting_byyx || '无'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">最高学历：{{data.article.ext.jobhunting_zgxl || '无'}}</p>
          <p class="right">期望薪资：{{data.article.ext.jobhunting_qdxj ? data.article.ext.jobhunting_qdxj + '/月' : '面议' }}</p>
        </div>
      </div>

      <div class="article-section">
        <h4>技能特长</h4>
        <p class="article-desc">{{data.article.ext.jobhunting_jntc || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>工作经历</h4>
        <p class="article-desc">{{data.article.ext.jobhunting_gzjl || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>个人简介</h4>
        <p class="article-desc">{{data.article.ext.jobhunting_grjl || '无'}}</p>
      </div>
    </div>

    <footer class="footer">
      <div class="btnGroup" >
        <a class="button" :href="`tel:${data.article.ext.jobhunting_sj || ''}`"><i class="callphone-icon"></i>电话联系</a>
      </div>
    </footer>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import { mapMutations } from 'vuex'
  import { getArticleDetail } from '@api'
  import { SET_LOADING } from '@store/type'
  import { fromDate, convertTimespanToDate } from '@js/util'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        data: {
          article: {
            ext: {}
          }
        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      async loadArticle () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getArticleDetail(this.$route.params.id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
          let timeStamp = convertTimespanToDate(this.data.article.publish_time).getTime()
          this.data.article.publish_time = fromDate(timeStamp)
        }
      }
    },
    async created () {
      this.loadArticle()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/pub";
  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_buytoolbar_height});
  }

  .article-section {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
    &.article-header {
      text-align: center;
      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
      }
    }
    p {
      line-height: 44px;
      color: $default_subtitle_color;
      font-size: $default_middlefont_size;
      i {
        margin-right: 10px;
      }
    }
    p:not(:first-child) {
      margin-top: 10px;
    }
    .article-title {
      color: $default_title_color;
      font-size: $default_bigfont_size;
      font-weight: bold;
      em {
        font-size: $default_smallfont_size;
        font-style: normal;
      }
    }
    .article-subtitle {
      color: $default_title_color;
      font-size: $default_font_size;
      font-weight: bold;
      margin-top: 20px !important;
    }
    .article-tag {
      display: flex;
      span {
        flex: 1;
        text-align: center;
      }
    }
  }

  .article-flex {
    margin-top: 10px;
    display: flex;
    .left {
      width: 50%;
      flex: 0 1 50%;
      text-align: left;
      margin-top: 0 !important;
    }
    .right {
      width: 50%;
      flex: 0 1 50%;
      text-align: left;
      margin-top: 0 !important;
    }
    &:first-child {
      margin-top: 0 !important;
    }
  }

  .footer {
    width: 100%;
    height: $default_buytoolbar_height;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    box-shadow: -1.9px -5.7px 12.9px 0.1px rgba(8, 1, 3, 0.27);
    .btnGroup {
      margin: auto;
      a.button {
        padding: 20px 160px;
        background-color: $default_theme_color;
        color: #fff;
        border-radius: 10px;
        i {
          margin-right: 20px;
        }
      }
    }
  }
</style>
