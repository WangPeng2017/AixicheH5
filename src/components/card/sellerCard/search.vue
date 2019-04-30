<template>
  <router-link :to="`/sellerIndex/` + data.seller_id">
    <div class="card">
      <div class="left">
        <img :src="data.seller_logo" alt="" v-imgField>
      </div>
      <div class="right">
        <p class="name">{{data.seller_name}}<span href="javascript:void(0);" class="enter">进店逛逛</span></p>
        <p class="collectnum">
          <span v-if="data.collect_num>0">{{data.collect_num || 0}}人关注</span>
          <span v-if="data.seller_evaluate>0">好评率{{data.seller_evaluate || 0}}%</span>
          <span>{{data.seller_years <= 1 ? '1年内' : data.seller_years + '年老店'}}</span>
          <span class="distance">{{data.seller_distance && data.seller_distance <6000 && data.seller_distance>0 ? data.seller_distance.toFixed(1) + 'km' : '' }}</span>
        </p>
      </div>
    </div>
  </router-link>
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
    padding: 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
    .left {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 60px;
      }
    }
    .right {
      padding-left: 20px;
      width: calc(100% - 100px);
      p {
        @include textHideByLine(1);
        height: 40px;
        line-height: 40px;
        font-size: $default_smallfont_size;
        &.name {
          height: 60px;
          line-height: 60px;
          font-size: $default_font_size;
          color: $default_title_color;
          .enter {
            padding: 0 10px;
            float: right;
            border: 2px solid $default_red_color;
            color: $default_red_color;
            border-radius: 10px;
            margin-top: 10px;
            height: 36px;
            line-height: 36px;
          }
        }
        &.collectnum {
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
          display: flex;
          span {
            background-color: #eee;
            border-radius: 10px;
            margin-right: 10px;
            padding: 0px 10px;
            flex: none;
          }
          .distance {
            flex: 1;
            text-align: right;
            background-color: initial;
            margin-right: 0;
          }
        }
        &.address {
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
        }
      }
    }
  }
</style>
