<template>
  <div class="card">
    <router-link :to="'/packageDetail/' + data.package_id" >
      <div class="package">
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
            <span class="packageBalance" v-if="showBalance">
          <i class="title">剩余：</i><em>￥</em>{{data.remain_price.toFixed(2)}}
        </span>
          </p>
        </div>
      </div>
    </router-link>
    <slot name="footer"></slot>
  </div>

</template>

<script>
  import packageTag from '@comps/tag/packageTag'

  export default {
    props: {
      data: {},
      showBalance: true
    },
    components: {
      packageTag
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";
  .card {
    background-color: #fff;

    .package {
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
            font-size: $default_largefont_size;
            color: $default_price_color;
            overflow: visible;
            em {
              font-size: $default_smallfont_size;
              font-style: normal;
            }
          }
          .packageBalance {
            float: right;
            font-size: $default_largefont_size;
            color: $default_price_color;
            overflow: visible;
            em {
              font-size: $default_smallfont_size;
              font-style: normal;
            }
            .title {
              font-size: $default_smallfont_size;
              font-style: normal;
              color: $default_title_color;
            }
          }
        }
      }
    }
  }


</style>
