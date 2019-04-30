<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">售后服务</x-header>
    <div class="content">
      <div class="mescroll" id="refund_mescroll">
        <div class="scroll">
          <div class="order-card" v-for="item in data" :key="item.details_id">
            <div class="order-header">
              <div class="left" @click="$router.push(`/sellerIndex/${item.seller_id}`)">
                <img class="seller-logo" :src="item.seller_logo" alt=""  v-imgField/>
                <span class="seller-name">{{item.seller_name}}</span>
                <i class="right-icon"></i>
              </div>
              <div class="right"></div>
            </div>
            <goods-card :data="item"></goods-card>
            <!-- 退款描述 -->
            <div class="order-total">
              <div class="left">
                <p>
                  <i class="refundgoods-icon" v-if="item.return_type===1"></i>
                  <i class="refundmoney-icon" v-if="item.return_type===2"></i>
                  {{item | returntypeName}} {{ item | processName }}
                </p>
              </div>
              <div class="right">
              </div>
            </div>
            <div class="btn-group">
              <a class="button" @click="$router.push(`/myRefundDetail/${item.details_id}`)">查看详情</a>
            </div>
          </div>
        </div>
        <div id="refund_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, XHeader } from 'vux'
  import goodsCard from '@comps/card/goodsCard/order'
  import MeScroll from 'mescroll.js'
  import { getRefundList } from '@api'
  import { mapMutations, mapState } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import qs from 'qs'
  import Vue from 'vue'
  import { Confirm } from 'wc-messagebox'
  import 'wc-messagebox/style.css'
  Vue.use(Confirm)

  export default {
    components: {
      Tab,
      TabItem,
      XHeader,
      goodsCard
    },
    computed: {
      ...mapState(['token'])
    },
    filters: {
      // 商家商品件数小计
      processName (item) {
        let text = ''
        switch (item.process_status) {
          case 1:
            text = '申请退款'
            break
          case 2:
            text = '卖家受理'
            break
          case 3:
            text = '退款完成'
            break
          case 4:
            text = '已失效'
            break
          default:
            break
        }
        return text
      },
      returntypeName (item) {
        let text = ''
        switch (item.return_type) {
          case 0:
            text = '未知'
            break
          case 1:
            text = '退货退款'
            break
          case 2:
            text = '仅退款'
            break
          default:
            break
        }
        return text
      }
    },
    data () {
      return {
        meScroll: null,
        data: [],
        postData: {
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'create_time'
        },
        isCreate: true
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 初始化滚动区
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          if (this.meScroll) {
            this.meScroll.resetUpScroll()
            return
          }
          this.meScroll = new MeScroll('refund_mescroll', {
            up: {
              callback (page) {
                self.loadRefunds(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `refund_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        })
      },
      // 加载我的订单
      async loadRefunds (page) {
        this.postData.page = page.num
        this.postData.rows = page.size

        let res = await getRefundList(qs.stringify(this.postData))
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
        }
      }
    },
    created () {
      this.initMeScroll()
    },
    activated () {

    }
  }
</script>

<style lang="scss" scoped >
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height});
  }

  .card {
    margin-bottom: 0;
  }

  .order-card {
    &:first-child {
      margin-top: 20px;
    }
    margin-bottom: 20px;
    background-color: #fff;
    .order-header {
      padding: 0 20px;
      height: $default_cell_height;
      line-height: $default_cell_height;
      font-size: $default_font_size;
      color: $default_title_color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        height: 100%;
        display: flex;
        align-items: center;
        .seller-logo {
          width: $default_cell_icon_size;
          height: $default_cell_icon_size;
          border-radius: $default_cell_icon_size;
          margin-right: 20px;
        }
        .seller-name {
          margin-right: 20px;
        }
      }
      .right {
        height: $default_row_height;
        line-height: $default_row_height;
        text-align: right;
      }
    }

    .order-total {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: $default_font_size;

      .left {
        text-align: left;
        flex: none;
      }
      .right {
        text-align: right;
        flex: 1;

      }
      p {
        height: $default_cell_height;
        line-height: $default_cell_height;
        color: $default_title_color;
        text-align: right;
      }
      em {
        font-style: normal;
        font-size: $default_font_size;
        color: $default_title_color;
      }
    }

    .btn-group {
      border-top: 1px solid $default_border_color;/*no*/
      height: $default_cell_height;
      line-height: $default_cell_height;
      padding: 0 20px;
      background-color: #fff;
      display: block;
      flex-direction: row-reverse;
      a.button {
        margin: 14px 0px;
        margin-left: 20px;
        float: right;
        line-height: 56px;
        padding: 0 20px;
        border: 1px solid $default_border_color;/*no*/
        border-radius: 40px;
        background-color: transparent;
        font-size: $default_middlefont_size;
        box-sizing: border-box;
      }
    }
  }
</style>
