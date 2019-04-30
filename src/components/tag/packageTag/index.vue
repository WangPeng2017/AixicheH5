<template>
  <span class="tag">
    <i v-if="this.data.package_type === 0" class="seller">{{ tagName }}</i>
    <i v-if="this.data.package_type === 1" class="joint">{{ tagName }}</i>
    <i v-if="this.data.package_type === 2" class="merchant">{{ tagName }}</i>
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
          if (this.data.package_type === 0) {
            text = '店铺'
            let saletypeName = ''
            if (this.data.consumption_types === 0) {
              saletypeName = '购物卡'
            } else if (this.data.consumption_types === 1) {
              saletypeName = '次卡'
            }
            text += saletypeName
          } else if (this.data.package_type === 1) {
            text = '联营'
            let saletypeName = ''
            if (this.data.consumption_types === 0) {
              saletypeName = '购物卡'
            } else if (this.data.consumption_types === 1) {
              saletypeName = '次卡'
            }
            text += saletypeName
          } else if (this.data.package_type === 2) {
            text = '合营'
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
    .joint {
      background-color: $default_blue_color;
    }
    .merchant {
      background-color: $default_green_color;
    }
    .seller {
      background-color: $default_orange_color;
    }
  }
</style>
