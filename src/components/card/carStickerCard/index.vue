<template>
  <router-link :to="'/carstickerDetail/' + data.adv_id"  class="card" :class="{'gridCard': !type}">
    <div class="left">
      <img class="adv-image" :src="data.adv_img" alt="" v-imgField/>
    </div>
    <div class="right">
      <p class="adv-title">
        {{ data.adv_title }}</p>
      <p class="adv-price-num">
        <span class="adv-price">
          <em>￥</em>{{ data.adv_cycle_price.toFixed(2) }}
          <em>/{{data.adv_cycle_type===1 ? '次' : ''}}{{data.adv_cycle_type===2 ? '天' : ''}}</em>
        </span>
        <span class="adv-num">已参与{{data.adv_user_total}}</span>
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
      width: 280px;
      height: 140px;
      flex: none;

      .adv-image {
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 10px;
      }
    }

    .right {
      padding-left: 20px;
      width: 100%;
      height: 140px;
      .adv-title {
        font-size: $default_font_size;
        color: $default_title_color;
        height: 80px;
        line-height: 40px;
        @include textHideByLine(2);

      }
      .adv-price-num {
        margin-top: 20px;
        height: 40px;
        line-height: 40px;
        color: $default_subtitle_color;
        font-size: $default_middlefont_size;
        .adv-price {
          font-size: $default_bigfont_size;
          color: $default_price_color;
          overflow: visible;
          em {
            font-size: $default_smallfont_size;
            font-style: normal;
          }
        }
        .adv-num {
          float: right;
        }
      }
    }
  }

  .gridCard {
    display: inline-block;
    width: 365px;
    height: 410px;
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    .left {
      width: 325px;
      height: 162.5px;
    }
    .right {
      width: 325px;
      padding-left: 0px;
      padding-top: 20px;

      .adv-price-num {
        .adv-num {
          margin-top: 10px;
          float: none;
          width: 100%;
          display: inline-block;
        }
      }
    }
    &:nth-child(2n) {
      margin-left: 20px;
    }
  }
</style>
