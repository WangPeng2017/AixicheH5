<template>
  <div class="card">
    <div class="cartHeader">
      <div class="left">
        <check-icon class="checkbox" :value.sync="data.status" @click.native="goodsGroupChange(data)"></check-icon>
      </div>
      <div class="right">
        <img class="sellerLogo" :src="data.seller_logo" alt="" v-imgField/>
        <span>{{data.seller_name}}</span>
      </div>
    </div>
    <div class="cartGoods" v-for="(goods, index) in data.goods" :index="index" :key="goods.shopping_id">
      <div class="main">
        <div class="left">
          <check-icon :value.sync="goods.status" @click.native="goodsChange(data)"></check-icon>
        </div>
        <div class="center">
          <img class="goodsImage" :src="goods.goods_img" alt="" v-imgField />
        </div>
        <div class="right">
          <div class="msg">
            <div class="goodsName">{{goods.goods_name}}</div>
            <div class="goodsSkuName">{{goods.sku_valuenames}}</div>
            <div class="goodsTag">
              <span class="reduce" v-if="goods.goods_reduceprice > 0">比加入时降{{goods.goods_reduceprice.toFixed(1)}}元</span>
              <shipping-tag :data="goods"></shipping-tag>
            </div>
            <div class="goodsPrice"><em>￥</em>{{goods.goods_saleprice.toFixed(2)}}
              <count-input
                v-model="goods.goods_num"
                :min="1"
                @change="goodsNumChange(goods)"></count-input>
            </div>

          </div>
        </div>
      </div>
      <div class="other" v-if="goods.shipping_method === 2 || goods.shipping_method === 3 || goods.is_appointment === 1">
        <p class="goodsStoreName" v-if="goods.shipping_method === 2 || goods.shipping_method === 3">门店：{{goods.shop_name}}</p>
        <p class="goodsStoreAddress" v-if="goods.shipping_method === 2 || goods.shipping_method === 3">地址：{{goods.shop_address}}</p>
        <p class="goodsAppoint" v-if="goods.is_appointment === 1">预约时间：{{goods.make_apptime + ' ' + goods.start_time + '~' + goods.end_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import countInput from '@comps/countinput'
  import shippingTag from '@comps/tag/shippingTag'
  import { CheckIcon } from 'vux'

  export default {
    props: {
      data: {}
    },
    components: {
      shippingTag,
      countInput,
      CheckIcon
    },
    methods: {
      goodsGroupChange (goodsGroup) {
        goodsGroup.goods.map(item => {
          item.status = goodsGroup.status
        })
        this.$emit('goodsGroupChange', goodsGroup)
      },
      goodsChange (goodsGroup) {
        let flag = goodsGroup.goods.every(item => {
          return item.status
        })
        if (goodsGroup.status) {
          if (!flag) {
            goodsGroup.status = false
          }
        } else {
          if (flag) {
            goodsGroup.status = true
          }
        }
        this.$emit('goodsChange', goodsGroup)
      },
      goodsNumChange (goods) {
        this.$emit('goodsNumChange', goods)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    background-color: #fff;
    padding: 0 20px;
    .cartHeader {
      font-size: $default_font_size;
      color: $default_title_color;
      height: $default_cell_height;
      line-height: $default_cell_height;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid $default_border_color;
      .left {
        flex: none;
        flex-shrink: 0;
        width: 72px;
      }
      .right {
        display: flex;
        align-items: center;
        i {
          margin-right: 10px;
        }
        .sellerLogo {
          width: $default_cell_icon_size;
          height: $default_cell_icon_size;
          border-radius: 10px;
          margin-right: 10px;
        }
      }
    }

    .cartGoods {
      padding: 20px 0;
      background-color: #fff;
      border-bottom: 1px solid $default_border_color;
      &:last-child {
        border-bottom: 0;
      }
      .main {
        display: flex;
        align-items: center;
        .left {
          flex: none;
          flex-shrink: 0;
          width: 72px;
        }
        .center {
          width: 200px;
          height: 200px;
          flex: none;
          .goodsImage {
            width: 100%;
            height: 100%;
            padding: 0;
          }
        }
        .right {
          padding-left: 20px;
          width: 100%;
          min-height: 200px;

          // 商品名称
          .goodsName {
            height:  40px;
            line-height: 40px;
            font-size: $default_font_size;
            color: $default_title_color;
            vertical-align: top;
            @include textHideByLine(1);
            i.self {
              font-style: normal;
              margin-right: 10px;
              padding: 0px 10px;
              background-color: $default_theme_color;
              color: #fff;
              font-size: $default_smallfont_size;
            }
          }

          .goodsSkuName {
            margin-top: 16px;
            height:  32px;
            font-size: $default_middlefont_size;
            color: $default_subtitle_color;
            overflow: visible;
          }
          // 商品价格
          .goodsPrice {
            margin-top: 20px;
            height: 44px;
            font-size: $default_bigfont_size;
            color: $default_price_color;
            overflow: visible;
            em {
              font-size: $default_smallfont_size;
              font-style: normal;
            }
          }
          // 商品标签
          .goodsTag {
            margin-top: 16px;
            height:  32px;
            font-size: $default_middlefont_size;
            color: $default_subtitle_color;
            overflow: visible;
          }
        }
      }

      .other {
        margin-top: 20px;
        margin-left: 72px;
        p {
          line-height: 40px;
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
        }
      }
    }
  }
</style>
