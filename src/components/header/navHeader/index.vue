<template>
  <header class="header" :class="{'color': color}">
    <div class="header-wrapper">
      <div class="left" @click="back" v-if="icon">
        <i :class="[color ? 'left-black-icon' : 'left-icon']"></i>
      </div>
      <span class="title">{{title}}</span>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      color: {
        type: Boolean,
        default: false
      },
      icon: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .header {
    width: 100%;
    height: $default_navbar_height;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $active_font_color;
    color: #fff;
    z-index: 9;
    border-bottom: 1px solid rgba(0, 0, 0, .1); /*no*/
    &.color {
      background-color: #fff;
      color: $default_navtitle_color;
    }
    .title {
      font-size: $default_largefont_size;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      padding: 0 20px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .right {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
</style>
