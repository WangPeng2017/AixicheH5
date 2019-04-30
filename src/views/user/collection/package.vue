<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">套餐收藏
      <span
        @click="editChange"
        slot="right">{{ edit ? '完成' : '编辑' }}</span>
    </x-header>
    <div class="content" :class="{'edit-content': edit}">
      <div class="mescroll" id="collectpackage_mescroll">
        <div class="scroll">
          <package-card v-for="item in data" :key="item.package_id" :data="item" :type="true" :edit="edit" @selectChange="selectChange"></package-card>
        </div>
        <div id="collectpackage_noData"></div>
      </div>
    </div>
    <fixed-bot-btn @click="cancelCollect" v-if="edit">取消收藏</fixed-bot-btn>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import packageCard from '@comps/card/packageCard/collect'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import { getCollectionPackageList, cancelCollection } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  import qs from 'qs'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      XHeader,
      packageCard,
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
      async loadMyCollectionPackage (page) {
        this.postData.page = page.num
        this.postData.rows = page.size

        let res = await getCollectionPackageList(qs.stringify(this.postData))
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

          this.meScroll = new MeScroll('collectpackage_mescroll', {
            up: {
              callback (page) {
                self.loadMyCollectionPackage(page)
              },
              noMoreSize: 10,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `collectpackage_noData`,
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
          if (this.selectIdSet.has(item.package_id)) return
          this.selectIdSet.add(item.package_id)
        } else {
          if (!this.selectIdSet.has(item.package_id)) return
          this.selectIdSet.delete(item.package_id)
        }
        this.selectIdData = []
        for (let i of this.selectIdSet) {
          this.selectIdData.push(i)
        }
      },
      async cancelCollect () {
        if (this.selectIdData.length <= 0) {
          this.$toasted.show('请先选择收藏的套餐！')
          return
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await cancelCollection(qs.stringify({
          idList: this.selectIdData,
          collection_type: 3
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
