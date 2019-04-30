<template>
  <div>
    <Header title="订单详情"></Header>
    <section class="section">
      <img :src="defaultGoods"
           class="img"
           alt="">
      <p class="price">￥2018.00</p>
      <p class="title">精致洗车快速洗车镀晶打蜡封釉贴膜四轮定位</p>

      <div class="content">
        <p class="content-msg">
          <span class="content-left">付款人：</span>
          <span class="content-right">xxx</span>
        </p>
        <p class="content-msg">
          <span class="content-left">付款时间：</span>
          <span class="content-right">2019-1-8 15:13</span>
        </p>
        <p class="content-msg">
          <span class="content-left">付款账户：</span>
          <span class="content-right">15678445619</span>
        </p>
        <p class="content-msg">
          <span class="content-left">付款方式：</span>
          <span class="content-right">微信</span>
        </p>
        <p class="content-msg">
          <span class="content-left">订单编号：</span>
          <span class="content-right">123655616548651699854</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
export default {
  name: 'orderDetail2',
  components: {
    Header
  },
  data () {
    return {
      defaultGoods: require('Assets/img/defaultGoods.png'),
      noData: false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 54px;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;
  text-align: center;
  .img {
    margin: auto;
    display: block;
    width: 80px;
    margin-top: 10px;
  }

  .price {
    font-size: 24px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin: 12px 0;
  }

  .title {
    width: 70%;
    font-size: 12px;
    line-height: 1.5;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin: 12px auto;
  }

  .content {
    font-size: 12px;
    padding: 10px 20px 20px 20px;
    line-height: 1.5;
    text-align: left;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    .content-msg {
      margin-top: 7px;
      .content-left,
      .content-right {
        width: 23%;
        display: inline-block;
        vertical-align: top;
      }
      .content-right {
        width: 75%;
      }

      .button1,
      .button2 {
        background: rgba(255, 0, 54, 1);
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        padding: 3px 8px;
      }
      .button2 {
        background: rgba(209, 209, 209, 1);
      }
    }
  }
}
</style>

