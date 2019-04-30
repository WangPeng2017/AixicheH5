<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">提现
      <span class="innow"
            @click="$router.push('/myrecord')">提现记录>></span></x-header>
    <div class="top">
      <p>可提现金额￥<span class="moneynum">{{maxreflect | money}}</span></p>
      <p>账户余额：
        <span style="color:#666666">￥{{totalmoney | money}}</span>
        <!--<i class="tips-icon" @click="openMask3"></i>-->
      </p>
      <p><input v-model="textid"
               type="number"
               id="textid"
               :placeholder="placeholder" /></p>
      <div class="row">
        <p class="fee">手续费：<span style="color:#666666">￥{{fee | money}}</span></p>
        <p class="Actuallylimit">实到额度：<span style="color:#666666">￥{{Actuallylimit | money}}</span></p>
      </div>
    </div>
    <div class="middle_top">
      <h3>提现方式</h3>
      <!--<font>本月剩余提现次数：{{numwithdraw}}次</font>-->
    </div>
    <div class="middle">
      <div class="weixin"><i class="weixin-icon"></i>微信<div :class="{'weixinn': true, 'detail-selected': isw}"
             id="weixinn"
             @click="chooseweixin($event)"></div>
      </div>
      <!-- <div class="card"><i class="card-icon"></i>银行卡<div :class="{'card-btn': true, 'detail-selected': isc}"
             id="card-btn"
             @click="choosecard($event)"></div>
      </div> -->
    </div>
    <button @click="pricement">立即提现</button>
    <dialog-bar v-model="sendVal"
                type="danger"
                title="选择账户"
                :content="sendContent"
                v-on:child-say="listenToMyBoy">
    </dialog-bar>
    <dialog-bar2 v-model="sendVal2"
                 type="danger"
                 title="选择账户"
                 :content="sendContent1"
                 v-on:child-say="listenToMyBoy1">
    </dialog-bar2>
    <dialog-Tips v-model="sendVal3"
                 type="danger"
                 title="注意事项"
                 :content="sendContent2">
    </dialog-Tips>
  </div>
</template>

