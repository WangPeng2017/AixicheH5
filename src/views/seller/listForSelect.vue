<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">选择商家店铺</x-header>
    <div class="content">
      <div class="mescroll" id="shopselect_mescroll">
        <div class="scroll">
          <group>
            <cell  v-for="item in data" :key="item.id"
                   :title="item.shop_name + '(' + item.shop_distance.toFixed(1) + 'km)'"
                   :inline-desc="item.shop_address"
                   @click.native="onClick(item)">
              <img slot="icon" width="50" style="display:block;margin-right:10px;" :src="item.shop_logo" v-img-field>
            </cell>
          </group>
        </div>
        <div id="shopselect_noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  import { getSellerShopList } from '@api'
  import MeScroll from 'mescroll.js'
  import { mapMutations } from 'vuex'
  import qs from 'qs'
  import {SET_LOADING} from '@store/type'

  export default {
    components: {
      Cell,
      Group
    },
    data () {
      return {
        data: [],
        postData: {
          seller_id: this.$route.query.seller_id,
          package_id: this.$route.query.package_id,
          keyword: null,
          page: 1,
          rows: 20,
          sord: 'asc',
          sidx: 'shop_distance'
        },
        meScroll: null
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载车型
      async loadShops (page) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getSellerShopList(qs.stringify(this.postData))
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
            this.meScroll = new MeScroll('shopselect_mescroll', {
              up: {
                callback (page) {
                  self.loadShops(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: 'shopselect_noData',
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              }
            })
          }
        })
      },
      onClick (item) {
        sessionStorage.setItem('ordershop', JSON.stringify(item))
        this.$router.back()
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
