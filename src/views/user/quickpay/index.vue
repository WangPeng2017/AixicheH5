<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">向商家付款</x-header>
    <img :src="seller_logo"
         alt=""
         id="imgphoto" />
    <p class="usern">{{user_name}}</p>
    <p class="paymoney">支付金额</p>
    <span>￥<input type="text"
             id="txtmoney"
             class="txtmoney"
             maxlength="10"
             v-model="okprice"
             onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></span>
    <hr>
    <input type="text"
           maxlength="20"
           id="txtremark"
           class="txtremark"
           placeholder="添加备注(不超过20字)">
    <button @click="Payment">确认支付</button>
  </div>
</template>

<script>
import { sweepaddOrder } from '@api'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import wx from 'weixin-js-sdk'
import qs from 'qs'
export default {
  data () {
    return {
      user_name: this.$route.query.sellername,
      seller_logo: 'https://img.axccn.cn' + this.$route.query.sellerimg,
      okprice: 0                                                                    // 输入的支付金额
    }
  },
  computed: {
    ...mapState(['token', 'openid', 'user'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    async Payment () {
      let orderList = []
      let orderObj = {
        price: this.okprice,
        openid: this.openid
      }
      orderList.push(orderObj)
      this.setLoading({
        status: true,
        opacity: 0
      })
      let postData = {
        price: this.okprice,
        openid: this.openid,
        sellerId: this.$route.query.sellerId
      }
      let res = await sweepaddOrder(qs.stringify(postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (res.data.type === 'wx_jsapi') {
          this.callWxJsApiPay(res.data.result, (res) => {
            // 支付成功
            this.$router.replace(`/paySuccess/` + res.data.order_no + `/` + res.data.price)
          }, (res) => {
            // 支付失败
            this.$toasted.show('付款失败，请重试！')
          })
        }
      }
    },
    async callWxJsApiPay (data, successCallback, errorCallback) {
      data = JSON.parse(data)
      let appId = data.appId
      let timestamp = data.timeStamp
      let nonceStr = data.nonceStr
      let signature = data.signature
      let packages = data.package
      let paySign = data.paySign
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
            successCallback(res)
          },
          fail: function (res) {
            errorCallback(res)
          }
        })
      })
      wx.error(function (res) {
        errorCallback(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.view {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  font-size: $default_font_size;
  img {
    width: 20%;
    height: 10%;
    margin-top: 10%;
  }
  .usern {
    margin-top: 1%;
  }
  .paymoney {
    text-align: left;
    margin-left: 2%;
    margin-top: 10%;
    margin-bottom: 2%;
  }
  span {
    font-size: 72px;
    font-weight: bold;
    margin-top: 10%;
    margin-bottom: 10%;
    .txtmoney {
      width: 90%;
      height: 60px;
      border: 0;
      background-color: white;
    }
  }
  hr {
    margin-top: 2%;
    width: 95%;
    color: $default_gray_color;
  }
  .txtremark {
    font-size: 26px;
    width: 90%;
    height: auto;
    border: 0;
    background-color: white;
  }
  button {
    width: 90%;
    height: 100px;
    margin-top: 12%;
    border: 0;
    color: white;
    font-size: $default_bigfont_size;
    background-color: $default_theme_color;
  }
}
</style>

