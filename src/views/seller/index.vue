<template>
  <div class="view">

    <div class="content">
      <div class="mescroll" id="sellerindex_mescroll">
        <seller-header :data="sellerData"></seller-header>
        <sticky scroll-box="sellerindex_mescroll">
        <tab :scroll-threshold="3" active-color="#f15353" bar-active-color="#f15353">
          <tab-item v-for="(item, index) in tabData" :key="index" :selected="index===tabIndex" @on-item-click="tabChanged">{{item}}</tab-item>
        </tab>
        <data-sort class="sort" :data="sortData" :enableSwitch="true" :enableFilter="false" :display="display" @sortChange="sortChange" @switchChange="changeDisplay"></data-sort>
        </sticky>
        <div class="scroll">
          <goods-card v-for="item in data" :key="item.goods_id" :data="item" :type="display" v-if="tabIndex!==2"></goods-card>
          <package-card v-for="item in data" :key="item.package_id" :data="item" :type="display" v-if="tabIndex===2"></package-card>
        </div>
        <div id="sellerindex_noData"></div>
      </div>
    </div>

    <footer class="footer">
      <a href="javascript:void(0);" @click="gotoDetail">
        <i class="seller-icon"></i>
        <p>店铺详情</p>
      </a>
      <a href="javascript:void(0)" @click="myCollect">
        <i :class="[isCollect ? 'collection-color-icon' : 'collection-icon']"></i>
        <p>{{isCollect ? '已关注': '关注'}}</p>
      </a>
      <a href="javascript:void(0);" @click="gotoMapNavigation">
        <i class="navigate-icon"></i>
        <p>导航</p>
      </a>
    </footer>
  </div>
</template>

