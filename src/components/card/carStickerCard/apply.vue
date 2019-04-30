<template>
  <div class="card">
    <router-link :to="'/myCarStickerDetail/' + data.apply_user_id"  class="main">
      <div class="left">
        <img class="adv-image" :src="data.adv_img" alt="" v-imgField/>
      </div>
      <div class="right">
        <p class="adv-title">
          <span>{{ data.adv_title }}</span>
          <span class="apply-status"></span>
        </p>
        <p class="adv-price-num">
        <span class="adv-price">
          <em>￥</em>{{ data.adv_cycle_price.toFixed(2) }}
          <em>/{{data.adv_cycle_type===1 ? '次' : ''}}{{data.adv_cycle_type===2 ? '天' : ''}}</em>
        </span>
          <span class="adv-num">已参与{{data.adv_user_total}}</span>
        </p>
      </div>
    </router-link>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    background-color: #fff;
    .main {
      padding: 20px;
      display: flex;
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
          .apply-status {
            float: right;
          }
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
  }
</style>
