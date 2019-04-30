<template>
  <div class="withoutData">
    <div class="image"></div>
    <p>{{ label }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '没有数据'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .withoutData {
    padding-top: 50%;
    .image {
      width: 68px;
      height: 44px;
      margin: 0 auto;
      @include backimg('./image/withoutData')
    }
    p {
      font-size: 25px;
      margin-top: 5px;
      text-align: center;
    }
  }
</style>
