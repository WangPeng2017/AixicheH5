<template>
  <div class="subview">
    <tab :scroll-threshold="3"
         :line-width="0"
         slot="overwrite-title"
         active-color="#f15353"
         bar-active-color="#f15353">
      <tab-item v-for="(item, index) in tabData"
                :key="index"
                :selected="index===tabIndex"
                @on-item-click="tabChanged">{{item}}</tab-item>
    </tab>
    <div class="subcontent">
      <div class="container"
           v-html="mobiledesc"
           v-show="tabIndex === 0"></div>
      <div class="container"
           v-show="tabIndex === 1">
        <x-table full-bordered
                 class="paramContent"
                 v-for="(item, index) in paramData"
                 :key="index">
          <thead v-if="item.section.length>0">
            <tr>
              <th colspan="2"
                  class="section">{{item.section}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="parm in item.parms">
              <td>{{ parm.name }}</td>
              <td>{{ parm.value}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
      <div class="container"
           v-for="item in otherData"
           v-show="tabIndex === 2">
        <divider>{{item.name}}</divider>
        <div class="dividerContent">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsPointsMobileDesc, getGoodsPointsParamDesc, getGoodsPointsOtherDesc } from '@api'
import { mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'
import { Divider, Tab, TabItem, XTable } from 'vux'

import tabNav from '@comps/nav/tabNav'
export default {
  components: {
    tabNav,
    Divider,
    Tab,
    TabItem,
    XTable
  },
  data () {
    return {
      tabIndex: 0,
      tabData: ['商品介绍', '产品参数', '包装售后'],
      mobiledesc: '',
      paramData: [],
      otherData: []
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 选项卡切换
    tabChanged (index) {
      this.tabIndex = index
    },
    // 加载商品详细
    async loadDesc () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getGoodsPointsMobileDesc(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.mobiledesc = res.data
      }
    },
    // 加载产品参数
    async loadParam () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getGoodsPointsParamDesc(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.paramData = res.data
      }
    },
    // 加载售后
    async loadOther () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getGoodsPointsOtherDesc(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.otherData = res.data
      }
    },
    // 初始化选项卡导航
    initTab () {
      this.tabChanged(0)
    }
  },
  created () {
    this.loadDesc()
    this.loadParam()
    this.loadOther()
  },
  mounted () {
    this.initTab()
  },
  activated () {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.container {
  padding: 20px;
  background-color: #fff;
}

.dividerContent {
  width: 100%;
  margin-top: 10px;
  font-size: $default_middlefont_size;
  text-align: left;
}

.paramContent {
  tr {
    td {
      padding-left: 20px;
      text-align: left;
      vertical-align: middle;
      font-size: $default_middlefont_size;
      &:first-child {
        width: 200px;
        padding-left: 0;
        text-align: center;
      }
    }
    .section {
      font-weight: bold;
    }
  }
}
</style>
