<template>
  <div class="subview"
       v-if="data.goods_id">
    <div id="goodsrecommend_mescroll"
         class="subcontent mescroll">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in imageData"
                      :key="`swiper_${index}`">
          <img :src="item.image_url"
               alt=""
               v-imgField>
        </swiper-slide>
        <div class="swiper-pagination"
             slot="pagination"></div>
      </swiper>
      <div class="goods-info"
           v-if="data">
        <p class="goods-name"
           :class="{self : data.is_self}"><i class="self"
             v-if="data.is_self">自营</i>{{ data.goods_name }}</p>
        <p class="goods-summary"
           v-if="data.goods_summary != null">{{ data.goods_summary }}</p>
        <p class="goods-price">
          <span class="price">
            <em>￥</em>{{data.goods_saleprice }}
          </span>
          <span class="expire"
                v-if="data.goods_saletype === 2 && data.goods_validtype === 1">有效期：截止至{{getDateFullName(data.goods_validdate)}}前有效</span>
          <span class="expire"
                v-if="data.goods_saletype === 2 && data.goods_validtype === 2">有效期：购买后{{data.goods_validdays}}天内有效</span>
        </p>
        <div class="goods-ship"
             v-if="data.is_enableselfget === 1 || data.is_enableappoint === 1 || data.is_enablevisit === 1">
          <span class="tag"
                v-if="data.is_enableselfget === 1"><i class="info-icon"></i>支持上门自提</span>
          <span class="tag"
                v-if="data.is_enableappoint === 1"><i class="info-icon"></i>支持预约</span>
          <span class="tag"
                v-if="data.is_enablevisit === 1"><i class="info-icon"></i>支持上门服务</span>
        </div>
      </div>

      <div class="goods-promotion">
        <goods-promotion-item :goods="data"
                              :couponData="simpleCouponData"
                              @couponShow="$refs.couponPanel.show()"
                              :packageData="simplePackageData"
                              @packageShow="$refs.packagePanel.show()"
                              :activityData="simpleActivityData"></goods-promotion-item>
      </div>
      <!-- 商品或多规格服务显示规格项 -->
      <div class="goods-spec"
           v-if="(data.goods_saletype===2 && data.is_enablespec===1) || data.goods_saletype===1">
        <goods-spec-item :goods="data"
                         @specShow="$refs.specPanel.show()"></goods-spec-item>
      </div>

      <seller-card class="seller-card"
                   :data="data"></seller-card>

      <!--热门推荐-->
      <div class="recommend"
           v-show="recommendGoods.length > 0">
        <divider class="divider">为您推荐</divider>
        <div class="recommend-wrapper">
          <div class="scroll">
            <goods-card v-for="item in recommendGoods"
                        :key="item.goods_id"
                        :data="item"
                        :type="false"></goods-card>
          </div>
          <div id="goodsrecommend_noData"></div>
        </div>
      </div>
    </div>
    <goods-spec-panel :specData="specData"
                      :goods="data"
                      ref="specPanel"
                      @updatePriceAndStock="updatePriceAndStock"
                      @appointShow="$refs.appointPanel.show()"
                      @addShoppingCart="addShoppingCart"
                      @buy="buy"></goods-spec-panel>
    <goods-package-panel :packageData="packageData"
                         ref="packagePanel">
    </goods-package-panel>
    <goods-appoint-panel :goods="data"
                         ref="appointPanel"></goods-appoint-panel>
  </div>
</template>

<script>
import { Divider } from 'vux'
import goodsCard from '@comps/card/goodsCard'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import { getGoodsDetail, getGoodsImageList, getGoodsSkuSpecList, getCouponList, getGoodsPackageList, getActivityListForGoods, addShoppingCart, getGoodsListForTag } from '@api'
import sellerCard from '@comps/card/sellerCard/navigation'
import goodsPromotionItem from './components/goodsPromotionItem.vue'
import goodsSpecItem from './components/goodsSpecItem.vue'
import goodsPackagePanel from './components/goodsPackagePanel.vue'
import goodsActivityPanel from './components/goodsPromotionPanel.vue'
import goodsSpecPanel from './components/goodsSpecPanel.vue'
import goodsAppointPanel from './components/goodsAppointPanel.vue'
import qs from 'qs'
import MeScroll from 'mescroll.js'

