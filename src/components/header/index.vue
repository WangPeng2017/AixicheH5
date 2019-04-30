<template>
  <header class="header">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </header>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 20px;
  }
</style>
