<template>
  <div class="panel">
    <div class="panel-header">
      <p>
        <slot name="icon"></slot>
        <span>{{ title }}</span>
      </p>
    </div>
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";
  .panel {
    margin-bottom: 20px;
    .panel-header {
      height: 108px;
      line-height: 108px;
      p {
        font-size: $default_font_size;
        color: $default_title_color;
        display: flex;
        align-items: center;
        padding-left: 25px;
        span {
          margin-left: 11px;
        }
        .icon {
          width: $default_nav_icon_size;
          height: $default_nav_icon_size;
        }
      }
    }
    .panel-body {
      background-color: #fff;
      width: 100%;
    }
  }
</style>
