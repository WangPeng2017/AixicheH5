<template>
  <div class="view">
    <search-header disabled :keyword="postData.keyword" :replace="true" :searchType="2">
      <i slot="rbuttons" class="msgs-icon" @click="$router.push('/message')"></i>
    </search-header>
    <data-sort :data="sortData" :enableSwitch="true" :enableFilter="true" :display="display" @filter="$refs.filter.show()" @sortChange="sortChange" @switchChange="changeDisplay"></data-sort>
    <div class="content">
      <div class="mescroll" id="package_mescroll">
        <div class="scroll">
          <package-card v-for="item in data" :key="item.package_id" :data="item" :type="display"></package-card>
        </div>
        <div id="package_noData"></div>
      </div>
    </div>
    <data-filter :data="filterData" ref="filter" @filter="filter"></data-filter>
  </div>
</template>

<script>
  import searchHeader from '@comps/header/searchHeader'
  import dataSort from '@comps/dataSort'
  import dataFilter from '@comps/dataFilter'
  import packageCard from '@comps/card/packageCard'
  import { getPackageListFilters, getPackageList } from '@api'
  import { mapMutations } from 'vuex'
  import {SET_LOADING} from '@store/type'
  import qs from 'qs'
  import MeScroll from 'mescroll.js'

  export default {
    components: {
      searchHeader,
      dataSort,
      dataFilter,
      packageCard
    },
    data () {
      return {
        sortData: [
          {
            type: 1,
            name: '综合',
            status: true,
            isUp: true,
            list: [
              {status: true, sidx: 'other', title: '综合', sord: 'desc'},
              {status: false, sidx: 'create_time', title: '新品', sord: 'desc'}
            ]
          }, {
            type: 2,
            name: '销量',
            status: false,
            isUp: false,
            list: [
              {status: false, sidx: 'salesnum', title: '销量从高到低', sord: 'desc'}
            ]
          }, {
            type: 3,
            name: '价格',
            status: false,
            isUp: true,
            list: [
              {status: false, sidx: 'package_price', title: '价格从低到高', sord: 'asc'},
              {status: false, sidx: 'package_price', title: '价格从高到低', sord: 'desc'}
            ]
          }
        ],
        filterData: {
          pricelist: [],
          minprice: '',
          maxprice: '',
          attrlist: []
        },
        postData: {
          a: this.$route.query.a,
          keyword: (this.$route.query.a === 'search' ? this.$route.query.keyword : ''),
          page: 1,
          rows: 10,
          sord: 'desc',
          sidx: 'other'
        },
        data: [],
        display: true,
        meScroll: null
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载套餐列表
      async loadPackages (page) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getPackageList(qs.stringify(this.postData))
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
      // 加载筛选条件
      async loadFilter () {
        let self = this
        let res = await getPackageListFilters(self.postData.category_id)
        if (res && res.code === 200) {
          res.data.pricelist.map(price => {
            this.$set(price, 'status', false)
          })

          res.data.attrlist.map(attr => {
            this.$set(attr, 'collapse', true)
            this.$set(attr, 'valueexp', '不限')
            this.$set(attr, 'valuemap', new Map())
            this.$set(attr, 'maxselect', 5)
            attr.values.map(value => {
              this.$set(value, 'status', false)
            })
          })

          this.filterData = {
            ...this.filterData,
            pricelist: res.data.pricelist,
            attrlist: res.data.attrlist
          }
        }
      },
      // 初始化滚动区
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          if (this.meScroll) {
            this.meScroll.resetUpScroll()
          } else {
            this.meScroll = new MeScroll('package_mescroll', {
              up: {
                callback (page) {
                  self.loadPackages(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
                empty: {
                  warpId: `package_noData`,
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              }
            })
          }
        })
      },
      // 排序商品
      sortChange (data) {
        this.postData.sord = data.sord
        this.postData.sidx = data.sidx
        this.filter()
      },
      // 筛选商品
      filter () {
        // 价格条件
        let minprice = this.filterData.minprice
        let maxprice = this.filterData.maxprice
        if (this.filterData.pricelist && this.filterData.pricelist.length > 0) {
          this.filterData.pricelist.map(obj => {
            if (obj.status) {
              let [min, max] = obj.name.split('-')
              minprice = min
              maxprice = max
            }
          })
        }

        let packagetypelist = []
        let consumptiontypeslist = []
        this.filterData.attrlist.map(attr => {
          attr.values.map(value => {
            if (value.status) {
              if (attr.id === 1) {
                // 套餐类型
                packagetypelist.push(value.id)
              } else if (attr.id === 2) {
                // 卡种
                consumptiontypeslist.push(value.id)
              }
            }
          })
        })
        this.postData.page = 1
        this.postData = {
          ...this.postData,
          minprice: minprice,
          maxprice: maxprice,
          package_typelist: packagetypelist,
          consumption_typeslist: consumptiontypeslist
        }
        this.data = []
        this.meScroll.resetUpScroll()
      },
      // 切换商品显示模式
      changeDisplay () {
        this.display = !this.display
      }
    },
    created () {
      this.initMeScroll()
      this.loadFilter()
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }
</style>
