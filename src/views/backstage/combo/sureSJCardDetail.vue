<template>
  <div>
    <Header title="套餐详情"></Header>
    <section class="section">
      <Card1 :data="data"></Card1>
      <div class="part3">
        <div class="part3Title">参与商品</div>
        <!-- 服务卡  -->
        <x-table v-if="isFWCard"
                 :cell-bordered="false"
                 style="margin-top: 20px;">
          <thead>
            <tr>
              <th style="width: 25%;">商品名称</th>
              <th>规格</th>
              <th style="width: 25%;">一口价（元）</th>
              <th style="width: 25%;">套餐价（元）</th>
              <th style="width: 25%;">服务次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in choosedData"
                :key="item.id">
              <td style="text-align:left;">{{item.name}}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.allmoney }}</td>
              <td>{{ item.money }}</td>
              <td>
                <span>{{ item.value }}</span>
              </td>
            </tr>
          </tbody>
        </x-table>
        <!-- 购物卡  -->
        <x-table v-if="!isFWCard"
                 :cell-bordered="false"
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
              <td>{{ item.money }}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </section>
    <x-button @click.native="sure"
              v-if="isNewPublish"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确定</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Card1 from 'Common/Card1'
import { XTable, XButton } from 'vux'
export default {
  name: 'sureSJCardDetail',
  components: {
    Header,
    Card1,
    XTable,
    XButton
  },
  data () {
    return {
      isNewPublish: 1,
      isFWCard: sessionStorage.getItem('cardType') === 'fw',
      data: {
        url: require('Assets/img/defaultGoods.png'),
        title: '套餐名称服务卡详测试',
        cardType: '服务卡',
        money: '3000',
        date: '2019-9-23',
        content:
          '套餐简介：360趋势是以360产品海量用户数据为基础的大数据展示平台,可通过搜 索关键词,快速获取热度趋势、理解用户真实需求、'
      },
      choosedData: [
        {
          name: '精致洗车镀晶打打蜡贴膜',
          type: 'SUV/MPV通用',
          allmoney: '23.00',
          money: '19.00',
          value: '5',
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
    sure () {
      this.$router.push({ name: 'comboSJ' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'comboSJ') vm.isNewPublish = 0
    })
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
    .part3Title {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 13px;
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
</style>

