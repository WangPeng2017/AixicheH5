<template>
  <div>
    <Header title="账单详情"></Header>
    <div class="bg"></div>
    <section class="section section2"></section>
    <section class="section">
      <div class="tool">
        <span class="date"
              @click="chooseDate(format)">{{ date }}年</span>
        <span class="total">本月合计：￥5269 0215 9874.00</span>
      </div>
      <div class="box">
        <x-table :cell-bordered="false"
                 class="table">
          <tbody>
            <tr v-for="n in 20"
                :key="n"
                @click="toDetail(1, 0)">
              <td>
                <div class="td1">
                  <img class="headImg"
                       :src="headImg"
                       alt="">
                  <div class="right">
                    <p class="name">Iulkjsdjaldsa</p>
                    <p class="date">2019-3-24 16:40</p>
                  </div>
                </div>
              </td>
              <td>微信支付</td>
              <td>￥89 235.00</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </section>

  </div>
</template>

<script>
import Header from 'Common/Header'
import { XTable } from 'vux'
import { formatDate } from 'Lib/formatDate'
export default {
  name: 'zdDetail',
  components: {
    Header,
    XTable
  },
  data () {
    return {
      date: formatDate(new Date(), this.format || 'YYYY'),
      format: 'YYYY',
      value: '',
      headImg: require('Assets/img/defaultGoods.png')
    }
  },
  methods: {
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
    toDetail (type, id) {
      if (type) {
        this.$router.push({ name: 'orderDetail1' })
      } else {
        this.$router.push({ name: 'orderDetail2' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 110px;
  background: #ff0036;
  position: absolute;
  top: 45px;
}

.section {
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  text-align: center;
  padding: 0 8px;
  .tool {
    background: #fff;
    padding: 5px 0px;
    line-height: 18px;
    margin: 10px 0;
    border-radius: 5px;
    text-align: left;

    .date {
      background: rgba(247, 247, 247, 1);
      border-radius: 2px;
      padding: 2px 15px 2px 5px;
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

  .box {
    background: #fff;
    border-radius: 10px;
    text-align: left;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 48px;
    bottom: 20px;
    left: 8px;
    right: 8px;
    overflow-y: auto;

    .table {
      margin-top: 10px;
      td {
        vertical-align: middle;

        .td1 {
          display: flex;
          padding: 10px 0 10px 7px;

          .headImg {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }

          .right {
            line-height: 1;
            padding-left: 5px;
            .name {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(1, 0, 0, 1);
              margin-top: 3px;
              margin-bottom: 5px;
            }
            .date {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
  }
}
.section2 {
  background: #fff;
  top: 155px;
}
</style>

