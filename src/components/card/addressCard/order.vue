<template>
  <div class="card">
    <div class="main">
      <p class="name-mobile"><span class="name">{{data.receiver_name}}</span><span class="mobile">{{data.receiver_mobile}}</span></p>
      <p class="region-address"><i class="address-icon"></i>{{data.receiver_region + ' ' + data.receiver_address}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";

  .card {
    padding: 20px;
    background-color: #fff;
    .main {
      .name-mobile {
        height: 44px;
        line-height: 44px;
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
        line-height: 44px;
        margin-top: 10px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        @include textHideByLine(2);
        .address-icon {
          margin-right: 20px;
          vertical-align: sub;
        }
      }
    }
  }
</style>
