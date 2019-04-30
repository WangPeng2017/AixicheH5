<template>
  <div>
    <Header title="套餐详情"></Header>
    <section class="section">
      <Card2 :data="data"></Card2>
      <div class="part3">
        <span class="chooseGoods"
              @click="chooseGoods">添加商品</span>
        <x-table :cell-bordered="false"
                 style="margin-top: 20px;">
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
              <td style="text-align:left;">{{item.name}}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.allmoney }}</td>
              <td>
                <input type="number"
                       v-model="item.money"
                       class="inlineInput" />
              </td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </section>
    <x-button @click.native="sure"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0; ">确认</x-button>
    <Model :show="isShowModel "
           @closeModel="closeModel ">
      <template>
        <div class="toolbox">
          <van-search show-action
                      placeholder="请输入商品名称 "
                      v-model="value "
                      style="width: 60%; float: left;padding: 0; ">
            <div slot="action"
                 style="line-height:24px;"
                 @click="onSearch">搜索</div>
          </van-search>

          <span style="border: 0;margin: 0;float:right; color: #fff;background:rgba(255,0,54,1);border-radius:3px;padding: 6px 10px;font-size: 12px; ">确定</span>
        </div>
        <div class="contentbox ">
          <x-table :cell-bordered="false ">
            <thead>
              <tr>
                <th>商品名称</th>
                <th>商品类型</th>
                <th>一口价</th>
                <th>库存</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 20 "
                  :key="n "
                  :class="n%2 ? 'active': '' ">
                <td>精致洗车</td>
                <td>商品</td>
                <td>3600.00</td>
                <td>99999</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </template>
    </Model>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Card2 from 'Common/Card2'
import Model from 'Common/Model'
import { XButton, XTable } from 'vux'
import { Search } from 'vant'
export default {
  name: 'addGoodsLYGWCard',
  components: {
    Header,
    Card2,
    XButton,
    XTable,
    Model,
    [Search.name]: Search
  },
  data () {
    return {
      data: {
        url: require('Assets/img/defaultGoods.png'),
        title: '套餐名称服务卡详测试',
        cardType: '购物卡',
        money: '3000',
        date: '2019-9-23',
        mostAddShopNum: 11,
        mostBuyNum: 11,
        mostAddGoodsNum: 11,
        discount: [5, 8],
        content:
          '360趋势是以360产品海量用户数据为基础的大数据展示平台,可通过搜 索关键词,快速获取热度趋势、理解用户真实需求、'
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
          id: 1111
        },
        {
          name:
            '精致洗车镀晶打蜡贴膜精 致洗车镀晶打蜡贴膜精致 洗车镀晶打蜡贴膜',
          type: 'SUV/MPV通用',
          allmoney: '23.00',
          money: '19.00',
          value: '',
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
      this.$router.push({ name: 'sureLYCardDetail' })
    },
    closeModel () {
      this.isShowModel = false
    },
    onSearch () { }
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
  background: #fff;

  .part3 {
    padding: 10px;
    .chooseGoods {
      display: inline-block;
      background: rgba(247, 247, 247, 1);
      padding: 5px 10px;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 0, 54, 1);
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

    .inlineInput {
      width: 32px;
      height: 16px;
      border: 1px solid rgba(217, 217, 217, 1);
      display: inline-block;
      outline: none;
      text-align: center;
    }
  }
}

.toolbox {
  overflow: hidden;
  padding: 6px 0;
}

.contentbox {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 55px;
  bottom: 10px;
  overflow-y: auto;

  .active {
    background: rgba(234, 234, 234, 1);
  }
}
</style>

