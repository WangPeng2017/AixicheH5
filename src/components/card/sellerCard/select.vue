<template>
  <div class="card">
    <div class="left">
      <router-link :to="`/sellerIndex/` + data.seller_id">
        <img :src="data.seller_logo"
             alt=""
             v-imgField>
      </router-link>
    </div>
    <div class="center">
      <router-link :to="`/sellerIndex/` + data.seller_id">
        <p class="name">
          {{data.seller_name}}
          <i v-if="data.seller_distance && data.seller_distance <6000 && data.seller_distance>0">
            {{ data.seller_distance.toFixed(1) }}km
          </i>
        </p>
        <p class="address">{{data.seller_address}}</p>
      </router-link>
    </div>

    <div class="right">
      <check-icon class="checkbox"
                  :value.sync="data.status"
                  @click.native="sellerChange(data)"></check-icon>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vux'
export default {
  props: {
    data: {}
  },
  components: {
    CheckIcon
  },
  methods: {
    sellerChange (item) {
      this.$emit('sellerChange', item)
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
    height: 80px;
    float: none;
    img {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 80px;
    }
  }
  .center {
    padding: 0 20px;
    flex: 0 1 calc(100% - 120px);
    p {
      @include textHideByLine(1);
      height: 40px;
      line-height: 40px;
      font-size: $default_smallfont_size;
      &.name {
        font-size: $default_font_size;
        color: $default_title_color;
        i {
          float: right;
          font-size: $default_smallfont_size;
          font-style: normal;
        }
      }
      &.address {
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
      }
    }
  }

  .right {
    width: 80px;
    text-align: right;
  }
}
</style>
