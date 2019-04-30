<template>
  <div>
    <Header title="提现">
      <span slot="right"
            class="rightBtn"
            @click="toTXList">提现记录>></span>
    </Header>
    <section class="section">

      <section class="part1">
        <p class="line1">
          <span>余额￥</span>
          877 7666.00
        </p>
        <p class="line2">
          今日最大提现额：
          <span>￥3600</span>
          <i>?</i>
        </p>
        <p class="line3">
          <input type="number"
                 v-model="value"
                 placeholder="提现金额" />
        </p>
        <p class="line4">
          <span class="left">
            手续费：
            <i>￥3600</i>
          </span>
          <span class="right">
            实到额度：
            <i>￥36800</i>
          </span>
        </p>
      </section>
      <section class="part2">
        <p class="line1">
          <span>提现方式</span>
          <i>今日提现次数：1次</i>
        </p>

        <van-radio-group v-model="txType">
          <van-cell-group>
            <van-cell clickable
                      @click="txType = 'weixin'">
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
                      @click="txType = 'bankCard'">
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
      </section>

      <section class="part3">
        <p class="title">注：提现说明</p>
        <p>1.每日可提现总金额的60%；</p>
        <p>2.手续费为提金额的5%；</p>
        <p>3.提现将在1-36小时内到账，如遇高峰期，可能会延迟到账，请耐心等待；</p>
        <p>4.请及时查看 返利详情>立即提现>提现页面右上角提现记录实时查看提 现记录；
        </p>
      </section>
    </section>
    <x-button @click.native="toGetMoney"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">立即提现</x-button>
    <Model :show="showModel1"
           @closeModel="closeModel"
           :resetStyle="{width: '80%', height: '400px', top: '15%', padding: 0, borderRadius: '10px'}">
      <Header title="选择账户"
              :showBack="false">
        <span slot="left"
              style="color: #999999;padding:13px 5px;"
              @click="toEditeWXAccount">编辑</span>
        <span slot="right"
              v-if="wxAccount"
              style="color: #FF0036;padding:13px 5px;"
              @click="sureGetMoney">确定</span>
        <span slot="right"
              v-if="!wxAccount"
              style="color: #999999;padding:13px 5px;"
              @click="closeModel">X</span>
      </Header>
      <van-radio-group v-model="wxAccount"
                       style="margin-top: 45px;">
        <swipeout>
          <swipeout-item v-for="n in 3"
                         :key="n"
                         @click.native="wxAccount = n"
                         transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('delete')"
                               :width="40"
                               style="background:#FF0036;font-size:12px;">删除</swipeout-button>
            </div>
            <div slot="content"
                 class="vux-1px-t"
                 style="height: 36px;line-height:36px;font-size:14px; border-bottom: 1px solid #eee;">
              <span style="width: 50%; padding-left: 10px; display:inline-block;">{{ n }}</span>
              <span style="width: 20%; text-align:center; display:inline-block;">萌萌梦</span>
              <van-radio checked-color="#FF0036"
                         :name="n"
                         style="width: 20%; display:inline-block;text-align:right;vertical-align: top;" />
            </div>
          </swipeout-item>
        </swipeout>
      </van-radio-group>

      <div class="add"
           @click="toAddWXAccount">
        <span>添加新账户</span>
        <i></i>
      </div>
    </Model>
    <Model :show="showModel2"
           @closeModel="closeModel"
           :resetStyle="{width: '80%', height: '400px', top: '15%', padding: 0, borderRadius: '10px'}">
      <Header title="选择账户"
              :showBack="false">
        <span slot="left"
              style="color: #999999;padding:13px 5px;"
              @click="toEditeBankAccount">编辑</span>
        <span slot="right"
              v-if="bankAccount"
              style="color: #FF0036;padding:13px 5px;"
              @click="sureGetMoney">确定</span>
        <span slot="right"
              v-if="!bankAccount"
              style="color: #999999;padding:13px 5px;"
              @click="closeModel">X</span>
      </Header>
      <van-radio-group v-model="bankAccount"
                       style="margin-top: 45px;">
        <swipeout>
          <swipeout-item v-for="n in 3"
                         :key="n"
                         @click.native="bankAccount = n"
                         transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('delete')"
                               :width="40"
                               style="background:#FF0036;font-size:12px;">删除</swipeout-button>
            </div>
            <div slot="content"
                 class="vux-1px-t"
                 style="height: 56px; line-height: 56px;font-size:14px;border-bottom: 1px solid #eee;">
              <span style="width: 50%; padding-left: 10px; display:inline-block;">
                <i class="bankName"
                   style="display: block;line-height:2;">中国工商银行</i>
                <i class="bankCode"
                   style="display: block;line-height:2;font-size:12px;">1234567895318645927</i>
              </span>
              <span style="width: 20%;vertical-align: top;text-align:center; display:inline-block;">1</span>
              <van-radio checked-color="#FF0036"
                         :name="n"
                         style="width: 20%; display:inline-block;text-align:right;vertical-align: top;" />
            </div>
          </swipeout-item>
        </swipeout>
      </van-radio-group>
      <div class="add"
           @click="toAddBankAccount">
        <span>添加新账户</span>
        <i></i>
      </div>
    </Model>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Panel from 'Common/Panel'
