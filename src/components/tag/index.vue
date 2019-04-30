<template>
  <span class="tag" @click="handleClick">
    <i>{{ label }}</i>
  </span>
</template>

<script>
  export default {
    props: {
      label: {
        type: String
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
  @import "../../assets/css/pub";

  .tag {
    i {
      font-size: $default_smallfont_size;
      color: $default_subtitle_color;
      background-color: #eee;
      padding: 0 10px;
      display: inline-block;
      font-style: normal;
      border-radius: 10px;
    }
  }
</style>
