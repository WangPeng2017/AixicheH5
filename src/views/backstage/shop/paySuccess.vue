<template>
  <div>
    <Header title="支付成功"></Header>
    <section class="section">
      <div class="part1">
        <img :src="paySuccess"
             alt="">
        <p>支付成功！</p>
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
  name: 'paySuccess',
  components: {
    Header,
    XButton
  },
  data () {
    return {
      paySuccess: require('Assets/img/paySuccess.png')
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
    height: 152px;
    text-align: center;
    background: #fff;
    margin: 10px 10px 0 10px;
    img {
      width: 77px;
      margin: 20px 0 10px 0;
    }
  }
}
</style>

