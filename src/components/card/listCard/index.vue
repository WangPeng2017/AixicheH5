<template>
  <div class="card" @click="handleClick">
    <div class="left">
      <slot name="licon"></slot>
      <span>{{ label }}</span>
    </div>
    <div class="right">
      <slot name="ricon"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    methods: {
      handleClick (ev) {
        this.$emit('click', ev)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: $default_font_size;
    color: $default_title_color;
    border-bottom: 1px solid $default_border_color;/*no*/
    padding:0 20px;
    height: $default_cell_height;
    line-height: $default_cell_height;
    &:last-child {
      border-bottom: 0;
    }
    .left {
      display: flex;
      align-items: center;
      i {
        margin-right: 20px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }

</style>
