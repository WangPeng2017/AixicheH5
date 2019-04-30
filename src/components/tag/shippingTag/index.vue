<template>
  <span class="tag">
    <i v-if="this.data.shipping_method === 1" class="ship">{{ tagName }}</i>
    <i v-if="this.data.shipping_method === 2" class="ship">{{ tagName }}</i>
    <i v-if="this.data.shipping_method === 3" class="ship">{{ tagName }}</i>
    <i v-if="this.data.shipping_method === 4" class="ship">{{ tagName }}</i>
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
        if (this.data.shipping_method === 1) {
          text = '快递发货'
        } else if (this.data.shipping_method === 2) {
          text = '上门自提'
        } else if (this.data.shipping_method === 3) {
          text = '到店服务'
        } else if (this.data.shipping_method === 4) {
          text = '上门服务'
        }
        if (this.data.is_appointment === 1) {
          text = '预约' + text
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
      font-size: $default_smallfont_size;
      color: #fff;
      padding: 0px 10px;
      border-radius: 10px;
      display: inline-block;
      font-style: normal;
    }
    .ship {
      background-color: $default_blue_color;
    }
  }
</style>
