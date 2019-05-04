<template>
  <div>
    <Header title="发布商品"></Header>
    <section class="section">
      <group class="group">
        <cell :class="n === 3 ? 'isActive':''"
              is-link
              v-for="n in 10 "
              :key="n "
              title="滋补保健"
              @click.native="chooseClassify"></cell>
      </group>
    </section>
  </div>
</template>

<script>
import { getFormJson } from '@api'
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
      goodsList: []
    }
  },
  created () {
    this.fetchFormJson()
  },
  methods: {
    async fetchFormJson () {
      let goodsList = await getFormJson(this.$route.query.goodsID)
      if (goodsList && goodsList.status === 200) {
        this.goodsList = goodsList.data
        console.log(goodsList)
      }
    },
    chooseClassify (id) {
      this.$router.push({ name: 'addGoods', query: { keyValue: id } })
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

