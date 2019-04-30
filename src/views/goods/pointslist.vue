<template>
  <div class="view">
    <search-header disabled
                   :keyword="postData.keyword"
                   :replace="true"
                   :searchType="0">
      <i slot="rbuttons"
         class="msgs-icon"
         @click="$router.push('/message')"></i>
    </search-header>
    <data-sort :data="sortData"
               :enableSwitch="true"
               :enableFilter="true"
               :display="display"
               @filter="$refs.filter.show()"
               @sortChange="sortChange"
               @switchChange="displayChange"></data-sort>
    <div class="content">
      <div class="mescroll"
           :id="`mescroll`+ this.$route.params.id">
        <div class="scroll">
          <goods-card v-for="item in data"
                      :key="item.goods_no"
                      :data="item"
                      :type="display"></goods-card>
        </div>
        <div :id="'noData' + this.$route.params.id"></div>
      </div>
    </div>
    <data-filter :data="filterData"
                 ref="filter"
                 @filter="filter"
                 @showCategoryPicker="$refs.catPicker.show()"></data-filter>
    <category-picker :data="categoryData"
                     ref="catPicker"
                     @change="categoryPickerChange"></category-picker>
  </div>
</template>

<script>
import searchHeader from '@comps/header/searchHeader'
import dataSort from '@comps/dataSort'
import dataFilter from '@comps/dataFilter'
import categoryPicker from '@comps/picker/categoryPicker'
import goodsCard from '@comps/card/goodsCard/jifengoodscard.vue'
import { getGoodsListFilters, getGoodsPointsList, getCategoryListForLayer123 } from '@api'
import { mapState, mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import MeScroll from 'mescroll.js'

export default {
  components: {
    searchHeader,
    dataSort,
    dataFilter,
    categoryPicker,
    goodsCard
  },
  data () {
    return {
      sortData: [
        {
          type: 1,
          name: '距离',
          status: true,
          isUp: true,
          list: [
            { status: false, sidx: 'other', title: '综合', sord: 'desc' },
            { status: false, sidx: 'create_time', title: '新品', sord: 'desc' },
            { status: true, sidx: 'seller_distance', title: '距离', sord: 'asc' },
            { status: false, sidx: 'goods_evaluationnum', title: '评价', sord: 'desc' }
          ]
        }, {
          type: 2,
          name: '销量',
          status: false,
          isUp: false,
          list: [
            { status: false, sidx: 'goods_salenum', title: '销量从高到低', sord: 'desc' }
          ]
        }, {
          type: 3,
          name: '价格',
          status: false,
          isUp: true,
          list: [
            { status: false, sidx: 'goods_saleprice', title: '价格从低到高', sord: 'asc' },
            { status: false, sidx: 'goods_saleprice', title: '价格从高到低', sord: 'desc' }
          ]
        }
      ],
      filterData: {
        pricelist: [],
        brandlist: [],
        attrlist: [],
        minprice: '',
        maxprice: '',
        categoryModel: {
          category_id: this.$route.query.cid || 0,    // 分类id
          category_name: '全部',    // 分类名称
          origin_category_id: this.$route.query.cid || 0,    // 分类id
          origin_category_name: '全部'    // 分类名称
        }
      },
      postData: {
        a: this.$route.query.a,
        category_id: this.$route.query.cid || 0,    // 分类id
        keyword: (this.$route.query.a === 'search' ? this.$route.query.keyword : ''),
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'seller_distance'
      },
      data: [],
      categoryData: [],
      display: true,
      meScroll: null
    }
  },
  computed: {
    ...mapState(['longitude', 'latitude', 'user'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载分类列表
    async loadCategoryList () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getCategoryListForLayer123()
      this.setLoading(false)
      if (res && res.code === 200) {
        // 初始化分类选择器状态
        res.data.map(f => {
          f.children.map(s => {
            s.direction = false
            s.children.map(t => {
              if (this.postData.category_id === t.category_id) {
                this.filterData.categoryModel.category_name = t.category_name
                this.filterData.categoryModel.origin_category_name = t.category_name
                t.status = true
              } else {
                t.status = false
              }
            })
          })
        })
        this.categoryData = res.data
      }
    },
    // 加载商品列表
    async loadGoods (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      this.postData.longitude = this.longitude || 0
      this.postData.latitude = this.latitude || 0
      let res = await getGoodsPointsList(qs.stringify(this.postData))
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
      let res = await getGoodsListFilters(qs.stringify(this.postData))
      if (res && res.code === 200) {
        res.data.pricelist.map(price => {
          this.$set(price, 'status', false)
        })
        res.data.brandlist.map(brand => {
          this.$set(brand, 'collapse', true)
          this.$set(brand, 'valueexp', '不限')
          this.$set(brand, 'valuemap', new Map())
          this.$set(brand, 'maxselect', 5)
          brand.values.map(value => {
            this.$set(value, 'status', false)
          })
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
          brandlist: res.data.brandlist,
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
          this.meScroll = new MeScroll('mescroll' + this.$route.params.id, {
            up: {
              callback (page) {
                self.loadGoods(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `noData` + this.$route.params.id,
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
    // 显示方式切换
    displayChange () {
      this.display = !this.display
    },
    categoryPickerChange (item) {
      this.filterData.categoryModel.category_id = item.category_id
      this.filterData.categoryModel.category_name = item.category_name
    },
    // 筛选商品
    filter () {
      // 价格条件
      let minprice = null
      let maxprice = null
      if (this.filterData.pricelist && this.filterData.pricelist.length > 0) {
        this.filterData.pricelist.map(obj => {
          if (obj.status) {
            let [min, max] = obj.name.split('-')
            minprice = min
            maxprice = max
          }
        })
      } else {
        minprice = this.filterData.minprice
        maxprice = this.filterData.maxprice
      }

      // 品牌条件
      let brandidlist = []
      this.filterData.brandlist.map(obj => {
        obj.values.map(value => {
          if (value.status) {
            brandidlist.push(value.id)
          }
        })
      })

      // 筛选属性条件
      let attrlist = []
      this.filterData.attrlist.map(obj => {
        obj.values.map(value => {
          if (value.status) {
            attrlist.push({
              attr_id: obj.id,
              attr_value: value.id
            })
          }
        })
      })

      let categoryid = this.filterData.categoryModel.category_id
      // let categoryname = this.filterData.categoryModel.category_name

      let needUpdateFilter = (categoryid !== this.filterData.categoryModel.origin_category_id)
      // this.filterData.categoryModel.origin_category_id = categoryid
      // this.filterData.categoryModel.origin_category_name = categoryname

      this.postData.page = 1
      this.postData = {
        ...this.postData,
        category_id: categoryid,
        minprice: minprice,
        maxprice: maxprice,
        brandidlist: brandidlist,
        attrlist: attrlist
      }

      this.data = []
      this.meScroll.resetUpScroll()
      if (needUpdateFilter) {
        this.loadFilter()
      }
    }
  },
  created () {
    this.initMeScroll()
    this.loadFilter()
    this.loadCategoryList()
  },
  activated () {

  },
  deactivated () {

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.content {
  height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
}
button {
  position: fixed;
  top: 80%;
  right: 50px;
  width: 120px;
  height: 120px;
  font-size: 30px;
  color: #fff;
  border-radius: 50%;
  border: 0;
  background-color: #ff0036;
}
</style>
