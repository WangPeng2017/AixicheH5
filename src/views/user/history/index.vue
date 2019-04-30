<template>
  <div class="history-view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">浏览记录</x-header>
    <div class="mescroll" id="userhistory_mescroll">
      <div class="scroll">
        <item v-for="item in data" :key="item.goods_id" :data="item"></item>
      </div>
      <div id="userhistory_noData"></div>
    </div>
  </div>
</template>

<script>
  import { getBrowseList } from '@api'
  import item from './components/item.vue'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      item
    },
    data () {
      return {
        page: 1,
        data: []
      }
    },
    methods: {
      async infiniteHandler (page) {
        let res = await getBrowseList(page.num)
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data.length = 0
          }
          this.data = [...this.data, ...res.data.goodslist]

          let hasNext = (this.data.length < res.data.length)
          this.meScroll.endSuccess(res.data.length, hasNext)
        } else {
          this.meScroll.endErr()
        }
      },
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          this.meScroll = new MeScroll('userhistory_mescroll', {
            up: {
              callback (page) {
                self.infiniteHandler(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `userhistory_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        })
      }
    },
    created () {
      this.initMeScroll()
    }
  }
</script>

<style lang="scss" scoped>
  .mescroll {
    width: 100%;
    height: auto;
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
  }
</style>
