<template>
  <div class="subview">
    <div class="tab">
      <span @click="statusChange(item)"
            :class="{on: item.status}"
            v-for="item in evaluateGroupData">
        {{item.group_name}}({{item.group_num > 99 ? '99+' : item.group_num}})
      </span>
    </div>
    <div class="subcontent">
      <div class="mescroll"
           id="evaluate_mescroll">
        <div class="scroll">
          <evaluate-card v-for="item in data"
                         :data="item"
                         :key="item.evaluate_id"
                         @lightboxShow="lightboxShow"></evaluate-card>
        </div>
        <div id="evaluate_noData"></div>
      </div>
      <gallery :images="images"
               :index="index"
               @close="index = null" />
    </div>
  </div>
</template>

<script>
import evaluateCard from '@comps/card/evaluateCard'
import { getEvaluateGroupList, getEvaluateList } from '@api'
import { mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'
import MeScroll from 'mescroll.js'
import VueGallery from 'vue-gallery'
import qs from 'qs'

export default {
  components: {
    evaluateCard,
    'gallery': VueGallery
  },
  data () {
    return {
      evaluateGroupData: [],
      data: [],
      meScroll: null,
      postData: {
        goods_id: this.$route.params.id,
        status: null,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'create_time'
      },
      images: [],
      index: null
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    statusChange (item) {
      this.evaluateGroupData.map(i => {
        if (i === item) {
          i.status = true
          this.postData.group = item.group_id
        } else {
          i.status = false
        }
      })
      this.initMeScroll()
    },
    // 加载商品评论标签
    async loadEvaluateGroup () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getEvaluateGroupList(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        res.data.map((item, index) => {
          if (index === 0) {
            item.status = true
            this.postData.group = item.group_id
          } else {
            item.status = false
          }
        })
        this.evaluateGroupData = res.data
        this.initMeScroll()
      }
    },
    // 加载商品评论
    async loadEvaluates (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      let res = await getEvaluateList(qs.stringify(this.postData))
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
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('evaluate_mescroll', {
            up: {
              callback (page) {
                self.loadEvaluates(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: 'evaluate_noData',
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    },
    lightboxShow (data) {
      this.images = data.images
      this.index = data.index
    }
  },
  created () {
    this.loadEvaluateGroup()
  },
  activated () {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.tab {
  padding: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: $default_toolbar_height;
  line-height: $default_toolbar_height;
  vertical-align: middle;
  border-bottom: 1px solid $default_border_color;
  span {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    font-size: $default_middlefont_size;
    color: $default_subtitle_color;
    text-align: center;
    background-color: $default_border_color;
    margin-right: 20px;
    &.on {
      color: #fff;
      background-color: $default_red_color;
    }
  }
}
</style>
