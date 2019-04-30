<template>
  <div class="panel">
    <header>
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    </header>
    <div class="panel-main">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/pub";
  .panel {
    background-color: #fff;
    header {
      height: $default_cell_height;
      padding: 0 20px;
      border-bottom: 1px solid $default_border_color; /*no*/
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
