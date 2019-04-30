<template>
  <div>
    <Header title="提现成功"></Header>
    <section class="section">
      <div class="part1">
        <img :src="successLogo"
             alt="">
        <div class="right">
          <p class="isSuccess">提现申请成功！</p>
          <p>提现金额：￥3600.00</p>
          <p>手续费：￥100.00</p>
          <p>实到金额：￥3500.00</p>
        </div>
      </div>
      <x-button @click.native="sure"
                type="warn"
                class="sure">确定</x-button>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton } from 'vux'
export default {
  name: 'getMoneySuccess',
  components: {
    Header,
    XButton
  },
  data () {
    return {
      successLogo: require('Assets/img/weixin.png')
    }
  },
  methods: {
    sure () {
      this.$router.push({ name: 'rebate' })
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
    background: #fff;
    padding: 40px 50px;
    display: flex;
    img {
      width: 73px;
      height: 73px;
      margin-right: 20px;
    }
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 18px;
    }
    .isSuccess {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: 700;
      color: rgba(255, 0, 54, 1);
      margin-bottom: 5px;
    }
  }

  .sure {
    background: #ff0036;
    width: 70%;
    border-radius: 20px;
    color: #fff;
    height: 36px;
    font-size: 14px;
    margin-top: 36px;
  }
}
</style>

