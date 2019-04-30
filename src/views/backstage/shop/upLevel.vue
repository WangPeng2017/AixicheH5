<template>
  <div>
    <Header title="店铺信息"></Header>
    <section class="section">
      <div class="bg"
           :style="{backgroundImage:'url('+bg+')'}">
        <img :src="logo"
             class="logo"
             alt="">
        <p class="name">爱惜车一店爱惜车二店</p>
        <p class="name">爱惜车三点</p>
        <p class="level">普通商户</p>
      </div>
      <div class="part2">
        <span class="is">黄金</span>
        <span>钻石</span>
      </div>
      <div class="part3">
        <p>商户等级提升更多好处
          <i>?</i>
        </p>
        <div class="box">
          <div>
            <img :src="logo4"
                 alt="" />
            <p>推荐会员返利更多</p>
          </div>
          <div>
            <img :src="logo4"
                 alt="" />
            <p>会员订单返利更多</p>
          </div>
        </div>
      </div>
    </section>
    <XButton class="button"
             @click.native="sureUpLevel"
             style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确认升级</XButton>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton, XTable } from 'vux'
export default {
  name: 'upLevel',
  components: {
    Header,
    XButton,
    XTable
  },
  data () {
    return {
      bg: require('Assets/img/main-bg.png'),
      logo: require('Assets/img/logo.png'),
      logo4: require('Assets/img/logo4.png')
    }
  },
  methods: {
    sureUpLevel () {
      this.$router.push({ name: 'sure' })
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

  .bg {
    height: 178px;
    // background: #ff0036;
    text-align: center;
    background-size: cover;
    .logo {
      display: inline-block;
      color: #fff;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      width: 70px;
      border-radius: 35px;
      margin: 10px auto 5px auto;
    }
    .name {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 1.5;
    }
    .level {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-top: 10px;
    }
  }

  .part2 {
    padding: 40px 8%;
    display: flex;
    span {
      width: 100%;
      margin: 0 10px;
      text-align: center;
      height: 64px;
      line-height: 64px;
      display: inline-block;
      border: 1px solid rgba(255, 0, 54, 1);
      border-radius: 3px;

      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 0, 54, 1);
    }

    .is {
      background: rgba(255, 0, 54, 1);
      border: 0;
      color: #fff;
    }
  }

  .part3 {
    background: #fff;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
    p {
      padding: 10px 20px;

      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 1px solid #ff0036;
        color: #ff0036;
        line-height: 1;
        text-align: center;
        border-radius: 6px;
        margin-left: 10px;
      }
    }
    .box {
      display: flex;

      text-align: center;
      div {
        width: 100%;
        padding: 20px 0;
      }
      img {
        width: 67px;
      }

      p {
        padding: 0;
      }
    }
  }
}
</style>

