<template>
  <div>
    <Header title="发布商品"></Header>
    <section class="section">
      <group class="group">
        <cell title="滋补保健"
              @click.native="chooseClassify"
              :class="n === 3 ? 'isActive':''"
              is-link
              v-for="n in 10 "
              :key="n "></cell>
      </group>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell } from 'vux'
export default {
  name: 'PublishGoods',
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
    chooseClassify (id) {
      this.$router.push({ name: 'chooseClassify3' })
    }
  }
}
</script>

<style lang="less" scoped>
.group {
  .isActive {
    background: rgba(239, 239, 239, 1);
  }
}
.section {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>

