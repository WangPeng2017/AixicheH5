<template>
  <div class="card">
    <div class="left" v-if="edit">
      <check-icon class="checkbox" :value.sync="data.status" @click.native="selectChange(data)"></check-icon>
    </div>
    <div class="middle" @click="$router.push('/sellerIndex/' + data.seller_id)">
      <img :src="data.seller_logo" alt="" v-imgField>
    </div>
    <div class="right" @click="$router.push('/sellerIndex/' + data.seller_id)">
      <p class="name">{{data.seller_name}}</p>
      <p class="collectnum">
        {{data.collect_num || 0}}人关注 好评率{{data.seller_evaluate || 0}}%
        <i v-if="data.seller_distance && data.seller_distance <6000 && data.seller_distance>0">
          {{ data.seller_distance.toFixed(1) }}km
        </i>
      </p>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'
  export default {
    props: {
      data: {},
      type: true,
      edit: false
    },
    components: {
      CheckIcon
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
    align-items: center;
    background-color: #fff;
    .left {
      width: 80px;
      margin: auto;
    }
    .middle {
      width: 80px;
      height: 80px;
      flex: none;
      img {
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 80px;
      }
    }
    .right {
      padding-left: 20px;
      width: 100%;
      p {
        @include textHideByLine(1);
        height: 40px;
        line-height: 40px;
        font-size: $default_smallfont_size;
        &.name {
          font-size: $default_font_size;
          color: $default_title_color;

        }
        &.collectnum {
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
          i {
            float: right;
            font-size: $default_middlefont_size;
            font-style: normal;
          }
        }
      }
    }
  }
</style>
