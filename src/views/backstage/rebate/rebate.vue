<template>
  <div>
    <Header title="返利"></Header>
    <section class="section">
      <section class="bg"
               :style="{backgroundImage:'url('+bg+')'}">
        <p class="logo"><img :src="logo"
               alt="">当前返利总额</p>
        <p class="text">
          ￥9876 2548.00
        </p>
        <XButton class="button"
                 @click.native="toTX">立即提现</XButton>
      </section>
      <section class="detail">
        <div class="detail-title">明细总览</div>
        <div class="detail-content">
          <div class="content-left"
               @click="toFLList">
            <img :src="flDetail"
                 alt="" />
            <p style="font-size: 14px;">返利明细</p>
          </div>
          <div class="content-right"
               @click="toTXList">
            <img :src="txDetail"
                 alt="" />
            <p style="font-size: 14px;">提现详情</p>
          </div>
        </div>
      </section>
      <section class="list">
        <div class="list-title">返利列表</div>
        <x-table full-bordered
                 style="background-color:#fff;">
          <thead>
            <tr>
              <th>账号</th>
              <th>返利类型</th>
              <th>返利金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(n,i) in fanlis"
                :key="i">
              <td>{{n.user_mobile|phone}}</td>
              <td>{{n.record_goods_name }}</td>
              <td>￥{{n.user_money}}</td>
            </tr>
          </tbody>
        </x-table>

      </section>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton, XTable } from 'vux'
import { getRebateInfo } from '@api'
const USER_ID = '83b0e4f9-3dcc-4a60-8a42-df514ed239f5'

export default {
  name: 'rebate',
  components: {
    Header,
    XButton,
    XTable
  },
  data () {
    return {
      bg: require('Assets/img/rebateBg.png'),
      logo: require('Assets/img/rebateLogo.png'),
      txDetail: require('Assets/img/txDetail.png'),
      flDetail: require('Assets/img/flDetail.png'),
      user_id: sessionStorage.getItem('seller_id'),
      fanlis: []
    }
  },
  filters: {
    phone: function (val) {
      console.log(typeof val)
      return val.substring(0, 3) + '****' + val.substring(7, 11)
    }
  },
  mounted () {
    this.getRebateInfo()
  },
  methods: {
    toTX (id) {
      this.$router.push({ name: 'getMoney' })
    },
    toFLList () {
      this.$router.push({ name: 'flList' })
    },
    toTXList () {
      this.$router.push({ name: 'txList' })
    },
    async getRebateInfo () {
      let data = await getRebateInfo(USER_ID)
      this.fanlis = data.data
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
    height: 264px;
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

    .logo {
      display: inline-block;
      color: #fff;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: bold;

      position: absolute;
      top: 50px;
      width: 100%;
      text-align: center;

      img {
        width: 18px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .text {
      font-size: 35px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      top: 85px;
      width: 100%;
      text-align: center;
    }
    .button {
      width: 200px;
      background: linear-gradient(
        0deg,
        rgba(246, 70, 70, 1),
        rgba(247, 88, 88, 1)
      );
      border-radius: 5px;
      color: #fff;
      position: absolute;
      left: 50%;
      margin-left: -100px;
      bottom: 0;
    }
  }

  .detail {
    width: 93%;
    height: 136px;
    margin: 13px auto;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(242, 242, 242, 1);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);

    .detail-title {
      text-align: center;
      font-size: 17px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 1;
      padding: 12px 0;
      border-bottom: 1px solid rgba(237, 237, 237, 1);
    }

    .detail-content {
      display: flex;
      text-align: center;
      height: 94px;
      .content-left,
      .content-right {
        width: 50%;

        img {
          width: 26px;
          height: 30px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .list {
    width: 93%;
    margin: 13px auto;
    background-color: #fff;
    .list-title {
      text-align: center;
      font-size: 17px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #333333;
      line-height: 1;
      padding: 12px 0;
    }
  }
}
</style>

