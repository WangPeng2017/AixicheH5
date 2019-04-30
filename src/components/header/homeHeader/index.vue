<template>
  <!--头部-->
  <header class="header">
    <a href="javascript:void(0);" class="search-conent" @click="gotoSearch">
      <mySearch disabled :placeholder="'搜索您想要的商品、店铺、套餐'"></mySearch>
    </a>
    <i class="msg-icon" @click="$router.push('/message')"></i>
    <div class="back"></div>
  </header>
</template>

<script>
  import mySearch from '@comps/search'
  import {mapState} from 'vuex'
  export default {
    components: {
      mySearch
    },
    computed: {
      ...mapState(['city'])
    },
    data () {
      return {
        cityName: ''
      }
    },
    methods: {
      gotoSearch () {
        this.$router.push('/search')
      }
    },
    activated () {
      this.cityName = this.city || '全国'
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .header {
    padding: 0 20px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $default_navbar_height;
    line-height: $default_navbar_height;
    transform: translateZ(0);
    .back {
      content: '';
      width: 100%;
      height: $default_navbar_height;
      line-height: $default_navbar_height;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #666;
      z-index: -1;
      opacity: 0;
    }
    .search-conent {
      flex: 1;
      margin: 0 20px;
      margin-left: 10px;
      color: $default_font_placeholdercolor;
    }
    .city {
      font-style: normal;
      color: #fff;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: $default_font_placeholdercolor;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: $default_font_placeholdercolor;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: $default_font_placeholdercolor;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: $default_font_placeholdercolor;
    }
  }
</style>

<style lang="scss">
  .msg-icon {
    margin-top: 4px;
  }
</style>