<script>
  import { Sticky, Tab, TabItem } from 'vux'
  import sellerHeader from '@comps/header/sellerHeader'
  import dataSort from '@comps/dataSort'
  import goodsCard from '@comps/card/goodsCard/seller'
  import packageCard from '@comps/card/packageCard'
  import { getSellerDetail, submitCollection, isCollection, getGoodsList, getSellerPackageList } from '@api'
  import { mapState, mapMutations } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import MeScroll from 'mescroll.js'
  import qs from 'qs'

  export default {
    components: {
      sellerHeader,
      Sticky,
      Tab,
      TabItem,
      dataSort,
      goodsCard,
      packageCard
    },
    computed: {
      ...mapState(['token', 'longitude', 'latitude'])
    },
    data () {
      return {
        sortData: [],
        data: [],
        postData: {},
        display: true,
        sellerData: {},
        isCollect: false,
        tabIndex: 0,
        tabData: ['服务', '商品', '套餐'],
        goods: {
          sortData: [
            {
              type: 1,
              name: '综合',
              status: true,
              isUp: true,
              list: [
                {status: true, sidx: 'other', title: '综合', sord: 'desc'},
                {status: false, sidx: 'create_time', title: '新品', sord: 'desc'},
                {status: false, sidx: 'goods_evaluationnum', title: '评价', sord: 'desc'}
              ]
            }, {
              type: 2,
              name: '销量',
              status: false,
              isUp: false,
              list: [
                {status: false, sidx: 'goods_salenum', title: '销量从高到低', sord: 'desc'}
              ]
            }, {
              type: 3,
              name: '价格',
              status: false,
              isUp: true,
              list: [
                {status: false, sidx: 'goods_saleprice', title: '价格从低到高', sord: 'asc'},
                {status: false, sidx: 'goods_saleprice', title: '价格从高到低', sord: 'desc'}
              ]
            }
          ],
          data: [],
          postData: {
            a: 'seller',
            saletype: 1,
            seller_id: this.$route.params.id,
            page: 1,
            rows: 10,
            sord: 'desc',
            sidx: 'other'
          },
          display: true
        },
        services: {
          sortData: [
            {
              type: 1,
              name: '综合',
              status: true,
              isUp: true,
              list: [
                {status: true, sidx: 'other', title: '综合', sord: 'desc'},
                {status: false, sidx: 'create_time', title: '新品', sord: 'desc'},
                {status: false, sidx: 'goods_evaluationnum', title: '评价', sord: 'desc'}
              ]
            }, {
              type: 2,
              name: '销量',
              status: false,
              isUp: false,
              list: [
                {status: false, sidx: 'goods_salenum', title: '销量从高到低', sord: 'desc'}
              ]
            }, {
              type: 3,
              name: '价格',
              status: false,
              isUp: true,
              list: [
                {status: false, sidx: 'goods_saleprice', title: '价格从低到高', sord: 'asc'},
                {status: false, sidx: 'goods_saleprice', title: '价格从高到低', sord: 'desc'}
              ]
            }
          ],
          data: [],
          postData: {
            a: 'seller',
            saletype: 2,
            seller_id: this.$route.params.id,
            page: 1,
            rows: 10,
            sord: 'desc',
            sidx: 'other'
          },
          display: true
        },
        packages: {
          sortData: [
            {
              type: 1,
              name: '综合',
              status: true,
              isUp: true,
              list: [
                {status: true, sidx: 'other', title: '综合', sord: 'desc'},
                {status: false, sidx: 'create_time', title: '新品', sord: 'desc'}
              ]
            }, {
              type: 2,
              name: '销量',
              status: false,
              isUp: false,
              list: [
                {status: false, sidx: 'salesnum', title: '销量从高到低', sord: 'desc'}
              ]
            }, {
              type: 3,
              name: '价格',
              status: false,
              isUp: true,
              list: [
                {status: false, sidx: 'package_price', title: '价格从低到高', sord: 'asc'},
                {status: false, sidx: 'package_price', title: '价格从高到低', sord: 'desc'}
              ]
            }
          ],
          data: [],
          postData: {
            seller_id: this.$route.params.id,
            page: 1,
            rows: 10,
            sord: 'desc',
            sidx: 'other'
          },
          display: true
        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 选项卡切换
      tabChanged (index) {
        if (index === 0) {
          this.data = this.services.data
          this.sortData = this.services.sortData
          this.postData = this.services.postData
          this.display = this.services.display
          this.initMeScroll()
        } else if (index === 1) {
          this.data = this.goods.data
          this.sortData = this.goods.sortData
          this.postData = this.goods.postData
          this.display = this.goods.display
          this.initMeScroll()
        } else if (index === 2) {
          this.data = this.packages.data
          this.sortData = this.packages.sortData
          this.postData = this.packages.postData
          this.display = this.packages.display
          this.initMeScroll()
        }

        this.tabIndex = index
      },
      // 初始化选项卡
      initTab () {
        this.tabChanged(0)
      },
      // 加载店铺商品
      async loadData (page) {
        this.postData.page = page.num
        this.postData.rows = page.size

        let res
        if (this.tabIndex !== 2) {
          res = await getGoodsList(qs.stringify(this.postData))
        } else {
          res = await getSellerPackageList(qs.stringify(this.postData))
        }
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data = []
          }
          this.data = [...this.data, ...res.data.list]
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
            self.loadData({
              num: 1,
              size: 10
            })
            return
          } else {
            this.meScroll = new MeScroll('sellerindex_mescroll', {
              up: {
                callback (page) {
                  self.loadData(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: `sellerindex_noData`,
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
      // 排序商品
      sortChange (data) {
        if (this.tabIndex === 0) {

        } else if (this.tabIndex === 1) {

        } else if (this.tabIndex === 2) {

        }
        this.postData.sord = data.sord
        this.postData.sidx = data.sidx
        this.postData.page = 1
        this.initMeScroll()
      },
      // 显示方式切换
      changeDisplay () {
        this.display = !this.display
      },
      // 跳转店铺详情
      gotoDetail () {
        let jsonStr = JSON.stringify(this.sellerData)
        sessionStorage.setItem('sellerData', jsonStr)
        this.$router.push('/sellerDetail/' + this.$route.params.id)
      },
      // 跳转地图导航
      gotoMapNavigation () {
        this.$router.push({
          path: '/mapNavigation',
          query: {
            lng: this.sellerData.longitude,
            lat: this.sellerData.latitude
          }
        })
      },
      // 加载商家信息
      async loadSeller () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getSellerDetail(this.$route.params.id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.sellerData = res.data
        }
      },
      // 收藏套餐
      async myCollect () {
        this.setLoading({
          status: true,
          opacity: 0
        })

        let form = new FormData()
        form.append('content_id', this.$route.params.id)
        form.append('collection_type', 2)
        let res = await submitCollection(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.isCollect = res.data
        }
      },
      // 是否已经收藏
      async loadMyCollect () {
        if (this.token) {
          let form = new FormData()
          form.append('content_id', this.$route.params.id)
          form.append('collection_type', 2)
          let res = await isCollection(form)
          if (res && res.code === 200) {
            this.isCollect = res.data
          }
        }
      }
    },
    created () {
      this.loadMyCollect()
      this.loadSeller()
    },
    mounted () {
      this.initTab()
    },
    activated () {

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

  .content {
    height: calc(100% - #{$default_buytoolbar_height});
  }

  .footer {
    width: 100%;
    height: $default_buytoolbar_height;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.13);
    i {
      background-size: $default_buytoolbar_image_size;
    }
    a {
      font-size: $default_font_size;
      color: rgba(0, 0, 0, .8);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        margin-top: 5px;
      }
    }
  }
</style>

<style lang="scss">
  #sellerindex_mescroll {
    .mescroll-empty {
      padding-top: 30%;
    }
  }
</style>
