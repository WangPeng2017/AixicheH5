<template>
  <div class="view">
    <!-- 顶部 -->
    <home-header ref="header"></home-header>

    <!-- 内容区 -->
    <div id="home_mescroll"
         class="content mescroll"
         ref="box">
      <!--顶部广告-->
      <swiper :options="swiperAdTop"
              :not-next-tick="true"
              ref="swiperAdTop"
              class="swiperAdTop"
              v-show="data.topAds.length>0">
        <swiper-slide v-for="ad in data.topAds"
                      :key="ad.adv_id">
          <a :href="ad.adv_link">
            <img v-lazy="ad.adv_address" />
          </a>
        </swiper-slide>
        <div class="swiper-pagination"
             slot="pagination"></div>
      </swiper>

      <!--应用模块-->
      <grid :cols="5"
            :show-lr-borders="false"
            :show-vertical-dividers="false">
        <grid-item v-for="(item, index) in data.appModules"
                   :key="index"
                   @on-item-click="onItemClick(item)">
          <div class="weui-grid__icon">
            <img slot="icon"
                 :src="item.module_img">
          </div>
          <p class="weui-grid__label">
            <span slot="label"
                  class="grid-label">{{ item.module_name }}</span>
          </p>
        </grid-item>
      </grid>
      <!--头条-->
      <div class="toutiao"
           v-show="data.ttArticles.length>0">
        <div class="toutiao-wrapper">
          <span class="tip">头条</span>
          <div class="main">
            <swiper :options="swiperToutiao"
                    :not-next-tick="true"
                    class="swiper-container-toutiao">
              <swiper-slide v-for="swiper in data.ttArticles"
                            :key="swiper.article_id"
                            class="swiper-no-swiping">
                <router-link :to="'articleDetail/' + swiper.article_id">{{ swiper.article_title }}</router-link>
              </swiper-slide>
            </swiper>
          </div>
          <router-link class="more"
                       :to="{path:'/discover', query: { tab: 'ctt'}}">
            <em></em>更多</router-link>
        </div>
      </div>

      <!--中部广告-->
      <div class="admiddle"
           v-show="data.middleAds.length>0">
        <a :href="ad.adv_link"
           v-for="ad in data.middleAds">
          <img v-lazy="ad.adv_address" />
        </a>
      </div>

      <!--今日特卖-->
      <div class="sales"
           v-show="data.discountGoods.length > 0">
        <header class="sales-header">
          <span>今日特卖</span>
          <time>每日10:00更新</time>
          <router-link :to="{path: '/goodsListForTag', query: {id: 2, title: '今日特卖'}}">
            <em></em>更多</router-link>
        </header>
        <scroller lock-y
                  :scrollbar-x=false>
          <div class="sales-main">
            <div class="sales-item"
                 v-for="item in data.discountGoods">
              <router-link :to="`/goodsDetail/${item.goods_id}`">
                <div class="image">
                  <img v-lazy="item.goods_img" />
                </div>
                <figcaption>
                  <p class="sell_money">
                    <em>¥</em>{{ item.goods_saleprice.toFixed(2) }}</p>
                </figcaption>
              </router-link>
            </div>
          </div>
        </scroller>
      </div>

      <!--底部广告-->
      <div class="adbottom"
           v-show="data.bottomAds.length>0">
        <swiper :options="swiperAdBottom"
                :not-next-tick="true"
                class="swiper-container-adbottom">
          <swiper-slide v-for="swiper in data.bottomAds"
                        :key="swiper.adv_id">
            <a :href="swiper.adv_link">
              <img v-lazy="swiper.adv_address" />
            </a>
          </swiper-slide>
        </swiper>
      </div>

      <!--热门推荐-->
      <div class="recommend"
           v-show="data.recommendGoods.length > 0">
        <divider class="divider">为您推荐</divider>
        <div class="recommend-wrapper">
          <div class="scroll">
            <goods-card v-for="item in data.recommendGoods"
                        :key="item.goods_id"
                        :data="item"
                        :type="false"></goods-card>
          </div>
          <div id="home_noData"></div>
        </div>
      </div>

    </div>
    <!-- 底部 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import { Scroller, Divider, Grid, GridItem } from 'vux'
