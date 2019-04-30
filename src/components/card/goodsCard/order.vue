<template>
  <div class="card">
    <div class="main">
      <div class="left">
        <img class="goods-image" :src="data.goods_img" alt="" v-imgField />
      </div>
      <div class="center">
        <p class="goods-name">{{data.goods_name}}</p>
        <p class="goods-skuname" v-if="data.sku_name && data.sku_name.length > 0">{{data.sku_name}}</p>
        <p class="goods-tag">
              <span class="deductible" v-if="data.package_order_id && data.package_deductibleprice > 0">
                {{'套餐抵扣' +  data.package_deductibleprice.toFixed(2) + '元'}}
               </span>
          <span class="deductible" v-if="data.receive_coupon_id && data.coupon_deductibleprice > 0">
                {{'优惠券抵扣' +  data.coupon_deductibleprice.toFixed(2) + '元'}}
              </span>
          <span class="ship" v-if="data.delivery_mode === 1">三方配送</span>
          <span class="ship" v-if="data.delivery_mode === 2">上门自提</span>
          <span class="ship" v-if="data.delivery_mode === 3">到店服务</span>
          <span class="ship" v-if="data.delivery_mode === 4">上门服务</span>
        </p>
      </div>
      <div class="right">
        <p class="goods-promotionprice"><em>￥</em>{{parseFloat(data.promotion_price).toFixed(2)}}</p>
        <p class="goods-saleprice" v-if="data.package_order_id && data.package_deductibleprice > 0"><em>￥</em>{{data.goods_price.toFixed(2)}}</p>
        <p class="goods-buynum">x{{data.goods_num}}</p>
        <p class="goods-details">
          <span class="process-status">{{ data | processName }}</span>
        </p>
      </div>
    </div>
    <div class="other" v-if="data.delivery_mode === 2 || data.delivery_mode === 3 || data.is_appointment === 1">
      <p v-if="data.delivery_mode === 2 || data.delivery_mode === 3">门店：{{data.shop_name}}</p>
      <p v-if="data.delivery_mode === 2 || data.delivery_mode === 3">地址：{{data.shop_address}}</p>
      <p v-if="data.is_appointment === 1">预约时间：{{data.appointment_time + ' ' + data.start_time + '~' + data.end_time}}</p>
    </div>
    <div class="other tools"  v-if="isPay && data.process_status === 0">
      <button class="button" @click="$router.replace(`/myRefundAdd/` + data.details_id)">申请售后</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {},
      isPay: false
    },
    filters: {
      // 商家商品件数小计
      processName (item) {
        let text = ''
        switch (item.process_status) {
          case 1:
            text = '申请退款'
            break
          case 2:
            text = '卖家受理'
            break
          case 3:
            text = '退款完成'
            break
          case 4:
            text = '已失效'
            break
          default:
            break
        }
        return text
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    background-color: #fafafb;
    margin-bottom: 0;
    .main {
      padding: 20px;
      display: flex;
      justify-content: space-around;
      .left {
        width: 200px;
        height: 200px;
        flex: none;

        .goods-image {
          width: 100%;
          height: 100%;
          padding: 0;
        }
      }

      .center {
        padding-left: 20px;
        width: 100%;
        flex: 1;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        // 商品名称
        .goods-name {
          color: $default_title_color;
          @include textHideByLine(2);
        }
        // 商品sku名称
        .goods-skuname {
          margin-top: 10px;
          @include textHideByLine(2);
        }
        // 商品标签
        .goods-tag {
          margin-top: 10px;
          span {
            padding: 0 6px;
            margin-right: 6px;
            display: inline-block;
            color: $default_orange_color;
            background-color: #ffe2d6;
            border-radius: 8px;
          }
        }
      }

      .right {
        padding-left: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 0 1 140px;
        font-size: $default_middlefont_size;
        p {
          color: $default_subtitle_color;
          text-align: right;
          em {
            font-style: normal;
          }
        }
        .goods-promotionprice {
          color: $default_title_color;
        }

        .goods-buynum {
          margin-top: 10px;
        }

        .goods-saleprice {
          margin-top: 10px;
          text-decoration: line-through;
        }

        .goods-details {
          margin-top: 10px;
          .process-status {
            color: $default_title_color;
            font-weight: bold;
          }
        }
      }
    }
    .other {
      padding: 0 20px 20px;
      &.tools {
        text-align: right;
        .button {
          background-color: #fff;
          line-height: 56px;
          padding: 0px 20px;
          font-size: $default_middlefont_size;
          border: 1px solid $default_border_color; /*no*/
          border-radius: 40px;
        }
      }
      p {
        line-height: 44px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
      }
    }
  }
</style>
