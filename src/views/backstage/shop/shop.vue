<template>
  <div>
    <Header title="店铺信息"></Header>
    <section class="section">
      <div class="bg"
           :style="{backgroundImage:'url('+bg+')'}">
        <img :src="`https://img.axccn.cn/${sellerInfo.seller_head_img}`"
             class="logo"
             alt="">
        <p class="name">{{sellerInfo.seller_name}}</p>
        <p class="name">{{sellerInfo.shop_name}}</p>
        <span class="updMSG"
              @click="updMSG">修改信息</span>
      </div>

      <div class="content">
        <p>
          <span class="title">商户等级：{{sellerInfo.seller_level_name}}</span>
          <span style="margin-left: 40px;">联系人：{{sellerInfo.contacts_name}}</span>
        </p>
        <p>
          <span class="title">收款账户：</span>
          <span>{{sellerInfo.settlement_bank_account_number}}（微信）</span>
        </p>
        <p>
          <span class="title">联系方式：</span>
          <span>{{sellerInfo.contacts_mobile}}</span>
        </p>
        <p>
          <span class="title">地址：</span>
          <span class="content">{{sellerInfo.seller_address}}</span>
        </p>
        <p>
          <span class="title">店铺详情：</span>
          <span class="content">{{sellerInfo.seller_introduction}}</span>
        </p>
        <p>
          <span class="title">营业资质：</span>
          <span class="content">
            <img :src="`https://img.axccn.cn/${sellerInfo.business_license_img}`"
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
import { getSellerInfo } from '@api'
const USER_ID = '83b0e4f9-3dcc-4a60-8a42-df514ed239f5'

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
      logo: require('Assets/img/logo.png'),
      sellerInfo: {}
    }
  },
  created () {
    this.fetchSellerInfo()
  },
  methods: {
    async fetchSellerInfo () {
      let sellerInfo = await getSellerInfo(USER_ID)
      if (sellerInfo && sellerInfo.status === 200) {
        this.sellerInfo = sellerInfo.data
        console.log(sellerInfo)
      }
    },
    updMSG () {
      this.$router.push({ name: 'updMSG', query: { 'sellerInfo': this.sellerInfo } })
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

