<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{data.article.article_title}}</x-header>
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
      <div class="article-header">
        <h2><strong>{{ data.article.article_title }}</strong></h2>
        <div class="info">
          <span>来源：{{data.article.article_origin || '红幸云商'}}</span>
          <span class="right">{{ data.article.publish_time }}</span>
        </div>
      </div>
      <div class="article-content" v-html="data.article.article_content"></div>
    </div>
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
          article: {},
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

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .swiper {
    height: 75vw;
    img {
      height: 100%;
      margin: 0 auto;
      display: block;
    }
  }

  .article-header {
    padding: 20px;
    background-color: #fff;
    .info {
      margin-top: 20px;
      font-size: $default_font_size;
      .right {
        float: right;
      }
    }
  }

  .article-content {
    padding: 20px;
    background-color: #fff;
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
