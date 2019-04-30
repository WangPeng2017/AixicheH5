<template>
  <div class="view">
    <div class="midbox">
      <x-header :left-options="{backText: ''}"
                class="vux-1px-b">
        <ul style="border:0;">
          <li :class="{ on: isonup}"
              @click="checkpending()">待审核</li>
          <li :class="{ on: !isonup}"
              @click="toAccount()">已到账</li>
        </ul>
      </x-header>
      <div class="tabtab">
        <div class="box_checkpending"
             v-for="item in sendContent1"
             v-show="isonup">
          <div class="box_c">
            <i class="weixininto-icon"
               v-if="item.account_type === 2"></i>
            <i class="cardinto-icon"
               v-if="item.account_type === 1"></i>
            <p class="money">￥{{item.integral_money}} &#12288;&#12288;<em style="color: #666666; font-size:10px">手续费：{{item.integral_money * 0.15 | money}} &#12288;&#12288;到账金额：{{item.putforward_money}}</em></p>
            <p class="user">{{item.account_number}}</p>
            <p class="datee">{{item.apply_time | formatDate}}</p>
          </div>
        </div>
        <div class="box_toAccount"
             v-for="item in sendContent2"
             v-show="!isonup">
          <div class="box_t">
            <i class="weixininto-icon"
               v-if="item.account_type === 2"></i>
            <i class="cardinto-icon"
               v-if="item.account_type === 1"></i>
            <p class="moneys">￥{{item.putforward_money}}&#12288;&#12288;<em style="color: #666666; font-size:10px">手续费：{{item.integral_money * 0.15 | money}} &#12288;&#12288;申请金额：{{item.integral_money}}</em></p>
            <p class="users">{{item.account_number}}</p>
            <p class="datees">{{item.ok_putforward_time | formatDate }}<span>提现成功</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../../filters/moneyfilter.js'
import VueQr from 'vue-qr'
import { GetPutForwardList } from '@api'
import { formatDate } from '../../../filters/date.js'
export default {
  // 转换时间格式
  filters: {
    formatDate (time) {
      var dtime = time.slice(6, 19)
      var date = new Date(parseInt(dtime))
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data () {
    return {
      isonup: true,
      sendContent1: [], // 待审核
      sendContent2: [] // 已提现
    }
  },
  components: {
    VueQr
  },
  methods: {
    checkpending () {
      (this.isonup === true) ? this.isonup = true : this.isonup = true
    },
    toAccount () {
      (this.isonup === false) ? this.isonup = false : this.isonup = false
    },
    // 加载页面数据
    async loadData () {
      // 获取用户收款账户列表
      let res = await GetPutForwardList()
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          switch (res.data[i].is_putforward) {
            case 0:
              // 待审核
              this.sendContent1.push(res.data[i])
              break
            case 1:
              // 已提现
              this.sendContent2.push(res.data[i])
              break
            default:
              break
          }
        }
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
.view {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  .midbox {
    width: 100%;
    background-color: #fff;
    ul {
      width: 100%;
      margin-top: 5%;
      text-align: center;
      border-bottom: 1px solid rgba(191, 191, 191, 1);
      li {
        float: left;
        color: #000;
        width: 45%;
        line-height: 52px;
        margin-left: 2.5%;
      }
    }
    li:hover {
      color: #ff0036;
      border-bottom: 2px solid #ff0036;
    }
    .tabtab {
      .box_c {
        margin-top: 14px;
        width: 100%;
        height: 180px;
        background-color: #f7f7f7;
        i {
          margin: 3%;
          float: left;
        }
        p {
          margin: 2%;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          font-size: 24px;
        }
        .money {
          padding-top: 3%;
          color: #ff0036;
        }
        .user {
          color: #666666;
        }
      }
      .box_t {
        margin-top: 14px;
        width: 100%;
        height: 180px;
        background-color: #f7f7f7;
        i {
          margin: 3%;
          float: left;
        }
        p {
          margin: 2%;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          font-size: 24px;
        }
        .moneys {
          padding-top: 3%;
          color: #ff0036;
        }
        .users {
          color: #666666;
        }
        span {
          text-align: center;
          margin-right: 40px;
          color: #ff0036;
          float: right;
          width: 141px;
          height: 41px;
          border: 1.5px solid rgba(255, 0, 54, 1);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>


