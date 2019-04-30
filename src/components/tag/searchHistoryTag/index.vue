<template>
  <span class="tag" @click="handleClick">
    <i>{{ label }}</i>
  </span>
</template>

<script>
  export default {
    props: {
      label: {}
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

  .tag {
    i {
      font-size: $default_font_size;
      color: $default_subtitle_color;
      background-color: #eee;
      padding: 10px;
      display: inline-block;
      font-style: normal;
      border-radius: 10px;
    }
  }
</style>
