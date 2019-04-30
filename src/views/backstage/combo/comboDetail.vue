<template>
  <div>
    <Header :title="isGWCard ? '发放详情':'套餐详情'"></Header>
    <section class="section"
             :style="isGWCard ? {left: '10px', right: '10px'}:{}">
      <div class="box"
           v-if="!isGWCard">
        <div class="title">会员账号：15978445619</div>
        <x-table :cell-bordered="false"
                 :content-bordered="false">
          <tbody>
            <tr v-for="n in 10"
                :key="n">
              <td style="text-align:left; padding-left: 10px;">精致洗车</td>
              <td>已使用4次</td>
              <td>余4次</td>
            </tr>
          </tbody>
        </x-table>
      </div>

      <div class="box">
        <p>会员账号：15978445619</p>
        <p>套餐名称：联营套餐测试卡购买无效商家套餐服务卡</p>
        <p>类型：购物卡</p>
        <p>套餐金额：总价3600 剩余1800</p>
        <p>是否过期：是</p>
        <p>发放时间：2019-5-13 12:23:36</p>
      </div>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XTable } from 'vux'
export default {
  name: 'comboDetail',
  components: {
    Header,
    XTable
  },
  data () {
    return {
      isGWCard: sessionStorage.getItem('cardType') === 'gw'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 55px;
  bottom: 0;
  left: 20px;
  right: 20px;
  overflow: auto;

  .box {
    background: #fff;
    padding: 10px 0;
    .title {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 13px;
      padding: 10px;
    }

    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      padding: 5px 10px;
    }
  }
}
</style>

