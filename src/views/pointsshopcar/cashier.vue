<template>
  <div class="view">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              class="vux-1px-b"
              left-options.preventGoBack="true"
              @on-click-back="back">收银台</x-header>
    <br class="content">
      <div class="price"><em>￥</em>{{payPrice.toFixed(2)}}<br/>
     <p style="line-height: initial; font-size: large;"><em class="jifen-icon"></em>&nbsp;{{paypoints}}</p></div>
      <group>
        <radio :options="options"
               v-model="payType">
          <template slot-scope="props"
                    slot="each-item">
            <p>
              <i class="wx-icon inline-icon"
                 v-if="props.index===0"></i>
              <i class="zfb-icon inline-icon"
                 v-if="props.index===1"></i>
              {{ props.label }}
            </p>
          </template>
        </radio>
      </group>
      <a href="javascript:void(0)"
         class="payBtn"
         @click="pay">确认支付</a>
    </div>
</template>

<script>
import { XHeader, Radio, Group } from 'vux'
import { createPointsGoodsCashPay, createPackageCashPay } from '@api'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import wx from 'weixin-js-sdk'
import { GetQueryString } from '@utils/mixin'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Confirm)

export default {
  components: {
    XHeader,
    Group,
    Radio
  },
  computed: {
    ...mapState(['token', 'openid'])
  },
  data () {
    return {
      options: [
        { key: '0', value: '微信' },
        { key: '1', value: '支付宝' }
      ],
      payType: 0,
      payPrice: parseFloat(this.$route.query.price),
      paypoints: parseFloat(this.$route.query.points)
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    back () {
      this.$confirm({
        title: '',
        content: '您确定要放弃本次购买吗？',
        yesText: '去意已决',
        noText: '我再想想',
        yesStyle: {
          'background-color': '#f15353',
          'color': '#ffffff',
          'font-size': '16px'
        },
        noStyle: {
          'color': '#666666',
          'font-size': '16px'
        }
      }).then(() => {
        if (this.url) {
          this.$router.replace(this.url)
        } else {
          this.$router.back()
        }
      }).catch(() => {

      })
    },
    change (value, label) {
      if (value && value.length > 0) {
        this.payType = parseInt(value)
      } else {
        this.paySelectType = [this.payType.toString()]
      }
    },
    async pay () {
      if (!this.token) {
        this.$router.replace({ path: this.$route.path })
        return
      }

      let code = GetQueryString('code')
      let form = new FormData()
      form.append('order_no', this.$route.query.no)
      form.append('price', this.$route.query.price)
      form.append('order_type', this.$route.query.type)
      form.append('pay_type', this.payType)
      form.append('code', code)
      form.append('body', this.$route.query.body)
      form.append('attach', this.$route.query.attach)
      form.append('return_url', window.location.href)
      if (this.openid) {
        form.append('openid', this.openid)
      }
      this.setLoading({
        status: true,
        opacity: 0
      })

      if (this.$route.query.type === 'goods') {
        let res = await createPointsGoodsCashPay(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          if (res.data.type === 'wx_jsapi') {
            this.callWxJsApiPay(res.data.result, (res) => {
              // 支付成功
              this.$router.replace(`/paySuccess/${this.$route.query.no}/${this.$route.query.price}`)
            }, (res) => {
              // 支付失败
              this.$toasted.show('付款失败，请重试！')
            })
          }
        }
      } else if (this.$route.query.type === 'package') {
        let res = await createPackageCashPay(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          if (res.data.type === 'wx_jsapi') {
            this.callWxJsApiPay(res.data.result, (res) => {
              // 支付成功
              this.$router.replace(`/paySuccess/${this.$route.query.no}/${this.$route.query.price}`)
            }, (res) => {
              // 支付失败
              this.$toasted.show('付款失败，请重试！')
            })
          }
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
  },
  created () {

  },
  activited () {

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.inline-icon {
  margin-right: 20px;
}

.price {
  font-size: 80px;
  color: $default_red_color;
  text-align: center;
  line-height: 300px;
  em {
    font-size: 40px;
    font-style: normal;
  }
}
.payBtn {
  width: 700px;
  height: 80px;
  background-color: $default_red_color;
  color: #fff;
  display: block;
  margin: 80px auto 0;
  border-radius: 10px;
  text-align: center;
  line-height: 80px;
  font-size: $default_font_size;
}
</style>
