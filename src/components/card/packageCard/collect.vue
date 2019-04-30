<template>
  <div class="card">
    <div class="left" v-if="edit">
      <check-icon class="checkbox" :value.sync="data.status" @click.native="selectChange(data)"></check-icon>
    </div>
    <div class="middle" @click="$router.push('/packageDetail/' + data.package_id)">
      <img class="packageImage" :src="data.package_img" alt="" v-imgField/>
    </div>
    <div class="right" @click="$router.push('/packageDetail/' + data.package_id)">
      <p class="packageName">
        <package-tag :data="data"></package-tag>
        {{ data.package_title }}</p>
      <p class="packagePriceSale">

        <span class="packagePrice">
          <em>￥</em>{{ data.package_price.toFixed(2) }}
          <!--<span class="reduce" v-if="data.reduce_price>0">比收藏时降{{data.reduce_price.toFixed(2)}}元</span>-->
        </span>
        <span class="packageSalenum"></span>
      </p>
    </div>
  </div>
</template>

<script>
  import packageTag from '@comps/tag/packageTag'

  import { CheckIcon } from 'vux'
  export default {
    props: {
      data: {},
      type: true,
      edit: false
    },
    components: {
      CheckIcon,
      packageTag
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
          .reduce {
            border: 2px solid $default_red_color;
            color: $default_red_color;
            padding: 0 10px;
            border-radius: 16px;
            margin-left: 20px;
            font-size: $default_middlefont_size;
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

</style>
