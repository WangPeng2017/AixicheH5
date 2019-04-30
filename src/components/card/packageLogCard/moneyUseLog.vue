<template>
    <div class="card">
      <div class="consumption-header">
        <p class="date">{{data.group_date}}</p>
      </div>
      <div class="consumption-body">
        <div class="consumption-item" v-for="item in data.records" :key="item.record_id">
          <p class="time-price">
            <span class="orderno">商品单号：{{item.order_sn}}</span>
            <span class="time">{{item.buy_date}}</span>
            <span class="price">{{item.record_status===1 ? '-' : '+'}}<em>￥</em>{{item.consumption_price.toFixed(2)}}</span>
          </p>
          <p class="name-price">
            <span class="name">{{item.goods_name}}{{item.sku_valuenames && item.sku_valuenames.length>0 ? '('+item.sku_valuenames+')' : ''}}</span>
          </p>
          <p class="seller-time">
            <span class="seller"><i class="house2-color-icon"></i><span>{{item.seller_name || '未知店铺'}}</span></span>
          </p>
        </div>
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

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    background-color: #fff;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:last-child {
      margin-bottom: 20px;
    }
    .consumption-header {
      border-bottom: 1px solid #e6e6e6;
      p {
        height: $default_cell_height;
        line-height: $default_cell_height;
        vertical-align: middle;
      }
      .date {
        font-size: $default_font_size;
        color: $default_title_color;
      }
    }
    .consumption-body {
      .consumption-item {
        border-bottom: 1px solid $default_border_color;
        padding: 10px 0;
        &:last-child {
          border-bottom: 1px solid #fff;
        }
        p {
          height: $default_text_height;
          line-height: $default_text_height;
          vertical-align: middle;
        }
        .time-price {
          font-size: $default_middlefont_size;
          color: $default_title_color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .orderno {
            flex: 4;
          }
          .time {
            flex: 0.5;
            text-align: center;
          }
          .price {
            flex: 1.5;
            font-size: $default_middlefont_size;
            color: $default_price_color;
            text-align: right;
            em {
              font-style: normal;
              font-size: $default_smallfont_size;
            }
          }
        }
        .seller-time {
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .seller {
            i {
              flex: none;
            }
            span {
              vertical-align: middle;
              margin-left: 10px;
            }
          }
        }
        .name-price {
          font-size: $default_middlefont_size;
          color: $default_title_color;
          height: auto;
          .name {
            font-size: $default_middlefont_size;
            @include textHideByLine(2);
          }
        }
      }
    }
  }
</style>
