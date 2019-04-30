<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.query.title}}</x-header>
    <div class="content">
      <div class="mescroll"
           id="message_mescroll">
        <div class="scroll">
          <item v-for="item in data"
                :key="item.messageid"
                :data="item"></item>
        </div>
        <div id="message_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import item from './components/item.vue'
import { getMessageList } from '@api'
import { mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import MeScroll from 'mescroll.js'

export default {
  components: {
    XHeader,
    item
  },
  data () {
    return {
      meScroll: null,
      data: [],
      postData: {
        category_id: this.$route.params.id,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'create_time'
      }
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载套餐列表
    async loadMessages (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      let res = await getMessageList(qs.stringify(this.postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.data = []
        }

        this.data = [...this.data, ...res.data.list]
        let hasNext = (this.data.length < res.data.length)
        this.meScroll.endSuccess(res.data.length, hasNext)
      } else {
        this.meScroll.endErr()
      }
    },
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('message_mescroll', {
            up: {
              callback (page) {
                self.loadMessages(page)
              },
              noMoreSize: 10,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `message_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    }
  },
  created () {
    this.initMeScroll()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
</style>
