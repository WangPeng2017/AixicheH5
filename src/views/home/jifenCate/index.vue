<template>
  <div class="view">
    <!-- 顶部 -->
    <search-header disabled :showBack="true" :searchType="0" :left-options="{backText: ''}">
      <i slot="rbuttons" class="msgs-icon" @click="$router.push('/message')"></i>
    </search-header>

    <!-- 内容区 -->
    <div class="content">
      <my-aside :data="rootCategoryData" @change="categoryChange"></my-aside>
      <my-main :ad="subAdsData" :category="subCategoryData"></my-main>
    </div>
  </div>
</template>

<script>
  import searchHeader from '@comps/header/searchHeader'
  import myAside from './components/aside'
  import myMain from './components/main'
  import { getAdTopList, getCategoryListForLayers1, getCategoryListForLayers23 } from '@api'
  import { mapMutations } from 'vuex'
  import { SET_LOADING } from '@store/type'

  export default {
    components: {
      searchHeader,
      myAside,
      myMain
    },
    data () {
      return {
        rootCategoryData: [],
        subCategoryData: [],
        subAdsData: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      categoryChange (parentid) {
        this.loadCategoryLayer23Ads(parentid)
        this.loadCategoryLayers23List(parentid)
      },
      // 加载一级分类
      async loadCategoryLayers1List () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCategoryListForLayers1()
        this.setLoading(false)
        if (res && res.code === 200) {
          this.rootCategoryData = res.data
          if (this.rootCategoryData && this.rootCategoryData.length > 0) {
            this.loadCategoryLayers23List(this.rootCategoryData[0].category_id)
            this.loadCategoryLayer23Ads(this.rootCategoryData[0].category_id)
          }
        }
      },
      // 加载一级分类下的二级、三级分类
      async loadCategoryLayers23List (parentid) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCategoryListForLayers23(parentid)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.subCategoryData = res.data
        }
      },
      // 加载一级分类中的顶部5张广告
      async loadCategoryLayer23Ads (parentid) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getAdTopList(4, 5)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.subAdsData = res.data
        }
      }
    },
    created () {
      this.loadCategoryLayers1List()
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    // height: calc(100% - #{$default_navbar_height} - #{$default_tabbar_height});
    height: calc(100% - #{$default_navbar_height});
    display: flex;
  }

</style>
