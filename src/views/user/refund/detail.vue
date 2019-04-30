<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">退款详情</x-header>
    <div class="content">
      <div class="header-group">
        <div class="header-row">
          <p>
            <span class="status">{{data | processName}}</span>
            <br />
            <span class="datetime" v-if="data.process_status===1">{{data.apply_time}}</span>
            <span class="datetime" v-if="data.process_status===2">{{data.processing_time}}</span>
            <span class="datetime" v-if="data.process_status===3">{{data.refunds_time}}</span>
          </p>
        </div>
      </div>
      <div class="timeline">
        <ul class="time-horizontal">
          <li :class="{active: data.process_status===1}">
            <i></i>
            <p class="title">申请退款</p>
            <p class="subtitle">{{data.apply_time}}</p>
          </li>
          <li :class="{active: data.process_status===2}">
            <i></i>
            <p class="title">卖家受理</p>
            <p class="subtitle">{{data.processing_time}}</p>
          </li>
          <li :class="{active: data.process_status===3}">
            <i></i>
            <p class="title">退款成功</p>
            <p class="subtitle">{{data.refunds_time}}</p>
          </li>
        </ul>
      </div>
      <div class="item-group">
        <div class="order-card">
          <div class="order-header">
            <div class="left" @click="$router.push(`/sellerIndex/${data.seller_id}`)">
              <img class="seller-logo" :src="data.seller_logo" alt=""  v-imgField/>
              <span class="seller-name">{{data.seller_name}}</span>
              <i class="right-icon"></i>
            </div>
            <div class="right"></div>
          </div>
          <goods-card class="refund-card" :data="data"></goods-card>
        </div>
        <div class="item-row">申请退款金额<span>{{ data.return_money ? '￥' + data.return_money.toFixed(2) : '' }}</span></div>
        <div class="item-row">申请时间<span>{{ data.apply_time || '' }}</span></div>
        <div class="item-row">申请原因<span>{{ data.return_reason || '' }}</span></div>
        <div class="item-row">买家留言<span>{{ data.refund_desc || '' }}</span></div>
      </div>

      <div class="item-group">
        <p class="item-row">退款单号<span>{{ data.refunds_no || '' }}</span></p>
        <p class="item-row">退款总金额<span class="red-color">{{ data.refunds_money ? '￥' + data.refunds_money.toFixed(2) : '' }}</span></p>
        <p class="item-row">退款时间<span>{{ data.refunds_time || '' }}</span></p>
        <p class="item-row">卖家回复<span>{{ data.reject_reason || '' }}</span></p>
      </div>
    </div>

    <footer class="footer">
      <div class="left">

      </div>
      <div class="right">
        <div class="btn-group" >
          <a class="button" :href="`tel:${data.shop_phone}`">联系卖家</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import goodsCard from '@comps/card/goodsCard/order'
  import { getRefundDetail } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  import Vue from 'vue'
  import { Confirm } from 'wc-messagebox'
  import 'wc-messagebox/style.css'
  Vue.use(Confirm)

  export default {
    components: {
      goodsCard
    },
    data () {
      return {
        data: {}
      }
    },
    filters: {
      // 商品状态
      processName (item) {
        let text = '正常'
        switch (item.process_status) {
          case 1:
            text = '申请退款'
            break
          case 2:
            text = '退款中'
            break
          case 3:
            text = '已退款'
            break
          case 4:
            text = '已失效'
            break
          default:
            break
        }
        return text
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载退款商品详情
      async loadRefunds () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getRefundDetail(this.$route.params.id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
        }
      }
    },
    created () {

    },
    activated () {
      this.loadRefunds()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";
  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_buytoolbar_height});
  }
  .header-group {
    height: 200px;
    width: 100vw;
    background: $default_theme_color url(../../../assets/image/order_header.png)no-repeat 90% center;
    background-size: auto 100%;
    .header-row {
      position: static;
      padding: 0 5rem 0 1.06667rem;
      height: 100%;
      -webkit-box-align: center;
      -ms-box-align: center;
      -o-box-align: center;
      box-align: center;
      display: -webkit-box;
      display: -moz-box;
      height: 2.66667rem;
      color: #fff !important;
      .status {
        font-size: $default_bigfont_size;
      }
      .datetime {
        font-size: $default_middlefont_size;
      }
    }
  }

  .item-group {
    background-color: #fff;
    margin-bottom: 20px;
    .item-row {
      padding: 0 20px;
      display: flow-root;
      font-size: $default_font_size;
      line-height: $default_cell_height;
      text-align: left;
      span {
        float: right;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        width: calc(100% - 200px);
        text-align: right;
        display: inline-block;
        height: auto;
      }
      .red-color {
        color: $default_price_color;
      }
    }
    .title {
      font-size: $default_font_size;
      color: $default_title_color;
      font-weight: bold;
      border-bottom: 1px solid $default_border_color;
    }
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
    .left {
      flex: 1;
      span {
        font-size: $default_font_size;
        color: $default_font_color;
        margin-left: 30px;
        em {
          color: $default_red_color;
          font-style: normal;
          font-size: $default_font_size;
        }
      }
    }
    .right {
      .btn-group {
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
  }

  .timeline {
    margin: 60px 20px 40px;
    height: 120px;
    /*横向时间轴*/
    .time-horizontal {
      list-style-type: none;
      max-width: 800px;
      padding: 0px;
      margin: 0px;
      border-top: 4px solid $default_theme_color;
      li {
        float: left;
        position: relative;
        text-align: center;
        width: 33.3%;
        padding-top: 40px;
        i {
          font: normal normal normal 14px/1 FontAwesome;
          font-size: inherit;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
        }
        i:before {
          content: '';
          position: absolute;
          top: -12px;
          left: 47%;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          background: $default_theme_color;
          color: #fff;
        }

        &.active {
          i:before {
            content: "\F00C";
            top: -22px;
            width: 40px;
            height: 40px;
            line-height: 40px;
          }
        }

        .title {
          font-size: $default_font_size;
          color: $default_title_color;
        }

        .subtitle {
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
        }
      }
    }
  }
</style>
