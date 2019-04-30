<template>
  <header class="header"
          v-bind:style="{backgroundImage:'url(' + data.seller_head_img + ')'}">
    <div class="header-nav">
      <i class="left-white-icon"
         @click="back()"></i>
    </div>
    <div class="header-content">
      <div class="left">
        <img class="sellerLogo"
             :src="data.seller_logo"
             alt=""
             v-imgField>
      </div>
      <div class="right">
        <p class="sellerName">{{data.shop_name}}</p>
        <p class="sellerDesc">
          <span class="seller-fans">{{data.seller_fans}}人关注</span>
          <span class="seller-year">{{data.seller_years <= 1
               ? '1年内'
               :
               data.seller_years
               + '年老店'
               }}</span>
               <span
               class="seller-level"
               v-if="data.seller_level && data.seller_level.length > 0">{{data.seller_level}}</span>
          <span class="seller-authentication"
                v-if="data.seller_authentication === 1">已认证</span>
          <span class="seller-evaluate">好评率 {{data.seller_evaluate}}%</span>
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import mySearch from '@comps/search'
export default {
  components: {
    mySearch
  },
  props: {
    data: {}
  },
  methods: {
    // 返回
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.header {
  color: #fff;
  height: $seller_navbar_height;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.7);
  img {
    width: 100vw;
    height: 100%;
  }

  .header-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $default_navbar_height;
    line-height: $default_navbar_height;
    padding: 0 20px;

    .left-white-icon {
      background-color: rgba(0, 0, 0, 0.8);
      padding: 10px;
      border-radius: 26px;
    }
  }
  .header-content {
    padding: 20px;
    width: 100%;
    height: 140px;
    margin-top: $seller_navbar_height - 140px - $default_navbar_height;
    display: flex;
    .left {
      width: 100px;
      height: 100px;
      .sellerLogo {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }
    }
    .right {
      font-size: $default_font_size;
      color: #fff;
      padding-left: 20px;
      p {
        height: 50px;
        line-height: 50px;
      }
      .sellerName {
        @include textHideByLine(1);
      }
      .sellerDesc {
        @include textHideByLine(1);
        span {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
