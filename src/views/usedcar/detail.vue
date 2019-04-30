<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">二手车详情</x-header>
    <div class="content">
      <!-- 产品相册 -->
      <swiper class="swiper"
              :options="swiperOptions"
              :not-next-tick="true"
              ref="swiperAlbum"
              v-if="data.article.content_type===3 && data.fileList.length>0">
        <swiper-slide v-for="file in data.fileList" :key="file.file_id">
          <img v-lazy="file.file_url" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <!-- 视频 -->
      <video-player id="article_video" class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    v-if="data.article.content_type===1 && data.fileList.length>0">
      </video-player>
      <div class="article-section">
        <p class="article-title">{{data.article.article_title}}</p>
        <p class="article-price">
          <span v-if="data.article.ext.usedcar_bj"><em>￥</em>{{parseFloat(data.article.ext.usedcar_bj).toFixed(2) || ''}}</span>
          <span v-if="!data.article.ext.usedcar_bj">面议</span>
        </p>
        <p class="article-address"><i class="address-icon"></i>看车地址：{{data.article.ext.usedcar_kcdz || ''}}</p>
      </div>

      <div class="article-section">
        <div class="article-flex">
          <p class="left">表显里程：{{data.article.ext.usedcar_bxlc || 0}}万公里</p>
          <p class="right">上牌时间：{{data.article.ext.usedcar_spsj | diff}}</p>
        </div>
        <div class="article-flex">
          <p class="left">上牌城市：{{data.article.ext.usedcar_spd || '未填写'}}</p>
          <p class="right">排放标准：{{data.article.ext.usedcar_pfbz || '未填写'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">排量：{{data.article.ext.usedcar_pl || '未填写'}}</p>
          <p class="right">燃料类型：{{data.article.ext.usedcar_rllx || '未填写'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">过户次数：{{data.article.ext.usedcar_ghcs || 0}}次</p>
          <p class="right">变速箱：{{data.article.ext.usedcar_bsx || '未填写'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">交强险到期：{{data.article.ext.usedcar_jqx || '未填写'}}</p>
          <p class="right">商业险到期：{{data.article.ext.usedcar_syx || '未填写'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">年检到期：{{data.article.ext.usedcar_njdq || '未填写'}}</p>
          <p class="right"></p>
        </div>
      </div>

      <div class="article-section">
        <div class="article-flex">
          <p class="left">联系人：{{data.article.ext.usedcar_lxr || '未填写'}}</p>
          <p class="right">微信：{{data.article.ext.usedcar_WeChat || '未填写'}}</p>
        </div>
        <div class="article-flex">
          <p class="left">联系电话：{{data.article.ext.usedcar_lxdh || '无'}}</p>
          <p class="right"></p>
        </div>
      </div>

      <div class="article-section" v-html="data.article.article_content"></div>
    </div>

    <footer class="footer">
      <div class="btnGroup" >
        <a class="button" :href="`tel:${data.article.ext.usedcar_lxdh || ''}`"><i class="callphone-icon"></i>联系卖家</a>
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
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'

  export default {
    components: {
      XHeader,
      videoPlayer
    },
    data () {
      return {
        data: {
          article: {
            ext: {}
          },
          fileList: []
        },
        swiperOptions: {
          autoplay: 5000,
          pagination: '.swiper-pagination',
          autoplayDisableOnInteraction: false
        },
        playerOptions: {
          autoplay: false,
          muted: true,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          sources: [],
          aspectRatio: '4:3',
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          width: '100vw'
        }
      }
    },
    filters: {
      diff (dateStr) {
        if (dateStr && dateStr.length > 0) {
          let year = dateStr.substring(0, 4)
          let month = dateStr.substring(5, 7)
          let day = dateStr.substring(8, 10)
          let newdateStr = year + '-' + month + '-' + day
          let date = new Date(newdateStr.replace(/-/g, '/'))
          let nowdate = new Date()
          let diffYear = nowdate.getFullYear() - date.getFullYear()
          return diffYear + '年'
        } else {
          return '不到1年'
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
          if (this.data.article.content_type === 1) {
            let sources = []
            let poster = this.data.article.article_image
            res.data.fileList.map(file => {
              sources.push({
                type: file.content_type,
                src: file.file_url
              })
            })
            this.$set(this.playerOptions, 'sources', sources)
            this.$set(this.playerOptions, 'poster', poster)
          }
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

  .swiper {
    height: 75vw;
    img {
      height: 100%;
      margin: 0 auto;
      display: block;
    }
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
      font-size: $default_font_size;
      font-weight: bold;
    }

    .article-price {
      color: $default_price_color;
      font-size: $default_bigfont_size;
      em {
        font-size: $default_smallfont_size;
        font-style: normal;
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
        background-color: $default_red_color;
        color: #fff;
        border-radius: 10px;
        i {
          margin-right: 20px;
        }
      }
    }
  }
</style>

<style>
  .vjs-big-play-button {
    left: 50% !important;
    top: 50% !important;
    margin-left: -86px;
    margin-top: -41px;
  }
</style>
