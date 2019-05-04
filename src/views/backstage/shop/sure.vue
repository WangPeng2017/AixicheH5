<template>
  <div>
    <Header title="收银台"></Header>
    <section class="section">
      <div class="part1">
        <p>
          <span>￥</span> {{selectLeval.seller_level_standard}}
        </p>
      </div>
      <div class="part2">
        <van-radio-group v-model="payType">
          <van-cell-group>
            <van-cell clickable
                      @click="payType = 'weixin'">
              <template slot="title">
                <img :src="weixin"
                     alt=""
                     style="width: 24px;vertical-align: middle;" />
                <span>微信</span>
              </template>
              <van-radio checked-color="#FF0036"
                         name="weixin" />
            </van-cell>
            <van-cell clickable
                      @click="payType = 'zhifubao'">
              <template slot="title">
                <img :src="zhifubao"
                     alt=""
                     style="width: 24px;vertical-align: middle;" />
                <span>支付宝</span>
              </template>
              <van-radio checked-color="#FF0036"
                         name="zhifubao" />
            </van-cell>
            <van-cell clickable
                      @click="payType = 'bankCard'">
              <template slot="title">
                <img :src="bankCard"
                     alt=""
                     style="width: 24px;vertical-align: middle;" />
                <span>银行卡</span>
              </template>
              <van-radio checked-color="#FF0036"
                         name="bankCard" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>

    </section>
    <XButton class="button"
             @click.native="surePay"
             style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确认支付</XButton>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton, XTable } from 'vux'
import { CellGroup, Cell, RadioGroup, Radio } from 'vant'
import { createCashPay } from '@api'
export default {
  name: 'sure',
  components: {
    Header,
    XButton,
    XTable,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data () {
    return {
      payType: 'weixin',
      weixin: require('Assets/img/weixin.png'),
      zhifubao: require('Assets/img/zhifubao.png'),
      bankCard: require('Assets/img/bankCard.png'),
      selectLeval: {}
    }
  },
  created () {
    this.selectLeval = this.$route.query.selectLeval
  },
  methods: {
    async _createCashPay () {
      // let form = new FormData()
      // form.append('price', this.selectLeval.seller_level_standard)
      // form.append('seller_id', sessionStorage.getItem('seller_id'))
      // form.append('level_id', this.selectLeval.seller_level_id)
      let price = this.selectLeval.seller_level_standard
      let sellerId = sessionStorage.getItem('seller_id')
      let levelId = this.selectLeval.seller_level_id
      let res = await createCashPay(price, sellerId, levelId)
      if (res && res.code === 200) {
        this.$router.push({ name: 'paySuccess' })
        console.log(res)
      }
    },
    surePay () {
      this._createCashPay()
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
    height: 116px;
    line-height: 116px;
    text-align: center;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 0, 54, 1);
    span {
      font-size: 16px;
    }
  }
}
</style>

