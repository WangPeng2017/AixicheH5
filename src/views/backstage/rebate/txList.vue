<template>
  <div>
    <Header title="提现记录"></Header>
    <tab class="tab"
         :line-width="2"
         default-color="#000000"
         active-color="#ff0000"
         bar-active-color="#ff0000"
         custom-bar-width="100px">
      <tab-item @on-item-click="changeTab(1)"
                selected>已审核</tab-item>
      <tab-item @on-item-click="changeTab(0)">待审核</tab-item>
    </tab>
    <section class="section">
      <van-list class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <!-- <van-cell v-for="item in 10" :key="item" :title="item" /> -->
        <Panel v-for="(n,i) in list"
               :key="i"
               class="list-item">
          <template slot="left">
            <img :src="bank"
                 alt=""
                 class="bankLogo">
          </template>
          <template slot="center">
            <p class="money">￥{{n.putforward_money}}</p>
            <p class="account">{{n.account_number}}</p>
            <p class="date">{{n.apply_time|date}}</p>
          </template>
          <template slot="right">
            <span class="state">提现成功</span>
          </template>
        </Panel>
      </van-list>
      <!--  -->
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Panel from 'Common/Panel'
import { List } from 'vant'
import { Tab, TabItem } from 'vux'
import { getPayMentaListGET, GetList } from '@api'
const USER_ID = '83b0e4f9-3dcc-4a60-8a42-df514ed239f5'

export default {
  name: 'txList',
  components: {
    Header,
    Panel,
    Tab,
    TabItem,
    [List.name]: List
  },
  data () {
    return {
      bank: require('Assets/img/defaultGoods.png'),
      list: [],
      loading: false,
      finished: false,
      status: 1
    }
  },
  filters: {
    date: function (val) {
      var date = new Date(val)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDay()
      if (day < 10) {
        day = '0' + day
      }
      var housr = date.getHours()
      if (housr < 9) {
        housr = '0' + housr
      }
      var min = date.getMinutes()
      if (min < 9) {
        min = '0' + min
      }
      var seconds = date.getSeconds()
      if (seconds < 9) {
        seconds = '0' + 9
      }
      return year + '-' + month + '-' + day + ' ' + housr + ':' + min + ':' + seconds
    }
  },
  mounted () {
    this.getPayMentaListGET()
    this.getData(1)
  },
  methods: {
    // 切换审核未审核
    changeTab (type) {
      this.status = type
      this.getData(this.status)
    },
    onLoad () {
      // // 异步更新数据
      // this.getData(this.status)
      // setTimeout(() => {
      //   if (this.list.length === 0) {
      //     this.finished = true
      //     this.loading = false
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {

      //   }
      // }, 500)
    },
    async getData (type) {
      let data = await GetList(USER_ID, type)
      this.list = data.data
      if (this.list.length === 0) {
        this.loading = false
        this.finished = true
      }
    },
    async getPayMentaListGET () {
      // 提现账户列表信息
      let data = await getPayMentaListGET(USER_ID, 0)
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  position: absolute;
  top: 44px;
  width: 100%;
}
.section {
  position: absolute;
  top: 89px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;

  .list-item {
    background: rgba(247, 247, 247, 1);
    margin-top: 10px;
    padding: 14px 16px;

    .bankLogo {
      height: 63px;
      border-radius: 8px;
      margin-right: 10px;
    }

    .money {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 0, 54, 1);
      margin-top: 5px;
    }
    .account {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .date {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }

    .state {
      font-size: 14px;
      border: 1px solid rgba(255, 0, 54, 1);
      border-radius: 4px;
      color: rgba(255, 0, 54, 1);
      padding: 3px 10px;
      font-style: normal;
      position: absolute;
      bottom: 14px;
      right: 20px;
    }
  }
}
</style>

