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
        let now = new Date()
        let expirydate = new Date(this.data.expirydate)
        if (expirydate < now) {
          text = '已过期'
          if (this.data.pay_status === 0) {
            text = '过期未付款'
          }
        } else {
          if (this.data.consumption_types === 0 && this.data.remain_price <= 0) {
            text = '已用完'
          } else if (this.data.consumption_types === 1 && this.data.surplus_second <= 0) {
            text = '已用完'
          } else {
            if (this.data.pay_status === 0) {
              text = '待付款'
            } else {
              text = '待使用'
            }
          }
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
      padding: 0px 10px;
      display: inline-block;
      font-style: normal;
    }
  }
</style>
