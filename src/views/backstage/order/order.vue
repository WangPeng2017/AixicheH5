<template>
  <div>
    <Header title="订单管理"></Header>
    <section class="section">
      <tab :line-width="2"
           default-color="#000000"
           active-color="#ff0000"
           bar-active-color="#ff0000"
           custom-bar-width="50px">
        <tab-item @on-item-click="getData(0)"
                  selected>订单</tab-item>
        <tab-item @on-item-click="getData(2)">未发货</tab-item>
        <tab-item @on-item-click="getData(3)">已发货</tab-item>
        <tab-item @on-item-click="getData()">退货</tab-item>
      </tab>
      <div class="toolBox">
        <div class="tool">
          <span class="date"
                @click="chooseDate(format)">{{ date }}</span>
          <span class="total">共计¥{{total}}</span>
          <van-search placeholder="搜索订单编号或付款账户"
                      v-model="value"
                      style="width:180px; padding: 0; margin-right: 10px; display: inline-block; float:right;">
          </van-search>

        </div>
      </div>
    </section>
    <section class="section2">
      <div class="list-item"
           v-for="(n,i) in orderList "
           :key="i">
        <div class="item-title"
             v-for="item in n.goods"
             :key="n.order_sn">
          <img :src="defaultGoods"
               alt=""
               class="title-img">
          <div class="right">
            <span class="title-price">￥{{item.goods_price.toFixed(2)}}</span>
            <p class="title-code">订单编号：{{item.order_sn}}</p>
            <span class="title-toDetail"
                  @click="toOrderDetail(n.order_id, true)">查看详情></span>
          </div>
        </div>
        <div class="item-content"
             v-if="state!==0">
          <p class="content-msg">
            <span class="content-left">付款人：</span>
            <span class="content-right">xxx</span>
          </p>
          <p class="content-msg">
            <span class="content-left">下单时间：</span>
            <span class="content-right">2019-9-8 16:32</span>
          </p>
          <p class="content-msg">
            <span class="content-left">订单名称：</span>
            <span class="content-right">精致洗车快速洗车镀晶打蜡封釉贴膜四轮定位洗车镀晶打蜡封釉贴膜 四轮定 </span>
          </p>
          <p class="content-msg">
            <span class="content-left">接收地址：</span>
            <span class="content-right">河南省郑州市二七区南三环连云路都市广场B座二七区南三环连云路 市广场B座 </span>
          </p>
          <p class="content-msg">
            <span class="content-left">买家备注：</span>
            <span class="content-right">河南省郑州市二七区南三环连云路都市广场B座二七区南三环连云路 市广场B座</span>
          </p>
          <p class="content-msg">
            <span v-if="state === 2"
                  class="button1">同意退货</span>
            <span v-if="state === 2"
                  class="button1">已接收</span>
            <span v-if="state === 2"
                  class="button2">拒绝退货</span>
          </p>
        </div>

        <div class="item-content"
             v-if="state===0">
          <p class="content-msg">
            <span class="content-left">付款人：</span>
            <span class="content-right">xxx</span>
          </p>
          <p class="content-msg">
            <span class="content-left">下单时间：</span>
            <span class="content-right">2019-9-8 16:32</span>
          </p>
          <p class="content-msg">
            <span class="content-left">付款方式：</span>
            <span class="content-right">微信</span>
          </p>

          <p class="content-msg">
            <span v-if="state === 0"
                  class="button1">付款成功</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Tab, TabItem } from 'vux'
import { Search } from 'vant'
import { formatDate } from 'Lib/formatDate'
import { GetOrderList } from '@api'
const USER_ID = '83b0e4f9-3dcc-4a60-8a42-df514ed239f5'
export default {
  name: 'order',
  components: {
    Header,
    Tab,
    TabItem,
    [Search.name]: Search
  },
  data () {
    return {
      date: formatDate(new Date(), this.format || 'YYYY-MM'),
      format: 'YYYY-MM',
      value: '',
      state: -1,
      total: 1231321,
      defaultGoods: require('Assets/img/defaultGoods.png'),
      orderList: []
    }
  },
  created () {
    this.fetchOrderList()
  },
  methods: {
    async fetchOrderList () {
      let orderList = await GetOrderList(USER_ID, 10, 10, this.state)
      if (orderList && orderList.status === 200) {
        this.orderList = orderList.data.list
      }
    },
    getData (index) {
      this.state = index
      this.fetchOrderList()
    },
    chooseDate (format) {
      const vm = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: format,
        value: '',
        onConfirm (val) {
          vm.date = val
        },
        onShow () {
          // console.log("plugin show");
        },
        onHide () {
          // console.log("plugin hide");
        }
      })
    },
    toOrderDetail (id, type) {
      if (!type) {
        this.$router.push({ name: 'orderDetail1', query: { order_id: id } })
      } else {
        this.$router.push({ name: 'orderDetail2', query: { order_id: id } })
      }
    },
    onSearch () { }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  overflow: auto;

  .toolBox {
    padding: 0px 9px;
    margin-top: 7px;
    .tool {
      background: #fff;
      padding: 5px 0px;
      line-height: 24px;
      .date {
        background: rgba(247, 247, 247, 1);
        border-radius: 2px;
        padding: 5px 15px 5px 5px;
        margin: 0px 0 0 10px;
        font-size: 12px;
        position: relative;
        vertical-align: top;
      }
      .date:after {
        content: ' ';
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 1px 1px 0 0;
        border-color: #000;
        border-style: solid;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 4px;
      }
      .total {
        float: right;
        padding-right: 5px;
        font-size: 12px;
      }
    }
  }
}
.section2 {
  padding: 0 9px;
  position: absolute;
  top: 140px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .list-item {
    background: #fff;
    padding: 7px 7px 10px 7px;
    overflow: hidden;
    margin-bottom: 8px;
    .item-title {
      padding-bottom: 10px;
      display: flex;
      position: relative;
      .title-img {
        width: 55px;
        height: 55px;
      }
      .right {
        padding: 0 10px;
        width: 100%;
        position: relative;
        .title-price {
          font-size: 20px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          position: absolute;
          top: 10px;
          line-height: 1;
        }

        .title-code {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          position: absolute;
          bottom: 10px;
        }

        .title-toDetail {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          position: absolute;
          right: 0;
          bottom: 20px;
        }
      }
    }

    .item-title:after {
      content: ' ';
      position: absolute;
      left: 0px;
      bottom: 0;
      right: 0px;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    .item-content {
      font-size: 12px;
      line-height: 1.5;
      text-align: left;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .content-msg {
        margin-top: 7px;
        .content-left,
        .content-right {
          width: 18%;
          display: inline-block;
          vertical-align: top;
        }
        .content-right {
          width: 79%;
        }

        .button1,
        .button2 {
          background: rgba(255, 0, 54, 1);
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding: 3px 8px;
        }
        .button2 {
          background: rgba(209, 209, 209, 1);
        }
      }
    }
  }
}
</style>

