<template>
  <span class="tag">
    <i>{{ tagName }}</i>
  </span>
</template>

<script>
  export default {
    props: {
      data: {}
    },
    computed: {
      tagName () {
        let text = ''
        if (this.data.order_status === 0 || this.data.order_status === 1) {
          // 未确认,已确认
          if (this.data.pay_status === 0) {
            // 待付款
            text = '待付款'
          } else if (this.data.pay_status === 1) {
            // 付款中
            text = '付款中'
          } else if (this.data.pay_status === 2) {
            // 已付款
            if (this.data.shipping_status === 0 || this.data.shipping_status === 1) {
              // 未发货，配货中
              text = '配货中'
            } else if (this.data.shipping_status === 2) {
              text = '待收货'
            } else {
              text = '未知'
            }
          }
        } else if (this.data.order_status === 2) {
          // 已取消
          text = '交易取消'
        } else if (this.data.order_status === 3) {
          // 无效订单
          text = '已失效'
        } else if (this.data.order_status === 200) {
          // 完成
          text = '交易完成'
        } else {
          // 未知
          text = '未知'
        }
        return text
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .tag {
    i {
      font-size: $default_font_size;
      color: $default_orange_color;
      padding: 0px;
      display: inline-block;
      font-style: normal;
    }
  }
</style>
