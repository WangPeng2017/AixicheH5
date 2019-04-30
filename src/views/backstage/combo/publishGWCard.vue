<template>
  <div>
    <Header title="套餐详情"></Header>
    <section class="section">
      <Card1 :data="data"></Card1>
      <div class="part3">
        <div class="title border-1px-bottom">
          <span class="left-name">发放用户：</span>
          <input type="number"
                 class="input"
                 placeholder="请输入会员手机号" />
          <div class="right-arrow">
            <i class="arrow"
               style="border-color: #999;"></i>
          </div>
        </div>
        <div class="title">
          <span class="left-name">发放金额：</span>
          <input type="number"
                 class="input"
                 placeholder="请输入会员金额" />
          <div class="right-arrow">
            <i class="arrow"
               style="border-color: #999;"></i>
          </div>
        </div>
        <div class="title"
             style="background:#fff;">
          <span class="left-name">参与商品</span>
          <div class="right-content"
               @click="toFFList">
            发放列表
          </div>
        </div>
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th style="width: 25%;">商品名称</th>
              <th>规格</th>
              <th style="width: 25%;">一口价（元）</th>
              <th style="width: 25%;">套餐价（元）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in choosedData"
                :key="item.id">
              <td style="text-align:left; padding-left: 5px;">{{item.name}}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.allmoney }}</td>
              <td>{{ item.money }}</td>
            </tr>
          </tbody>
        </x-table>
        <div class="title">
          <span class="left-name">参与会员详情</span>
          <div class="right-content"
               @click="toHYList">
            参与会员列表
          </div>
        </div>
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th style="width: 25%;">会员账号</th>
              <th>加入方式</th>
              <th>消费</th>
              <th>余额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 10"
                :key="n">
              <td>15678445699</td>
              <td>发放进入</td>
              <td>23.00</td>
              <td>19.00</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </section>
    <x-button @click.native="sure"
              type="warn "
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0; ">发放</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Card1 from 'Common/Card1'
import { XButton, XTable } from 'vux'
export default {
  name: 'publishGWCard',
  components: {
    Header,
    Card1,
    XButton,
    XTable
  },
  data () {
    return {
      data: {
        url: require('Assets/img/defaultGoods.png'),
        title: '套餐名称服务卡详测试',
        cardType: '购物卡',
        money: '3000',
        date: '2019-9-23',
        content:
          '套餐简介：360趋势是以360产品海量用户数据为基础的大数据展示平台,可通过搜 索关键词,快速获取热度趋势、理解用户真实需求、'
      },
      defaultGoods: require('Assets/img/defaultGoods.png'),
      isShowModel: false,
      value: '',
      choosedData: [
        {
          name: '精致洗车',
          type: 'SUV/MPV',
          allmoney: '23.00',
          money: '19.00',
          value: '12',
          id: 1111
        },
        {
          name:
            '精致洗车镀晶打蜡贴膜精 致洗车镀晶打蜡贴膜精致 洗车镀晶打蜡贴膜',
          type: 'SUV/MPV通用',
          allmoney: '23.00',
          money: '19.00',
          value: '5',
          id: 1222
        }
      ]
    }
  },
  methods: {
    chooseGoods () {
      this.isShowModel = true
    },
    sure () {
      this.$router.push({ name: 'publishFWDetail' })
    },
    toFFList () {
      this.$router.push({ name: 'ffList' })
    },
    toHYList () {
      this.$router.push({ name: 'hyList' })
    },
    closeModel () {
      this.isShowModel = false
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  bottom: 45px;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;

  .part3 {
    padding: 5px 0;
    .title {
      background: rgba(247, 247, 247, 1);
      position: relative;

      .border-1px-bottom:after {
        content: ' ';
        height: 1px;
        border-bottom: 1px solid #c7c7c7;
        color: #c7c7c7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .left-name {
        font-size: 14px;
        margin-left: 10px;
        padding: 10px 0;
        display: inline-block;
      }
      .right-content {
        position: absolute;
        height: 30px;
        top: 10px;
        right: 18px;

        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        line-height: 13px;
      }

      .input {
        float: right;
        margin-right: 20px;
        margin-top: 10px;
        background: transparent;
        border: 0;
        outline: 0;

        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        text-align: right;
        padding: 0 5px;
      }

      .right-arrow {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 4px;
        right: 0px;
        .arrow {
          position: absolute;
          width: 10px;
          height: 10px;
          border: 1px solid #999;
          border-width: 1px 0 0 1px;
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
          top: 8px;
          left: 7px;
        }
      }
    }

    th,
    td {
      font-size: 12px !important;
      vertical-align: middle;
    }
    td {
      color: #666666;
      line-height: 1;
      padding: 10px 0;
    }
  }
}
</style>

