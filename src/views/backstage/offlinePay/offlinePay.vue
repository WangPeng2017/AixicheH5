<template>
  <div>
    <Header title="支付金额"></Header>
    <section class="section">
      <div class="part1">
        <img :src="logo"
             alt="">
        <p class="name">红幸 精品店</p>
        <p class="place">二七区南三环连云路都市广场</p>
        <p class="money">
          <input type="number"
                 placeholder="请输入支付金额" />
        </p>
      </div>
    </section>
    <XButton class="button"
             @click.native="sure"
             style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确认</XButton>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton } from 'vux'

export default {
  name: 'offlinePay',
  components: {
    Header,
    XButton
  },
  data () {
    return {
      logo: require('Assets/img/logo.png')
    }
  },
  methods: {
    sure () {
      console.log('确定')
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

  .part1 {
    text-align: center;
    background: #fff;
    padding-bottom: 30px;
    img {
      width: 56px;
      border-radius: 56px;
      margin: 20px 0 10px 0;
    }
    .name {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }

    .place {
      font-size: 8px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin: 10px 0 20px 0;
    }

    .money {
      width: 80%;
      margin: 0 10%;
      height: 47px;
      line-height: 47px;
      border: 1px solid rgba(255, 0, 54, 1);

      input {
        width: 50%;
        height: 30px;
        border: 0;
        outline: 0;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(195, 195, 195, 1);
      }
    }
  }
}
</style>

