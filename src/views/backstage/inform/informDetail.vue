<template>
  <div>
    <Header title="通知"></Header>
    <section class="section">
      <div class="box">
        <h1 class="title">
          联营套餐新优惠
          <span class="time">2019-1-8 15:56</span>
        </h1>
        <p class="content">
          套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优 惠联营联营套餐新优惠联营套餐新优惠联营套餐新优惠联营
        </p>
        <p class="content">
          套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优 惠联营联营套餐新优惠联营套餐新优惠联营套餐新优惠联营
        </p>
        <p class="content">
          套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐新优惠联营套餐优 惠联营联营套餐新优惠联营套餐新优惠联营套餐新优惠联营
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
export default {
  name: 'informDetail',
  components: {
    Header
  },
  data () {
    return {
      bg: require('Assets/img/informBg.png'),
      type1: require('Assets/img/inform-logo1.png'),
      type2: require('Assets/img/inform-logo2.png'),
      noData: false
    }
  },
  methods: {
    toInformDetail (id) {
      this.$router.push({ name: 'informDetail' })
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .box {
    background: #fff;
    padding: 20px;

    .title {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-top: 5px;
      .time {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-left: 10px;
      }
    }

    .content {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 10px;
      line-height: 1.5;
    }
  }
}
</style>

