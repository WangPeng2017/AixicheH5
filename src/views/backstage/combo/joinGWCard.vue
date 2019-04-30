<template>
  <div>
    <Header title="套餐详情"></Header>
    <section class="section">
      <div class="part1">
        <img :src="defaultGoods"
             alt="">
        <p class="name">套餐名称购物卡详测试</p>
        <p class="type">( 购物卡 )</p>
      </div>

      <div class="part2">
        <p>
          <span>套餐金额：￥3000.00</span>
          <span>有效期：2019-9-23</span>
        </p>
        <p>
          <span>最多参与商家数：不限制</span>
          <span>用户限购数：不限制</span>
        </p>
        <p>
          商家最多参与商品数不限制
        </p>
        <p>
          套餐商品价折扣要求
          <i>0.0</i>折—
          <i>0.0</i>折
        </p>
      </div>
      <div class="part3">
        <p>套餐简介：360趋势是以360产品海量用户数据为基础的大数据展示平台,可通 过搜索关键词,快速获取热度趋势、理解用户真实需求、</p>
      </div>
    </section>
    <x-button @click.native="joinIn"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">立即加入</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell, XButton } from 'vux'
export default {
  name: 'Combo',
  components: {
    Header,
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      results: [],
      value: '',
      placeholder: '输入商品名称',
      defaultGoods: require('Assets/img/defaultGoods.png')
    }
  },
  methods: {
    joinIn () {
      this.$router.push({ name: 'addGoodsLYGWCard' })
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

  .part1 {
    padding: 12px 20px;
    img {
      width: 100%;
      height: 160px;
    }
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin: 10px 0;
    }
    .type {
      color: rgba(255, 0, 54, 1);
      margin-bottom: 0px;
    }
  }

  .part2 {
    padding: 10px 20px;
    border-top: 5px solid #f6f6f6;
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 10px;
    }

    p:nth-of-type(1),
    p:nth-of-type(2) {
      span:nth-of-type(1) {
        display: inline-block;
        width: 50%;
      }
    }
  }

  .part3 {
    padding: 10px 20px;
    border-top: 5px solid #f6f6f6;
    p {
      font-size: 9px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 1.5;
    }
  }
}
</style>

