<template>
  <div class="card" @click="$router.push('/myAddress')">
    <div class="main">
      <template  v-if="data">
        <p class="name-mobile">
          <span class="name">{{data.receiver_name}}</span>
          <span class="mobile">{{data.receiver_mobile}}</span>
          <span class="tag" v-if="data.receiver_remark && data.receiver_remark.length > 0">{{data.receiver_remark}}</span>
        </p>
        <p class="region-address"><i class="address-icon" v-if="data.region"></i>{{data.region + ' ' + data.address}}</p>
      </template>
      <template v-else>
        <p class="without-address" @click="$router.push('/myAddress')">点击添加收货地址</p>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: null
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";

  .card {
    background-color: #fff;
    margin-bottom: 0px;
    .main {
      padding: 20px;
      .name-mobile {
        line-height: 60px;
        font-size: $default_font_size;
        color: $default_title_color;
        @include textHideByLine(1);
        font-weight: bold;
        .name {
          width: 200px;
        }
        .mobile {
          margin-left: 40px;
        }
        .tag {
          margin-left: 20px;
          padding: 0px 20px;
          color: $default_blue_color;
          border: 1px solid $default_blue_color;
          font-size: $default_smallfont_size;
          font-weight: normal;
        }
      }
      .region-address {
        line-height: 60px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        @include textHideByLine(2);
        .address-icon {
          margin-right: 20px;
          vertical-align: sub;
        }
      }

      .without-address {
        width: 100%;
        height: 100px;
        background-color: #fff;
        line-height: 100px;
        display: block;
        text-align: center;
      }
    }
    .main:after {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      border-top: 1px solid #656565;
      border-right: 1px solid #656565;
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      position: absolute;
      right: 30px;
      bottom: 68px;
    }
  }
</style>
