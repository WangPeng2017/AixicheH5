<template>
  <div>
    <Header title="发布商品"></Header>
    <section class="section"
             v-if="isGetData && goodsBrandList.length">
      <group class="group">
        <cell :class="n === 3 ? 'isActive':''"
              is-link
              v-for="n in this.goodsBrandList "
              :key="n.id"
              :title="n.name"
              @click.native="chooseClassify(n.id)"></cell>
      </group>
    </section>
    <section class="section"
             v-if="isGetData && !goodsBrandList.length">
      <group class="group">
        <cell title="暂无数据"></cell>
      </group>
    </section>
  </div>
</template>

<script>
import { getGoodsBrandList } from '@api'
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
      isGetData: false,
      goodsBrandList: []
    }
  },
  created () {
    this.fetchGoodsBrandList()
  },
  methods: {
    async fetchGoodsBrandList () {
      let goodsBrandList = await getGoodsBrandList(this.$route.query.category_id)
      if (goodsBrandList && goodsBrandList.status === 200) {
        this.isGetData = true
        this.goodsBrandList = goodsBrandList.data
      }
    },
    chooseClassify (id) {
      this.$router.push({ name: 'chooseClassify3', query: { 'goodsID': id } })
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