import homeHeader from '@comps/header/homeHeader'
import footerNav from '@comps/footerNav'
import goodsCard from '@comps/card/goodsCard'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import MeScroll from 'mescroll.js'
import { getAppModuleList, getArticleTopList, getAdTopList, getGoodsListForTag } from '@api'

export default {
  components: {
    homeHeader,
    Divider,
    Grid,
    GridItem,
    footerNav,
    goodsCard,
    Scroller
  },
  data () {
    return {
      data: {
        appModules: [],
        topAds: [],
        middleAds: [],
        bottomAds: [],
        ttArticles: [],
        recommendGoods: [],
        discountGoods: []
      },
      meScroll: null,
      swiperAdTop: {
        autoplay: 5000,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false
      },
      swiperAdBottom: {
        autoplay: false,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false
      },
      swiperToutiao: {
        autoplay: 5000,
        direction: 'vertical',
        noSwiping: true
      }
    }
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 滚动导航处理
    scrollConHeader () {
      let box = this.$refs.box
      let scrollY = box.scrollTop
      let bannerHeight = this.$refs.swiperAdTop.$el.offsetHeight
      let cale = scrollY / bannerHeight > 1 ? 1 : scrollY / bannerHeight
      this.$refs.header.$el.querySelector('.back').style.opacity = cale
    },
    // 绑定事件
    bindEvent () {
      this.$refs.header.$el.querySelector('.back').style.opacity = 0
      let box = this.$refs.box
      box.addEventListener('scroll', this.scrollConHeader)
    },
    // 解绑事件
    unBindEvent () {
      this.$refs.header.$el.querySelector('.back').style.opacity = 0
      let box = this.$refs.box
      box.removeEventListener('scroll', this.scrollConHeader)
    },
    // 加载应用模块
    async loadAppModules () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getAppModuleList()
      this.setLoading(false)
      if (res && res.code === 200) {
        if (res.data.length > 9) {
          this.data.appModules = res.data.slice(0, 9)
          this.data.appModules.push({
            module_name: '全部',
            module_img: require('./image/alls.png'),
            module_type: 'all'
          })
        } else {
          this.data.appModules = res.data
        }
      }
    },
    // 加载头条
    async loadTopArticles () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getArticleTopList(10)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data.ttArticles = res.data
      }
    },
    // 加载顶部5张广告
    async loadTopAds () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getAdTopList(1, 5)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data.topAds = res.data
      }
    },
    // 加载中间2张广告
    async loadMiddleAds () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getAdTopList(2, 2)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data.middleAds = res.data
      }
    },
    // 加载底部2张广告
    async loadBottomAds () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getAdTopList(3, 1)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data.bottomAds = res.data
      }
    },
    // 加载今日特卖商品(按综合评价排序)
    async loadDiscountGoods () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let postData = {
        tag_id: 2,
        top: 50,
        page: 1,
        rows: 8,
        sord: 'desc',
        sidx: 'other'
      }
      let res = await getGoodsListForTag(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data.discountGoods = res.data.list
      }
    },
    // 加载热门推荐商品(按综合评价排序)
    async loadRecommendGoods (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let postData = {
        tag_id: 1,
        top: 50,
        page: page.num,
        rows: page.size,
        sord: 'desc',
        sidx: 'other'
      }
      let res = await getGoodsListForTag(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.data.recommendGoods = []
        }
        this.data.recommendGoods = [...this.data.recommendGoods, ...res.data.list]

        let hasNext = (this.data.recommendGoods.length < res.data.length)
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
          this.meScroll = new MeScroll('home_mescroll', {
            up: {
              callback (page) {
                self.loadRecommendGoods(page)
              },
              noMoreSize: 10,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: 'home_noData',
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            },
            down: {
              use: false
            }
          })
        }
      })
    },
    onItemClick (item) {
      if (item.module_type === 'ilink') {
        let url = item.param.url.replace('index.html#', '')
        if (url) {
          this.$router.push(url)
        }
      } else if (item.module_type === 'olink') {
        let url = item.param.url
        let requreFirstHeader = item.param.requireFirstHeader
        let requireToken = item.param.requireToken
        let redirUrl = url
        redirUrl += '?source=axc'
        if (requireToken && this.token) {
          redirUrl += '&token=' + this.token
        }
        if (requreFirstHeader && this.user && this.user.user_id) {
          redirUrl += '&uid=' + this.user.user_id
        }
        if (requreFirstHeader && this.user && this.user.first_header) {
          redirUrl += '&first_header=' + this.user.first_header
        }
        location.href = redirUrl
      } else {
        this.$router.push('/moduleList')
      }
    }
  },
  created () {
    this.loadAppModules()
    this.loadTopAds()
    this.loadMiddleAds()
    this.loadBottomAds()
    this.loadTopArticles()
  },
  activated () {
    this.bindEvent()
    this.loadDiscountGoods()
    this.initMeScroll()
  },
  beforeDestroy () {
    this.unBindEvent()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/pub';

.weui-grid__icon {
  width: 1.346667rem !important;
  height: 1.346667rem !important;
  margin: 0 auto !important;
}
.position-vertical-demo {
  background-color: #ffe26d;
  color: #333;
  text-align: center;
  padding: 15px;
}

.content {
  height: calc(100% - #{$default_tabbar_height});
}

.swiperAdTop {
  height: 50vw;
  img {
    height: 100%;
    margin: 0 auto;
    display: block;
  }
}

.toutiao {
  padding: 0 20px;
  margin-top: 20px;

  .toutiao-wrapper {
    height: $default_row_height;
    line-height: $default_row_height;
    background: #ebebeb;
    border-radius: $default_row_height/2;
    box-shadow: 0px 6px 4px #999;
    border: 4px solid #fff;
  }

  .tip {
    color: $default_theme_color;
    margin-right: 20px;
    margin-left: 20px;
    float: left;
    font-size: $default_font_size;
  }

  .main {
    width: 450px;
    float: left;
  }

  .swiper-container-toutiao {
    height: $default_row_height;
    background-color: inherit;
    a {
      width: 100%;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: $default_font_size;
      color: #575656;
    }
    .swiper-slide {
      background-color: initial !important;
    }
  }

  .more {
    padding-right: 20px;
    float: right;
    display: flex;
    align-items: center;
    font-size: $default_font_size;
    color: $default_theme_color;
    em {
      margin-right: 20px;
      width: 1px; /*no*/
      height: 30px;
      background-color: #575656;
    }
  }
}

.admiddle {
  display: flex;
  margin-top: 21px;
  a {
    flex: 1;
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
    img {
      width: 100%;
      height: 189px;
    }
  }
}

.sales {
  background-color: #fff;
  margin-top: 22px;
  box-shadow: 0px 0px 1px 0px rgba(8, 1, 3, 0.19);
  .sales-header {
    padding: 20px;
    border-bottom: 1px solid $default_border_color; /*no*/
    span {
      color: $default_red_color;
      margin-right: 27px;
    }
    a {
      float: right;
      display: flex;
      align-items: center;
      em {
        display: inline-block;
        width: 1px; /*no*/
        height: 30px;
        background-color: #666;
        margin-right: 21px;
      }
    }
  }
  .sales-main {
    width: 200vw;
    .sales-item {
      width: 25vw;
      display: inline-block;
      overflow: hidden;
      .image {
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 160px;
          height: 160px;
        }
      }
      figcaption {
        p {
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .sell_money {
        color: $default_price_color;
        font-size: $default_largefont_size;
        em {
          font-style: normal;
          font-size: $default_smallfont_size;
        }
      }
      .old_money {
        font-size: $default_largefont_size;
        text-decoration: line-through;
        em {
          font-style: normal;
          font-size: $default_smallfont_size;
        }
      }
    }
  }
}

.adbottom {
  margin-top: 20px;
  img {
    width: 100%;
    height: 297px;
    display: block;
  }
}

.recommend {
  margin-top: 20px;
  .divider {
    margin: 20px 200px;
  }
}
</style>

<style scoped>
.weui-grids {
  margin: 20px 0;
}
.weui-grids:before {
  border-top: 0 !important;
}
.weui-grid:after {
  border-bottom: 0 !important;
}
.weui-grid {
  padding: 20px !important;
}

.grid-label {
  font-size: 24px;
}
</style>
