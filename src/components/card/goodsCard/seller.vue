<template>
  <router-link :to="'/goodsDetail/' + data.goods_id"
               class="card"
               :class="{'gridCard': !type}">
    <div class="left">
      <img class="goodsImage"
           :src="data.goods_img"
           alt=""
           v-imgField />
    </div>
    <div class="right">
      <p class="goodsName">{{ data.goods_name }}</p>
      <p class="goodsPrice">
        <em>￥</em>{{ data.goods_saleprice.toFixed(2) }}
      </p>
      <p class="goodsTag">
        <span>好评率{{data.goods_positive || 0}}%</span>
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    data: {},
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
    width: 192px;
    height: 192px;
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
    height: 192px;

    // 商品名称
    .goodsName {
      height: 80px;
      line-height: 40px;
      font-size: $default_font_size;
      color: $default_title_color;
      vertical-align: top;
      @include textHideByLine(2);
    }
    // 商品价格
    .goodsPrice {
      margin-top: 20px;
      height: 44px;
      font-size: 36px;
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
  }
}

.gridCard {
  display: inline-block;
  width: 365px;
  height: 572px;
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