<script>
import '../../../filters/moneyfilter.js'
import dialogBar from './components/dialogs.vue'
import dialogbar2 from './components/dialogCard.vue'
import dialogTips from './components/dialogTips.vue'
import { mapState } from 'vuex'
import { getPaymenAccountList, SubmitPutForward } from '@api'
export default {
  components: {
    'dialog-bar': dialogBar,
    'dialog-bar2': dialogbar2,
    'dialog-Tips': dialogTips
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      as: '',
      totalmoney: 0, // 余额
      maxreflect: 0, // 今日最大提现额
      fee: 0, // 手续费
      Actuallylimit: 0, // 实到额度
      numwithdraw: 0, // 提现剩余次数
      sendVal: false,
      sendVal2: false,
      sendVal3: false,
      isw: false,
      isc: false,
      sendContent: [], // 選擇微信賬戶内容
      sendContent1: [], // 選擇銀行卡内容
      sendContent2: '这是注意事项内容', // 注意事項内容
      placeholder: '请输入提现金额',
      textid: null,
      paymenttype: null,
      paymentname: '',
      paymentcard: '',
      paymentopenbank: '',
      form: {
        integral_money: 0, // 申请提现金额
        putforward_money: 0, // 实到金额
        account_type: 0, // 提现账户类型
        account_name: '',
        account_number: '',
        account_open_bank: ''
      }
    }
  },
  methods: {
    openMask (index) {
      this.sendVal = true
    },
    openMask2 (index) {
      this.sendVal2 = true
    },
    openMask3 (index) {
      this.sendVal3 = true
    },
    async pricement () {
      if (!this.textid || this.textid.length === 0) {
        return this.$toasted.show('请先输入提现金额！')
      }
      if (this.paymenttype === null || this.paymentname === '' || this.paymentcard === '') {
        return this.$toasted.show('请先选择提现到账账户！')
      }
      this.form.integral_money = this.textid
      this.form.putforward_money = this.Actuallylimit
      this.form.account_type = this.paymenttype
      this.form.account_name = this.paymentname
      this.form.account_number = this.paymentcard
      this.form.account_open_bank = this.paymentopenbank
      let res = await SubmitPutForward(this.form)
      if (res.code === 200) {
        this.$router.replace(`/myWithdrawalsuccess/${this.textid}/${this.$options.filters.money(this.fee)}/${this.Actuallylimit}`) // (/myWithdrawalsuccess/:price/:charge/:actual 提现金额，手续费，实到金额)
      }
    },
    chooseweixin: function (e) {
      this.isw = !this.isw
      if (this.isc) {
        this.isc = !this.isc
      }
      if (this.isw) {
        this.openMask()
      }
    },
    choosecard: function (a) {
      this.isc = !this.isc
      if (this.isw) {
        this.isw = !this.isw
      }
      if (this.isc) {
        this.openMask2()
      }
    },
    listenToMyBoy: function (val) {
      this.paymenttype = val[0]
      this.paymentname = val[1]
      this.paymentcard = val[2]
    },
    listenToMyBoy1: function (val) {
      this.paymenttype = val[0]
      this.paymentname = val[1]
      this.paymentcard = val[2]
      this.paymentopenbank = val[3]
    },
    // 加载页面数据
    async loadData () {
      this.totalmoney = this.user.user_money
      this.maxreflect = this.user.user_money * 0.3
      var userid = this.user.user_id
      var usertype = this.user.user_type
      // 获取用户收款账户列表
      let res = await getPaymenAccountList(userid, usertype)
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          switch (res.data[i].account_type) {
            case 0:
              this.sendContent1.push(res.data[i])
              break
            case 2:
              this.sendContent.push(res.data[i])
              break
            default:
              break
          }
        }
      }
    }
  },
  // 监听提现金额输入框的输入内容改变
  watch: {
    textid: function (val) {
      if (val != null) {
        // 通过正则过滤小数点后两位
        this.textid = val.match(/^\d*(\.?\d{0,2})/g)[0] || null
        if (this.textid > this.maxreflect) {
          this.textid = null
          this.placeholder = '输入的金额大于可提现金额'
        }
        this.fee = this.textid * 0.15
        this.Actuallylimit = this.textid - this.fee
      }
    }
  },
  created () { },
  activated () {
    // 加载页面数据
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.view {
  width: 100%;
  text-align: center;
  height: auto;
  .innow {
    position: fixed;
    right: 18px;
    font-size: 18px;
    color: #666666;
  }
  .innow:hover {
    color: #ff0036;
  }
  .top {
    width: 100%;
    height: 387px;
    background-color: #fff;
    text-align: center;
    p {
      padding-top: 3%;
      // font-size: 18px;
      color: #666666;
      .moneynum {
        font-size: 80px;
        font-weight: bold;
        color: #ff0036;
      }
      i {
        margin-left: 20px;
      }
    }
    input {
      width: 463px;
      height: 53px;
      border: 2px solid #c7c7c7;
      border-radius: 10px;
      padding-left: 10px;
    }
    .row {
      width: 463px;
      // font-size: 18px;
      background: #ff0036;
      margin-top: 2%;
      margin-left: 20%;
      .fee {
        float: left;
      }
      .Actuallylimit {
        float: right;
      }
    }
  }
  .middle_top {
    text-align: left;
    padding-left: 0.5%;
    line-height: 74px;
    font-family: MicrosoftYaHei;
    h3 {
      color: #000000;
      padding: 3%;
      margin-left: 10px;
      display: inline;
      font-weight: normal;
    }
  }
  font {
    // font-size: 12px;
    color: #666666;
  }
  .middle {
    height: 148px;
    background-color: #fff;
    text-align: left;
    .weixin {
      line-height: 74px;
      border-bottom: 2px solid #f7f7f7;
      margin-left: 4%;
      .weixin-icon {
        margin-right: 10px;
      }
    }
    .card {
      line-height: 74px;
      border-bottom: 2px solid #f7f7f7;
      margin-left: 4%;
      .card-icon {
        margin-right: 10px;
      }
    }
  }
  .weixinn {
    width: 40px;
    height: 40px;
    background: url(../../../assets/image/gray-icon@2x.png) no-repeat;
    background-size: 100%;
    float: right;
    margin: 2%;
  }
  .card-btn {
    width: 40px;
    height: 40px;
    background: url(../../../assets/image/gray-icon@2x.png) no-repeat;
    background-size: 100%;
    float: right;
    margin: 2%;
  }
  .detail-selected {
    background: url(../../../assets/image/redgou@2x.png) no-repeat;
    background-size: 100%;
  }
  button {
    text-align: center;
    width: 100%;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    border: 0;
    color: #fff;
    background: #ff0036;
  }
}
</style>

