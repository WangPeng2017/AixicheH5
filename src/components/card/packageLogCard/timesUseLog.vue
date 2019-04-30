<template>
    <div class="card">
      <div class="consumption-header">
        <p class="name-total">
          <span class="name">{{data.goods_name}}{{data.sku_valuenames && data.sku_valuenames.length>0 ? '('+data.sku_valuenames+')' : ''}}</span>
        </p>
        <p class="seller-remain">
          <span class="seller"><i class="house2-color-icon"></i>{{data.seller_name || '未知店铺'}}</span>
          <span class="remain"><em>剩余：</em>{{data.remain_num}}/{{data.join_num}}次</span>
        </p>
      </div>
      <div class="consumption-body">
        <div class="consumption-item" v-for="item in data.records" :key="item.record_id">
          <p class="time-buynum">
            <span class="orderno">商品单号：{{item.order_sn}}</span>
            <span class="time">{{item.buy_date}}</span>
            <span class="buynum">{{item.record_status===1 ? '-' : '+' }}{{item.goods_num}}次</span>
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
      border-bottom: 1px solid $default_border_color;
      padding: 10px 0;
      p {
        height: $default_text_height;
        line-height: $default_text_height;
        vertical-align: middle;
      }
      .name-total {
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: auto;
        .name {
          font-size: $default_middlefont_size;
          @include textHideByLine(2);
        }
      }
      .seller-remain {
        margin-top: 10px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .seller {
          i {
            margin-right: 10px;
          }
          flex: none;
          vertical-align: middle;
          @include textHideByLine(1);
        }
        .remain {
          flex: 1;
          text-align: right;
          color: $default_price_color;
          em {
            font-style: normal;
            color: $default_subtitle_color;
          }
        }
      }
    }
    .consumption-body {
      .consumption-item {
        border-bottom: 1px solid #e6e6e6;
        padding: 10px 0;
        &:last-child {
          border-bottom: 1px solid #fff;
        }
        p {
          height: $default_cellgroup_height;
          line-height: $default_cellgroup_height;
          vertical-align: middle;
        }
        .time-buynum {
          font-size: $default_middlefont_size;
          color: $default_title_color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .orderno {
            width: 0;
            flex: 4;
          }
          .time {
            flex: 1.5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .buynum {
            flex: 0.5;
            font-size: $default_middlefont_size;
            color: $default_price_color;
            text-align: right;
            em {
              font-style: normal;
              font-size: $default_smallfont_size;
              color: $default_subtitle_color;
            }
          }
        }
      }
    }
  }
</style>
