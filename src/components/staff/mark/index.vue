<template>
  <div class="mark">
    <em>级别</em>
    <span>{{ data }}</span>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style lang="scss" scoped>
  .mark {
    width: 206px;
    font-size: 24px;
    height: 44px;
    line-height: 44px;
    display: inline-flex;
    em {
      display: inline-block;
      width: 80px;
      background: #ff6d00;
      color: #fff;
      font-style: normal;
      text-align: center;
      border-radius: 10px 0 0 10px;
    }
    span {
      flex: 1;
      display: inline-block;
      border: 1px solid #e7e7e7;/*no*/
      text-align: center;
      border-radius: 0 10px 10px 0;
      line-height: 42px;
    }
  }
</style>
