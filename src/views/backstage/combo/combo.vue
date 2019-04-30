<template>
  <div>
    <Header title="套餐"></Header>
    <section class="section">
      <group class="group">
        <cell title="商家套餐"
              is-link
              @click.native="handleClick(0)"></cell>
        <cell title="联营套餐"
              is-link
              @click.native="handleClick(1)"></cell>
      </group>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell } from 'vux'
export default {
  name: 'Combo',
  components: {
    Header,
    Group,
    Cell
  },
  data () {
    return {
      results: [],
      value: '',
      placeholder: '输入商品名称',
      goods: require('Assets/img/logo.png')
    }
  },
  methods: {
    handleClick (index) {
      if (index === 0) {
        // 商家套餐
        this.$router.push({ name: 'comboSJ' })
      } else {
        // 联营套餐
        this.$router.push({ name: 'comboLY' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>

