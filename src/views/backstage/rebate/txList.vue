<template>
  <div>
    <Header title="提现记录"></Header>
    <tab class="tab"
         :line-width="2"
         default-color="#000000"
         active-color="#ff0000"
         bar-active-color="#ff0000"
         custom-bar-width="100px">
      <tab-item @on-item-click="getData(0)"
                selected>已审核</tab-item>
      <tab-item @on-item-click="getData(1)">待审核</tab-item>
    </tab>
    <section class="section">
      <van-list class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <!-- <van-cell v-for="item in 10" :key="item" :title="item" /> -->
        <Panel v-for="n in 10"
               :key="n"
               class="list-item">
          <template slot="left">
            <img :src="bank"
                 alt=""
                 class="bankLogo">
          </template>
          <template slot="center">
            <p class="money">￥36999</p>
            <p class="account">15976445619</p>
            <p class="date">2019-1-24 9:42:36</p>
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
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
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

