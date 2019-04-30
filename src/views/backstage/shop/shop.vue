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
        <span class="updMSG"
              @click="updMSG">修改信息</span>
      </div>

      <div class="content">
        <p>
          <span class="title">商户等级：钻石商户</span>
          <span style="margin-left: 40px;">联系人：吴xx</span>
        </p>
        <p>
          <span class="title">收款账户：</span>
          <span>15678445619（微信）</span>
        </p>
        <p>
          <span class="title">联系方式：</span>
          <span>15678445619</span>
        </p>
        <p>
          <span class="title">店铺详情：</span>
          <span class="content">精致洗车深度洗车镀晶打蜡内饰清洗四轮定位快速洗车</span>
        </p>
        <p>
          <span class="title">营业资质：</span>
          <span class="content">
            <img :src="logo"
                 alt=""
                 style="width: 150px;height:150px;border:1px solid #ccc;">
          </span>
        </p>
      </div>
    </section>
    <XButton class="button"
             @click.native="upLevel"
             style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">商户等级升级</XButton>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton, XTable } from 'vux'
export default {
  name: 'shop',
  components: {
    Header,
    XButton,
    XTable
  },
  data () {
    return {
      bg: require('Assets/img/main-bg.png'),
      logo: require('Assets/img/logo.png')
    }
  },
  methods: {
    updMSG () {
      this.$router.push({ name: 'updMSG' })
    },
    upLevel () {
      this.$router.push({ name: 'upLevel' })
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
    height: 146px;
    // background: #ff0036;
    text-align: center;

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
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 1.5;
    }
    .updMSG {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px;
    }
  }

  .content {
    font-size: 14px;
    line-height: 1.5;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    background: #fff;
    padding: 10px;
    p {
      margin-bottom: 10px;
      overflow: hidden;
      span {
        float: left;
      }
      .content {
        width: 75%;
        padding: 0;
      }
    }
  }
}
</style>

