<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">全部分类</x-header>
    <div class="content">
      <group v-for="(layer1Item, index) in data"
             :key="layer1Item.category_id"
             :title="layer1Item.category_name">
        <template v-for="layer2Item in layer1Item.children">
          <cell is-link
                :key="layer2Item.category_id"
                :title="layer2Item.category_name"
                :border-intent="false"
                :arrow-direction="layer2Item.direction ? 'up' : 'down'"
                @click.native="secondClick(layer2Item)">
          </cell>
          <grid v-if="layer2Item.direction" :cols="4" :show-vertical-dividers="false" :show-lr-borders="false">
            <grid-item v-for="layer3Item in layer2Item.children"
                       class="grid-item"
                       :label="layer3Item.category_name"
                       :key="layer3Item.category_id"
                       @on-item-click="thirdClick(layer3Item)">
              <img slot="icon" :src="layer3Item.category_img">
            </grid-item>
          </grid>
        </template>
      </group>
    </div>
  </div>
</template>

<script>
  import { Cell, CellBox, Group, Grid, GridItem } from 'vux'
  import { getCategoryListForLayer123 } from '@api'
  import { mapMutations } from 'vuex'
  import {SET_LOADING} from '@store/type'

  export default {
    components: {
      Cell,
      CellBox,
      Group,
      Grid,
      GridItem
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载车型
      async loadCategoryList () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCategoryListForLayer123()
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
          this.data.map(f => {
            f.children.map(s => {
              s.direction = false
            })
          })
        }
      },
      // 二级分类点击事件
      secondClick (item) {
        item.direction = !item.direction
      },
      // 三级分类点击事件
      thirdClick (item) {
        sessionStorage.setItem('category_id', item.category_id)
        this.$router.back()
      }
    },
    created () {
      this.loadCategoryList()
    },
    activated () {
    }
  }
</script>

<style scoped>
  .weui-grids {
    margin: 20px 0;
  }
  .weui-grids:before {
    border-top: 0 !important;
  }
  .weui-grid:after {
    border-bottom: 0 !important;
  }
  .weui-grid {
    padding: 20px !important;
  }

  .grid-label {
    font-size: 24px;
  }
</style>