export default {
  components: {
    Divider,
    goodsPromotionItem,
    goodsSpecItem,
    goodsPackagePanel,
    goodsActivityPanel,
    goodsSpecPanel,
    goodsAppointPanel,
    sellerCard,
    goodsCard
  },
  data () {
    return {
      data: {},                     // 商品基础数据
      imageData: [],               // 商品相册
      skuData: [],                 // 商品sku
      specData: [],               // 商品规格
      packageData: [],            // 商品参与套餐
      activityData: [],           // 商品参与活动
      simpleCouponData: [],         // 详情对外展示优惠券使用最多3个
      simplePackageData: [],        // 详情对外展示套餐使用最多5个
      simpleActivityData: [],       // 详情对外展示活动使用最多5个
      appointData: [],
      recommendGoods: [],
      meScroll: null,
      swiperOption: {
        autoplay: 5000,
        pagination: '.swiper-pagination'
      }
    }
  },
  computed: {
    ...mapState(['token', 'longitude', 'latitude'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 获取日期全名称
    getDateFullName (date) {
      let d = new Date(date)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let val = year + '-' + month + '-' + day
      return val
    },
    // 验证购买条件
    isCanBuy () {
      let goods = this.data

      // 多规格商品验证商品规格选择
      if (goods.is_enablespec === 1) {
        // 多规格商品
        if (!goods.goods_sku) {
          this.$toasted.show('请先选择商品规格！')
          return false
        }
      }

      // 商品验证购买数量，服务不限制
      if (goods.goods_saletype === 1) {
        if (goods.goods_buynum > goods.goods_storage) {
          this.$toasted.show('当前商品库存不足' + goods.goods_buynum + '个！')
          return false
        }
      } else {
        if (goods.goods_buynum > goods.goods_storage) {
          this.$toasted.show('当前服务每次最多仅能购买' + goods.goods_storage + '次！')
          return false
        }
      }

      return true
    },
    // 设置规格选中
    setSku () {
      let skuid = this.$route.params.sid
      let valueidsStr = ''
      let valueidsArr = []
      if (skuid) {
        this.skuData.map(i => {
          if (i.sku_id === skuid) {
            valueidsStr = i.sku_valueids
          }
        })

        valueidsArr = valueidsStr.split(',')
        this.specData.map(attr => {
          attr.values.map(val => {
            valueidsArr.map(x => {
              if (x.toString() === val.value_id.toString()) {
                val.status = true
              }
            })
          })
        })
        this.updatePriceAndStock()
      }
    },
    // 更新商品价格和库存
    async updatePriceAndStock () {
      // 设置选中的sku
      let goods = this.data
      let totalStock = 0
      goods.goods_sku = null

      // 获取选中规格集合
      let valueidList = []
      if (this.specData) {
        this.specData.map(attr => {
          attr.values.map(value => {
            if (value.status) {
              valueidList.push(value.value_id)
            }
          })
        })
      }
      valueidList = valueidList.sort()

      // 查询选中规格匹配的sku
      if (this.skuData) {
        this.skuData.map(i => {
          let vidList = i.sku_valueids.split(',').sort()
          if (valueidList.toString() === vidList.toString()) {
            goods.goods_sku = i
          }
          totalStock += i.sku_storage
        })
      }
      // 设置价格和库存
      if (goods.goods_sku) {
        goods.goods_saleprice = goods.goods_sku.sku_saleprice.toFixed(2)
        goods.goods_storage = goods.goods_sku.sku_storage
      } else {
        goods.goods_saleprice = goods.goods_minprice === goods.goods_maxprice ? goods.goods_minprice.toFixed(2) : goods.goods_minprice.toFixed(2) + '-' + goods.goods_maxprice.toFixed(2)
        goods.goods_storage = totalStock
      }

      if (goods.goods_buynum > goods.goods_storage) {
        goods.goods_buynum = goods.goods_storage
      }
    },
    // 购买商品
    async buy () {
      if (!this.isCanBuy()) {
        this.$refs.specPanel.show()
        return
      }
      let goods = this.data
      let valuenames = null
      let valueids = null
      let skuid = null
      if (goods.is_enablespec === 1) {
        if (goods.goods_sku) {
          skuid = goods.goods_sku.sku_id
          valuenames = goods.goods_sku.sku_valuenames
          valueids = goods.goods_sku.sku_valueids
        }
      }

      let data = [{
        seller_id: goods.seller_id,
        seller_name: goods.seller_name,
        seller_logo: goods.seller_logo,
        seller_address: goods.seller_address,
        seller_distance: goods.seller_distance,
        order_type: goods.goods_saletype,                 // 订单内容类型
        is_appointment: goods.is_enableappoint,             // 服务订单是否支持预约
        appoint_template_id: goods.appoint_template_id, // 服务订单预约模板id
        withoutShopcar: true,
        status: true,
        goods: [
          {
            shopping_id: null,
            goods_id: goods.goods_id,
            sku_id: skuid,
            sku_valuenames: valuenames,
            sku_valueids: valueids,
            goods_num: goods.goods_buynum,
            goods_name: goods.goods_name,
            goods_img: goods.goods_img,
            goods_saletype: goods.goods_saletype,
            goods_saleprice: parseFloat(goods.goods_saleprice),
            goods_storage: goods.goods_storage,
            shipping_method: 0,
            is_appointment: goods.is_enableappoint,
            appoint_template_id: goods.appoint_template_id,
            make_apptime: null,
            start_time: null,
            end_time: null,
            is_enableselfget: goods.is_enableselfget,
            is_enablevisit: goods.is_enablevisit,
            status: true,
            point_settlement_ratio: goods.point_settlement_ratio
          }
        ]
      }]
      sessionStorage.setItem('orderlist', JSON.stringify(data))
      this.$router.push('/firmOrder')
      this.$refs.specPanel.hide()
    },
    // 加入购物车
    async addShoppingCart () {
      if (!this.isCanBuy()) {
        this.$refs.specPanel.show()
        return
      }

      this.setLoading({
        status: true,
        opacity: 0
      })
      let goods = this.data
      let valueids = null
      let valuenames = null
      let skuid = null
      if (goods.is_enablespec === 1 && goods.goods_sku) {
        skuid = goods.goods_sku.sku_id
        valueids = goods.goods_sku.sku_valueids
        valuenames = goods.goods_sku.sku_valuenames
      }
      let shoppingCarGoods = {
        seller_id: goods.seller_id,
        goods_id: goods.goods_id,
        goods_name: goods.goods_name,
        sku_id: skuid,
        sku_valueids: valueids,
        sku_valuenames: valuenames,
        goods_num: goods.goods_buynum,
        goods_saleprice: goods.goods_saleprice,
        goods_saletype: goods.goods_saletype,
        shipping_method: 0,
        is_appointment: goods.is_enableappoint
      }
      let res = await addShoppingCart(qs.stringify(shoppingCarGoods))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$toasted.show(res.msg)
        this.$refs.specPanel.hide()
      }
    },
    // 进入商家
    async gotoSeller () {
      this.$router.push(`/sellerIndex/${this.data.seller_id}`)
    },
    // 进入购物车
    async gotoShoppingcart () {
      this.$navigation.cleanRoutes()
      this.$router.replace(`/shopcar`)
    },
    // 加载商品基本信息
    async loadGoods () {
      this.setLoading({
        status: true,
        opacity: 0
      })

      let lng = this.longitude || 0
      let lat = this.latitude || 0
      let res = await getGoodsDetail(this.$route.params.id, lng, lat)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data = res.data
        let goodssaleprice = res.data.goods_minprice === res.data.goods_maxprice ? res.data.goods_minprice.toFixed(2) : res.data.goods_minprice.toFixed(2) + '-' + res.data.goods_maxprice.toFixed(2)
        let buystatus = 0
        if (res.data.goods_status === 3 && res.data.audit_status === 1 && res.data.goods_storage > 0) {
          // 可买
          buystatus = 1
        } else if (res.data.audit_status === 1 && res.data.goods_status === 3) {
          if (res.data.goods_storage <= 0) {
            // 缺货
            buystatus = 2
          }
          if (res.data.goods_validtype === 1 && res.data.goods_validdate < new Date()) {
            // 已过期
            buystatus = 3
          }
        } else if (res.data.audit_status === 1 && res.data.goods_status !== 3) {
          // 下架
          buystatus = 4
        } else if (res.data.audit_status !== 1 || res.data.seller_status !== 1 || res.data.seller_state !== 0) {
          // 停售
          buystatus = 5
        }

        this.data = {
          ...this.data,
          buy_status: buystatus,       // 购买状态
          goods_saleprice: goodssaleprice,
          goods_sku: null, // 商品选中sku
          goods_buynum: 1  // 购买数量
        }

        if (this.data.is_enablespec === 1) {
          this.loadSkus()
        }
        this.$emit('loadInfo', this.data)
        this.loadCoupons()
        this.initMeScroll()
      }
    },
    // 加载商品相册图片
    async loadImages () {
      let res = await getGoodsImageList(this.$route.params.id)
      if (res && res.code === 200) {
        this.imageData = res.data
      }
    },
    // 加载商品Sku
    async loadSkus () {
      let res = await getGoodsSkuSpecList(this.$route.params.id)
      if (res && res.code === 200) {
        res.data.specData.map(attr => {
          attr.values.map(value => {
            value.status = false
          })
        })
        this.specData = res.data.specData
        this.skuData = res.data.skuData

        this.setSku()
      }
    },
    // 加载商品参与优惠券
    async loadCoupons () {
      let couponPostData = {
        a: 'goods',
        seller_id: this.data.seller_id,
        goods_id: this.$route.params.id,
        sord: 'desc',
        sidx: 'create_time',
        page: 1,
        rows: 3
      }
      let res = await getCouponList(qs.stringify(couponPostData))
      if (res && res.code === 200) {
        this.simpleCouponData = res.data.list
      }
    },
    // 加载商品参与套餐
    async loadPackages () {
      let packagePostData = {
        goods_id: this.$route.params.id,
        page: 1,
        rows: 30,
        sord: 'desc',
        sidx: 'create_time'
      }
      let res = await getGoodsPackageList(qs.stringify(packagePostData))
      if (res && res.code === 200) {
        this.packageData = res.data.list
        let sublen = 5
        if (res.data.list.length > sublen) {
          this.simplePackageData = res.data.list.slice(0, sublen - 1)
        } else {
          this.simplePackageData = res.data.list
        }
      }
    },
    // 加载商品参与促销活动
    async loadActivitys () {
      let res = await getActivityListForGoods(this.$route.params.id)
      if (res && res.code === 200) {
        this.activityData = res.data
        let sublen = 5
        if (res.data.length > sublen) {
          this.simpleActivityData = res.data.slice(0, sublen - 1)
        } else {
          this.simpleActivityData = res.data
        }
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
        longitude: this.longitude || 0,
        latitude: this.latitude || 0,
        page: page.num,
        rows: page.size,
        sord: 'desc',
        sidx: 'other'
      }
      let res = await getGoodsListForTag(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.recommendGoods = []
        }
        this.recommendGoods = [...this.recommendGoods, ...res.data.list]

        let hasNext = (this.recommendGoods.length < res.data.length)
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
          this.meScroll = new MeScroll('goodsrecommend_mescroll', {
            up: {
              callback (page) {
                self.loadRecommendGoods(page)
              },
              noMoreSize: 10,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: 'goodsrecommend_noData',
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
    }
  },
  created () {
    this.loadGoods()
    this.loadImages()
    this.loadPackages()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.position-vertical-demo {
  background-color: #ffe26d;
  color: #333;
  text-align: center;
  padding: 15px;
}

.swiper-container {
  height: 100vw;
}

.goods-info {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.13);

  .goods-name {
    font-size: $default_font_size;
    color: $default_title_color;
    line-height: 40px;
    i.self {
      font-style: normal;
      margin-right: 10px;
      padding: 4px 10px;
      background-color: $default_theme_color;
      color: #fff;
      font-size: $default_smallfont_size;
    }
  }
  .goods-summary {
    margin-top: 20px;
    font-size: $default_font_size;
    color: $default_subtitle_color;
    line-height: 40px;
  }
  .goods-price {
    margin-top: 20px;
    font-size: 48px;
    line-height: 60px;
    height: 60px;
    em {
      font-size: $default_smallfont_size;
      font-style: normal;
    }
    .price {
      float: left;
      color: $default_price_color;
    }
    .expire {
      float: right;
      color: $default_subtitle_color;
      font-size: $default_middlefont_size;
    }
  }
  .goods-ship {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid $default_border_color;
    text-align: left;
    padding-top: 20px;
    display: flex;
    align-items: center;
    .tag {
      font-size: $default_middlefont_size;
      color: $default_subtitle_color;
      margin-right: 20px;
      i {
        margin-right: 10px;
      }
    }
  }
}

.seller-card {
  margin-top: 20px;
}

.recommend {
  margin-top: 20px;
  .divider {
    margin: 20px 200px;
  }
  .mescroll {
    height: auto;
    overflow-y: initial;
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: transform 0.5s;
}

.translate-enter,
.translate-leave-to {
  transform: translate(0, 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