import Model from 'Common/Model'
import { List, Cell, CellGroup, RadioGroup, Radio } from 'vant'
import {
  Tab,
  TabItem,
  XButton,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'

export default {
  name: 'txList',
  components: {
    Header,
    Panel,
    Model,
    Tab,
    TabItem,
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    [List.name]: List,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data () {
    return {
      value: '',

      txType: 'weixin',
      wxAccount: '',
      bankAccount: '',
      weixin: require('Assets/img/weixin.png'),
      bankCard: require('Assets/img/bankCard.png'),
      add: require('Assets/img/add.png'),
      showModel1: false,
      showModel2: false
    }
  },
  methods: {
    toTXList () {
      this.$router.push({ name: 'txList' })
    },
    toGetMoney () {
      if (this.txType === 'weixin') {
        this.showModel1 = true
      } else {
        this.showModel2 = true
      }
    },
    closeModel () {
      this.showModel1 = false
      this.showModel2 = false
    },
    onButtonClick (type) {
      console.log('deleted')
    },
    toAddWXAccount () {
      console.log('添加微信账号')
      this.$router.push({ name: 'addWXAccount' })
    },
    toAddBankAccount () {
      console.log('添加银联账号')
      this.$router.push({ name: 'addBankAccount' })
    },
    toEditeWXAccount () {
      console.log('编辑微信账号')
    },
    toEditeBankAccount () {
      console.log('编辑银联账号')
    },
    sureGetMoney () {
      this.$router.push({ name: 'getMoneySuccess' })
    }
  }
}
</script>

<style lang="less" scoped>
.rightBtn {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.section {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .part1 {
    text-align: center;
    background: #fff;
    padding: 20px 0;

    .line1 {
      font-size: 30px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ff0036;
      margin-bottom: 20px;
      span {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .line2 {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 20px 0;
      span {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 700;
        color: #000;
      }
      i {
        display: inline-block;
        width: 14px;
        height: 14px;
        font-size: 12px;
        line-height: 16px;
        border: 1px solid #ff0036;
        border-radius: 50%;
        color: #ff0036;
        vertical-align: bottom;
        margin-left: 5px;
      }
    }
    .line3 {
      margin: 20px 0;
      input {
        width: 60%;
        border: 1px solid #c7c7c7;
        outline: none;
        height: 27px;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 14px;
      }
    }
    .line4 {
      margin: 20px 0;
      display: flex;
      span {
        flex: 1;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        i {
          font-weight: 700;
          color: #000;
        }
      }
      .left {
        text-align: right;
        padding-right: 15px;
      }
      .right {
        text-align: left;
        padding-left: 15px;
      }
    }
  }

  .part2 {
    .line1 {
      height: 37px;
      line-height: 37px;
      padding: 0 10px;
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-right: 5px;
      }
      i {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .part3 {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 1.5;
    }

    .title {
      font-weight: 700;
      color: rgba(1, 0, 0, 1);
    }
  }
}

.add {
  width: 70%;
  height: 30px;
  text-align: center;
  border: 1px dashed rgba(197, 197, 197, 1);
  line-height: 30px;
  transform: translate(-50%, 0);
  position: absolute;
  left: 50%;
  bottom: 20px;
  span {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(197, 197, 197, 1);
  }

  i {
    width: 20px;
    position: relative;
    margin-left: 15px;
    margin-top: -2px;
  }

  i:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    margin-left: -10px;
    margin-top: -1px;
    border-top: 1px solid rgba(197, 197, 197, 1);
  }

  i:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 20px;
    margin-left: -1px;
    margin-top: -10px;
    border-left: 1px solid rgba(197, 197, 197, 1);
  }
}
</style>

