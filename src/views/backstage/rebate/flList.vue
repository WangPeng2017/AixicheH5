<template>
  <div>
    <Header title="返利"></Header>
    <section class="section">
      <section class="bg"
               :style="{backgroundImage:'url('+bg+')'}"></section>
      <section class="tool">
        <span class="date"
              @click="chooseDate(format)">{{ date }}</span>
        <span class="total">本月合计：￥5269 0215 9874.00</span>
      </section>
      <section class="list">
        <x-table :cell-bordered="false"
                 style="background-color:#fff;">
          <thead>
            <tr>
              <th>账号</th>
              <th>返利类型</th>
              <th>返利金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 10"
                :key="n"
                @click="toFLDetail(111)">
              <td>
                <div class="box">
                  <img :src="headImg"
                       alt="">
                  <div class="right">
                    <p class="name">cIulkjsdjaldsa</p>
                    <p class="time">2019-3-24 16:40</p>
                  </div>
                </div>
              </td>
              <td style="font-size: 12px;vertical-align: middle;">会员订单返利</td>
              <td style="font-size: 12px;vertical-align: middle;">￥3698 6824.00</td>
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
import { formatDate } from 'Lib/formatDate'
export default {
  name: 'flList',
  components: {
    Header,
    XButton,
    XTable
  },
  data () {
    return {
      bg: require('Assets/img/rebateBg.png'),
      headImg: require('Assets/img/nav3.png'),
      format: 'YYYY-MM',
      date: formatDate(new Date(), this.format || 'YYYY-MM')
    }
  },
  methods: {
    toFLDetail (id) {
      this.$router.push({ name: 'flDetail' })
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
    position: absolute;
    width: 100%;
  }

  .tool {
    background: #fff;
    padding: 5px 0px;
    line-height: 18px;
    margin: auto;
    width: 96%;
    position: relative;
    margin-top: 12px;
    .date {
      background: rgba(247, 247, 247, 1);
      border-radius: 2px;
      padding: 2px 20px 2px 5px;
      margin-left: 10px;
      vertical-align: top;
      font-size: 12px;
      position: relative;
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

  .list {
    width: 96%;
    margin: 13px auto;
    background-color: #fff;
    .box {
      display: flex;
      height: 55px;
      img {
        width: 35px;
        height: 35px;
        margin: 10px 10px 10px 7px;
        border-radius: 50%;
      }

      .right {
        .name {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(1, 0, 0, 1);
          line-height: 1;
          margin-top: 15px;
        }
        .time {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 1;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>

