<template>
  <div>
    <Header title="发布商品"></Header>
    <section class="section">
      <group class="group">
        <cell :class="n === 3 ? 'isActive':''"
              is-link
              v-for="n in this.goodsCategoryList"
              :key="n.category_id "
              :title="n.category_name"
              @click.native="chooseClassify(n.category_id)"></cell>
      </group>
    </section>
  </div>
</template>

<script>
import { getGoodsCategoryList } from '@api'
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
      goods: require('Assets/img/logo.png'),
      goodsCategoryList: []
    }
  },
  created () {
    this.fetchGoodsCategoryList()
  },
  methods: {
    async fetchGoodsCategoryList () {
      let goodsCategoryList = await getGoodsCategoryList()
      if (goodsCategoryList && goodsCategoryList.status === 200) {
        this.goodsCategoryList = goodsCategoryList.data
      }
    },
    chooseClassify (id) {
      this.$router.push({ name: 'chooseClassify2', query: { 'category_id': id } })
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

