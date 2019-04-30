<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">招聘详情</x-header>
    <div class="content">
      <div class="article-section">
        <p class="article-title">{{data.article.ext.recruit_zwmc}}<em v-if="data.article.seller_name"> （{{data.article.seller_name || ''}}）</em></p>
        <p class="article-price">
          <span v-if="data.article.ext.recruit_dy">薪资：{{data.article.ext.recruit_dy || '面议'}}</span>
        </p>
      </div>

      <div class="article-section">
        <h4>基本信息</h4>
        <div class="article-flex">
          <p class="left">工作经验：{{data.article.ext.recruit_gzjy || '无'}}</p>
          <p class="right">学历要求：{{data.article.ext.recruit_xlyq || '无'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">性别要求：{{data.article.ext.recruit_xbyq || '无'}}</p>
          <p class="right">年龄要求：{{data.article.ext.recruit_nlyq || '无'}}</p>
        </div>
        <p class="article-address"><i class="address-icon"></i>工作地点：{{data.article.ext.recruit_gzdz || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>联系方式</h4>
        <p>联系人：{{data.article.ext.recruit_lxr || '无'}}</p>
        <p>联系电话：{{data.article.ext.recruit_lxdh || '无'}}</p>
        <p>邮箱/微信：{{data.article.ext.recruit_yx || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>职位要求</h4>
        <p class="article-desc">{{data.article.ext.recruit_zwyq || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>福利待遇</h4>
        <p class="article-desc">{{data.article.ext.recruit_fldy || '无'}}</p>
      </div>

      <div class="article-section">
        <h4>企业简介</h4>
        <p class="article-desc">{{data.article.ext.recruit_qyjj || '无'}}</p>
      </div>
    </div>

    <footer class="footer">
      <div class="btnGroup" >
        <a class="button" :href="`tel:${data.article.ext.recruit_lxdh || ''}`"><i class="callphone-icon"></i>电话联系</a>
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
    .article-price {
      color: $default_theme_color;
      font-size: $default_font_size;
      font-weight: bold;
      margin-top: 20px !important;
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
