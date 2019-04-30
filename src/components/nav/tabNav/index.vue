<template>
  <div class="nav">
    <a href="javascript:void(0)" :class="{'active': item.status, 'hideBottom': hideBottom}" @click="tabChanged(item)" v-for="item in data">{{item.text}}</a>
  </div>
</template>

<script>
    export default {
      name: 'tabNav',
      props: {
        data: {
          type: Array
        },
        hideBottom: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        tabChanged (item) {
          if (item.status) {
            return
          }
          this.data.map(i => {
            i.status = false
          })
          item.status = true
          this.$emit('tabChanged', item)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .nav {
    position: fixed;
    top: $default_navbar_height;
    left: 0;
    width: 100%;
    height: $default_toolbar_height;
    line-height: $default_toolbar_height;
    background-color: #fff;
    border-bottom: 1px solid $default_border_color;
    z-index: 2;
    display: flex;
    align-items: center;
    a {
      flex: 1;
      line-height: $default_toolbar_height;
      height: $default_toolbar_height;
      text-align: center;
      font-size: $default_font_size;
      &.active {
        color: $default_red_color;
        border-bottom: 4px solid $default_red_color;
      }
      &.hideBottom {
        border-bottom: none !important;
      }
    }
  }
</style>
