<template>
  <div>
    <Header title="会员列表"></Header>
    <div class="toolbox">
      <van-search show-action
                  placeholder="套餐名称，手机号"
                  v-model="value"
                  class="search"
                  style="padding:0;">
        <div slot="action"
             style="line-height:24px;"
             @click="onSearch">搜索</div>
      </van-search>
      <div class="right"
           @click="setType">
        <span>{{ type[0] }}</span>
        <img :src="arrow"
             alt="" />
      </div>
      <popup-picker title="选择卡种"
                    :data="typeData"
                    v-model="type"
                    :show.sync="showPopupPicker"
                    placeholder="请选择卡种"
                    style="display:none;"></popup-picker>
    </div>
    <section class="section">
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th>会员账号</th>
            <th>会员名称</th>
            <th>加入方式</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10"
              :key="n">
            <td>15678445699</td>
            <td>略略略</td>
            <td>发放进入</td>
          </tr>
        </tbody>
      </x-table>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XTable, PopupPicker } from 'vux'
import { Search } from 'vant'
export default {
  name: 'hyList',
  components: {
    Header,
    XTable,
    PopupPicker,
    [Search.name]: Search
  },
  data () {
    return {
      value: '',
      data: {
        url: require('Assets/img/defaultGoods.png'),
        title: '套餐名称服务卡详测试',
        cardType: '服务卡',
        money: '3000',
        date: '2019-9-23',
        content:
          '套餐简介：360趋势是以360产品海量用户数据为基础的大数据展示平台,可通过搜 索关键词,快速获取热度趋势、理解用户真实需求、'
      },
      showPopupPicker: false,
      type: ['全部'],
      typeData: [['全部', '发放进入', '充值进入']],
      arrow: require('Assets/img/arrow.png')
    }
  },
  methods: {
    setType () {
      this.showPopupPicker = true
    },
    onSearch () { }
  }
}
</script>

<style lang="less" scoped>
.toolbox {
  padding: 5px;
  position: absolute;
  top: 45px;
  width: 100%;
  box-sizing: border-box;
  .search {
    width: 60%;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 0;

    /deep/ .van-search__content {
      background: #fff !important;
    }
  }
  .right {
    position: absolute;
    right: 10px;
    background: #fff;
    width: 80px;
    height: 24px;
    line-height: 24px;
    padding-left: 5px;
    top: 10px;
    font-size: 14px;

    img {
      width: 7px;
      float: right;
      margin: 10px 10px 0 0;
    }
  }
}
.section {
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;
}
</style>

