<template>
  <div>
    <Header title="套餐详情"></Header>
    <group class="group">
      <cell title="输入手机号"
            isLink>
        <template>
          <input type="text"
                 v-model="phone"
                 class="weui-input"
                 placeholder=""
                 style="text-align:right;" />
        </template>
      </cell>
    </group>
    <section class="section">
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th>商品名称</th>
            <th>商品规格</th>
            <th>一口价（元）</th>
            <th>套餐价（元）</th>
            <th>服务次数</th>
            <th>剩余次数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10"
              :key="n">
            <td style="width: 20%; padding: 5px;">深度洗车精 致洗车快速 洗车镀晶打 蜡内饰清洗 四轮定位</td>
            <td>无</td>
            <td>398</td>
            <td>398</td>
            <td>398</td>
            <td>398</td>
          </tr>
        </tbody>
      </x-table>
    </section>
    <x-button @click.native="sure"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0; ">发放</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton, XTable, Group, Cell } from 'vux'
export default {
  name: 'publishFWDetail',
  components: {
    Header,
    XButton,
    XTable,
    Group,
    Cell
  },
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    sure () { }
  }
}
</script>

<style lang="less" scoped>
.group {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;
}
.section {
  position: absolute;
  top: 96px;
  bottom: 45px;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;

  th,
  td {
    font-size: 12px !important;
    vertical-align: middle;
  }
  td {
    color: #666666;
    line-height: 1.5;
    padding: 10px 0;
  }
}
</style>

