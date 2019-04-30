<template>
  <div class="card">
    <div class="left">
      <img :src="data.head_icon" alt="" v-imgField>
    </div>
    <div class="right">
      <p class="name">{{ data.true_name }}</p>
      <p class="department">部门：{{ data.depart }}</p>
      <p class="workyear">工作：{{ data.worktime }}年</p>
      <p class="level">级别：{{data.employee_level}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    padding: 20px;
    display: flex;
    background-color: #fff;

    .left {
      width: 160px;
      height: 160px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      p {
        height: 40px;
        line-height: 40px;
        font-size: $default_middlefont_size;
        color: $default_title_color;
        text-align: left;
        padding-left: 20px;
      }
      .name {
        font-size: $default_font_size;
      }
    }
  }
</style>
