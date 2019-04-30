<template>
  <div class="card">
    <div class="left"
         v-if="edit">
      <check-icon class="checkbox"
                  :value.sync="data.status"
                  @click.native="selectChange(data)"></check-icon>
    </div>
    <div class="middle"
         @click="$router.push('/goodsDetail/' + data.goods_id)">
      <img class="goodsImage"
           :src="data.goods_img"
           alt=""
           v-imgField />
    </div>
    <div class="right"
         @click="$router.push('/goodsDetail/' + data.goods_id)">
      <p class="goodsName"><i class="self"
           v-if="data.is_self">自营</i>{{ data.goods_name }}</p>
      <p class="goodsPrice">
        <em>￥</em>{{ data.goods_saleprice.toFixed(2) }}
        <!--<span class="reduce" v-if="data.reduce_price>0">比收藏时降{{data.reduce_price.toFixed(2)}}元</span>-->
      </p>
      <p class="goodsTag">
        <span>好评率 {{data.goods_positive || 0}}% 已售出 {{ data.goods_salenum.toFixed(0) || 0}}</span>
      </p>
      <p class="goodsSeller">
        <img class="sellerLogo"
             v-lazy="data.seller_logo"
             alt="" />
        <span class="sellerName">
          {{ data.seller_name }}
        </span>
        <span class="sellerDistance"
              v-if="data.seller_distance && data.seller_distance <6000 && data.seller_distance>0">
          {{ data.seller_distance.toFixed(1) }}km
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import { CheckIcon } from 'vux'
export default {
  props: {
    data: {},
    type: true,
    edit: false
  },
  components: {
    CheckIcon
  },
  methods: {
    selectChange (item) {
      this.$emit('selectChange', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.card {
  padding: 20px;
  display: flex;
  background-color: #fff;
  .left {
    width: 80px;
    margin: auto;
  }
  .middle {
    width: 240px;
    height: 240px;
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
    height: 240px;

    // 商品名称
    .goodsName {
      height: 80px;
      line-height: 40px;
      font-size: $default_font_size;
      color: $default_title_color;
      vertical-align: top;
      @include textHideByLine(2);
      i.self {
        font-style: normal;
        margin-right: 10px;
        padding: 0px 10px;
        background-color: $default_theme_color;
        color: #fff;
        font-size: $default_smallfont_size;
      }
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
      .reduce {
        border: 2px solid $default_red_color;
        color: $default_red_color;
        padding: 0 10px;
        border-radius: 16px;
        margin-left: 20px;
        font-size: $default_middlefont_size;
      }
    }
    // 商品标签
    .goodsTag {
      margin-top: 16px;
      height: 32px;
      font-size: $default_middlefont_size;
      color: $default_subtitle_color;
      overflow: visible;
    }
    // 商品店铺
    .goodsSeller {
      margin-top: 16px;
      height: 32px;
      font-size: $default_middlefont_size;
      display: flex;
      align-items: center;
      .sellerName {
        flex: 0 1 calc(100% - 132px);
        @include textHideByLine(1);
      }
      .sellerLogo {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .sellerDistance {
        width: 120px;
        text-align: right;
      }
    }
  }
}
</style>
