<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.params.pname || '车型'}}</x-header>
    <div class="content">
      <div class="mescroll"
           id="carspec_mescroll">
        <div class="scroll">
          <group v-for="(groupItem, index) in data"
                 :key="index"
                 :title="groupItem.name">
            <cell :title="item.name"
                  v-for="item in groupItem.children"
                  :key="item.id"
                  is-link
                  @click.native="onClick(item)">
            </cell>
          </group>
        </div>
        <div id="carspec_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'
import { getCarTypeList } from '@api'
import MeScroll from 'mescroll.js'
import { mapMutations } from 'vuex'
import qs from 'qs'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    Cell,
    Group
  },
  data () {
    return {
      data: [],
      postData: {
        parent_id: this.$route.params.pid,
        keyword: null,
        page: 1,
        rows: 20,
        sord: 'desc',
        sidx: 'group_name'
      },
      meScroll: null
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载车型
    async loadCarTypes (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      let res = await getCarTypeList(qs.stringify(this.postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.data = []
        }
        this.data = [...this.data, ...res.data.list]
        let total = 0
        this.data.map(i => {
          total += i.children.length
        })
        let hasNext = (total < res.data.length)
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
          this.meScroll = new MeScroll('carspec_mescroll', {
            up: {
              callback (page) {
                self.loadCarTypes(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: 'carspec_noData',
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    },
    onClick (item) {
      sessionStorage.setItem('cartype', JSON.stringify(item))
      this.$router.go(-3)
    }
  },
  created () {
    this.initMeScroll()
  },
  activated () {
  }
}
</script>

<style lang="scss" scoped>
</style>
