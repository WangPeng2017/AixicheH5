<template>
    <div class="promotion">
      <div class="cell" v-if="couponData.length > 0" @click="$router.push({path: '/couponList', query: {a: 'goods', goods_id: goods.goods_id, seller_id: goods.seller_id, title: '商品优惠券'}})">
        <div class="left">
          领券
        </div>
        <div class="center">
          <span class="item coupon" v-for="item in couponData">{{item.coupon_namedesc}}</span>
        </div>
        <div class="right">
          <i class="more-icon"></i>
        </div>
      </div>

      <div class="cell multiCell" v-if="packageData.length > 0" @click="packageShow">
        <div class="left">
          套餐
        </div>
        <div class="center">
          <div class="item package" v-for="item in packageData">
            <packageTag class="tag" :data="item"></packageTag>{{item.package_title}}
          </div>
        </div>
        <div class="right">
          <i class="more-icon"></i>
        </div>
      </div>

      <div class="cell multiCell" v-if="activityData.length > 0">
        <div class="left">
          促销
        </div>
        <div class="center">
          <div class="item" v-for="item in activityData">
            <span><i>{{item.activity_tag}}</i>{{item.activity_title}}</span>
          </div>
        </div>
        <div class="right">
          <i class="more-icon"></i>
        </div>
      </div>
    </div>

</template>

<script>
  import packageTag from '@comps/tag/packageTag'
  export default {
    components: {
      packageTag
    },
    props: {
      goods: {
        type: Object
      },
      couponData: {
        type: Array
      },
      packageData: {
        type: Array
      },
      activityData: {
        type: Array
      }
    },
    methods: {
      couponShow () {
        this.$emit('couponShow')
      },
      packageShow () {
        this.$emit('packageShow')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .promotion {
    margin-top: 20px;
    padding: 0 20px;
    width: 100%;
    background-color: #fff;

    .cell {
      padding: 0;
      display: flex;
      height: $default_cell_height;
      line-height: $default_cell_height;
      font-size: $default_middlefont_size;
      color: $default_subtitle_color;
      &:not(:last-child) {
        border-bottom:  1px solid $default_border_color;
      }
      .left {
        width: 80px;
        text-align: left;
      }
      .center {
        text-align: left;
        flex: 0 1 calc(100% - 120px);
        overflow: hidden;
        .item {
          &.coupon {
            color: #fff;
            margin: 0 20px 0 20px;
            padding: 0 20px 0 10px;
            background-color: #e4393c;
            position: relative;
            display: inline-block;
            height: 36px;
            line-height: 36px;
            &:before {
              content: "";
              position: absolute;
              top: 0px;
              left: -16px;
              width: 24px;
              height: 36px;
              background-image: url(../../../../assets/image/coupon_side@2x.png);
              background-size: 24px 36px;
              background-repeat: no-repeat;
            }
            &:after {
              content: "";
              position: absolute;
              top: 0px;
              left: calc(100% - 20px);
              width: 24px;
              height: 36px;
              background-image: url(../../../../assets/image/coupon_side@2x.png);
              background-size: 24px 36px;
              background-repeat: no-repeat;
            }
          }
          &.package {
            width: 100%;
            color: $default_title_color;
            .tag {
              line-height: $default_bigfont_size;
            }
          }
        }

      }
      .right {
        width: 40px;
        text-align: right;
      }
    }


    .multiCell {
      height: auto;
      .item {
        height: 60px;
        &:last-child {
          margin-bottom: 20px;
        }
        &:nth-last-child(1):first-child {
          margin-bottom: 0px;
        }
      }
    }
  }


</style>
