<template>
  <router-link :to="data.sku_id ? '/goodsDetail/' + data.goods_id + '/' + data.sku_id : '/goodsDetail/' + data.goods_id"
               class="card"
               :class="{'gridCard': !type}">
    <div class="left">
      <img class="goodsImage"
           :src="data.goods_img"
           alt=""
           v-imgField />
    </div>
    <div class="right">
      <div class="goods-name-skuname">
        <p class="goodsName"><i class="self"
             v-if="data.is_self">自营</i>{{ data.goods_name }}</p>
        <p class="goodsSkuName">{{data.goods_valuenames}}</p>
      </div>
      <p class="goodsPrice">
        <template v-if="parseInt(consumption_types) === 0">
          <em>￥</em>{{ data.activity_price.toFixed(2) }}
          <span class="oldPrice"><em>￥</em>{{ data.goods_saleprice.toFixed(2) }}</span>
        </template>
        <template v-if="parseInt(consumption_types) === 1">
          {{ data.join_num }}<em>{{ data.goods_saletype === 1 ? '件' : '次' }}</em>
        </template>
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

  </router-link>
</template>

<script>
export default {
  props: {
    data: {},
    consumption_types: 0,
    type: true
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

    .goods-name-skuname {
      min-height: 120px;
      // 商品名称
      .goodsName {
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
      // 商品sku名称
      .goodsSkuName {
        margin-top: 16px;
        height: 32px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        overflow: visible;
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
      .oldPrice {
        margin-left: 10px;
        color: $default_subtitle_color;
        font-size: $default_middlefont_size;
        text-decoration: line-through;
      }
      .reduce {
        border: 2px solid $default_red_color;
        color: $default_red_color;
        padding: 0 10px;
        border-radius: 16px;
        font-size: $default_middlefont_size;
      }
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

.gridCard {
  display: inline-block;
  width: 365px;
  height: 620px;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  .left {
    width: 325px;
    height: 325px;
  }
  .right {
    width: 325px;
    padding-left: 0px;
    padding-top: 20px;
  }
  &:nth-child(2n) {
    margin-left: 20px;
  }
}
</style>
