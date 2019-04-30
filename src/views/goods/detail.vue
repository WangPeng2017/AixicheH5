<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b" title="slot:overwrite-title">
      <tab :scroll-threshold="3" :line-width="6" slot="overwrite-title" active-color="#f15353" bar-active-color="#f15353">
        <tab-item v-for="(item, index) in tabData" :key="index" :selected="index===tabIndex" @on-item-click="tabChanged">{{item}}</tab-item>
      </tab>
    </x-header>
    <div class="content">
      <goods-detail-info v-show="tabIndex===0" ref="detailInfo" @loadInfo="loadInfo"></goods-detail-info>
      <goods-detail-article v-show="tabIndex===1" ref="detailArticle"></goods-detail-article>
      <goods-detail-evaluate v-show="tabIndex===2" ref="detailEvaluate"></goods-detail-evaluate>
    </div>
    <div class="footer">
      <a href="javascript:void(0)" @click="$refs.detailInfo.gotoSeller()">
        <i class="seller-icon"></i>
        <p>店铺</p>
      </a>
      <a href="javascript:void(0)" @click="myCollect">
        <i class="collection-icon" :class="[isCollect ? 'collection-color-icon' : 'collection-icon']"></i>
        <p>{{isCollect ? '已收藏' : '收藏'}}</p>
      </a>
      <a href="javascript:void(0)" @click="$refs.detailInfo.gotoShoppingcart()">
        <i class="shopcar-icon"></i>
        <p>购物车</p>
      </a>

      <!-- 非扣分兑换商品显示加入购物车 -->
      <a v-if="data.buy_status===1 && data.goods_saletype === 1" href="javascript:void(0)" class="btn shoppingcartbtn" @click="$refs.detailInfo.addShoppingCart()">加入购物车</a>
      <!-- 非扣分兑换商品或服务显示立即购买 -->
      <a v-if="data.buy_status===1" href="javascript:void(0)" class="btn buybtn" @click="$refs.detailInfo.buy()">立即购买</a>
      <a v-if="data.buy_status===2" href="javascript:void(0)" class="offbtn">暂时缺货</a>
      <a v-if="data.buy_status===3" href="javascript:void(0)" class="offbtn">已过期</a>
      <a v-if="data.buy_status===4" href="javascript:void(0)" class="offbtn">已下架</a>
      <a v-if="data.buy_status===5" href="javascript:void(0)" class="offbtn">已停售</a>
    </div>
  </div>
</template>

<script>
  import { XHeader, Tab, TabItem } from 'vux'
  import goodsDetailInfo from './detailInfo'
  import goodsDetailArticle from './detailArticle'
  import goodsDetailEvaluate from './detailEvaluate'
  import {mapState, mapMutations} from 'vuex'
  import {SET_LOADING} from '@store/type'
  import { submitCollection, isCollection } from '@api'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      goodsDetailInfo,
      goodsDetailArticle,
      goodsDetailEvaluate
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        tabIndex: 0,
        tabData: ['商品', '详情', '评论'],
        data: {},
        isCollect: false
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 读取商品状态
      loadInfo (info) {
        this.data = info
      },
      // 收藏商品
      async myCollect () {
        this.setLoading({
          status: true,
          opacity: 0
        })

        let form = new FormData()
        form.append('content_id', this.$route.params.id)
        form.append('collection_type', 1)
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
          form.append('collection_type', 1)
          let res = await isCollection(form)
          if (res && res.code === 200) {
            this.isCollect = res.data
          }
        }
      },

      // 导航选项卡切换
      tabChanged (index) {
        this.tabIndex = index
      },
      // 初始化选项卡导航
      initTab () {
        this.tabChanged(0)
      }
    },
    created () {
      this.loadMyCollect()
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

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_buytoolbar_height});
  }

  .footer {
    width: 100%;
    height: $default_buytoolbar_height;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
    a {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        margin-bottom: 6px;
        background-size: 45px;
      }
      p {
        font-size: $default_font_size;
      }
      &.btn {
        flex: 2;
        height: $default_buytoolbar_height;
        line-height: $default_buytoolbar_height;
        border-left: 0;
        color: #fff;
        text-align: center;
        font-size: $default_font_size;
      }
      &.buybtn {
        background-color: $default_red_color;
      }
      &.shoppingcartbtn {
        background-color: $default_orange_color;
      }
      &.offbtn {
        flex: 3;
        color: #fff;
        background-color: $default_disabled_background_color;
        border: 0;
      }
    }
  }
</style>
