<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">商品收藏
      <span
        @click="editChange"
        slot="right">{{ edit ? '完成' : '编辑' }}</span>
    </x-header>
    <div class="content" :class="{'edit-content': edit}">
      <div class="mescroll" id="collectgoods_mescroll">
        <div class="scroll">
          <goods-card v-for="item in data" :key="item.goods_id" :data="item" :type="true" :edit="edit" @selectChange="selectChange"></goods-card>
        </div>
        <div id="collectgoods_noData"></div>
      </div>
    </div>
    <fixed-bot-btn @click="cancelCollect" v-if="edit">取消收藏</fixed-bot-btn>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import goodsCard from '@comps/card/goodsCard/collect'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import { getCollectionGoodsList, cancelCollection } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  import qs from 'qs'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      goodsCard,
      XHeader,
      fixedBotBtn
    },
    data () {
      return {
        data: [],
        selectIdSet: new Set(),
        selectIdData: [],
        postData: {
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'create_time'
        },
        meScroll: null,
        edit: false
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      async loadMyCollectionGoods (page) {
        this.postData.page = page.num
        this.postData.rows = page.size
        this.postData.longitude = this.longitude || 0
        this.postData.latitude = this.latitude || 0

        let res = await getCollectionGoodsList(qs.stringify(this.postData))
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data = []
          }
          res.data.list.map(i => {
            i.status = false
          })
          this.data = [
            ...this.data,
            ...res.data.list
          ]
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
            return
          }

          this.meScroll = new MeScroll('collectgoods_mescroll', {
            up: {
              callback (page) {
                self.loadMyCollectionGoods(page)
              },
              noMoreSize: 10,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `collectgoods_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        })
      },
      async editChange () {
        this.edit = !this.edit
        this.data.map(i => {
          i.status = false
        })
        this.selectIdSet.clear()
        this.selectIdData = []
      },
      async selectChange (item) {
        if (item.status) {
          if (this.selectIdSet.has(item.goods_id)) return
          this.selectIdSet.add(item.goods_id)
        } else {
          if (!this.selectIdSet.has(item.goods_id)) return
          this.selectIdSet.delete(item.goods_id)
        }
        this.selectIdData = []
        for (let i of this.selectIdSet) {
          this.selectIdData.push(i)
        }
      },
      async cancelCollect () {
        if (this.selectIdData.length <= 0) {
          this.$toasted.show('请先选择收藏的商品！')
          return
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await cancelCollection(qs.stringify({
          idList: this.selectIdData,
          collection_type: 1
        }))
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show(res.msg)
          this.editChange()
          this.initMeScroll()
        }
      }
    },
    created () {
      this.initMeScroll()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";
  .edit-content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height}) !important;
  }
</style>
