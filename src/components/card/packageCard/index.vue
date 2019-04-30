<template>
  <router-link :to="'/packageDetail/' + data.package_id"  class="card" :class="{'gridCard': !type}">
    <div class="left">
      <img class="packageImage" :src="data.package_img" alt="" v-imgField/>
    </div>
    <div class="right">
      <p class="packageName">
        <package-tag :data="data"></package-tag>
        {{ data.package_title }}</p>
      <p class="packagePriceSale">

        <span class="packagePrice">
          <em>￥</em>{{ data.package_price.toFixed(2) }}
        </span>
        <span class="packageSalenum">已售出{{data.salesnum}}</span>
      </p>
    </div>
  </router-link>
</template>

<script>
  import packageTag from '@comps/tag/packageTag'

  export default {
    props: {
      data: {},
      type: true
    },
    components: {
      packageTag
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

      .packageImage {
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
      .packageName {
        font-size: $default_font_size;
        color: $default_title_color;
        height: 80px;
        line-height: 40px;
        @include textHideByLine(2);

      }
      .packagePriceSale {
        margin-top: 20px;
        height: 40px;
        line-height: 40px;
        .packagePrice {
          font-size: $default_bigfont_size;
          color: $default_price_color;
          overflow: visible;
          em {
            font-size: $default_smallfont_size;
            font-style: normal;
          }
        }
        .packageSalenum {
          color: $default_subtitle_color;
          float: right;
          font-size: $default_middlefont_size;
        }
      }
    }
  }

  .gridCard {
    display: inline-block;
    width: 365px;
    height: 360px;
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
    }
    &:nth-child(2n) {
      margin-left: 20px;
    }
  }

</style>
