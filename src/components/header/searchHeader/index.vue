<template>
  <!--头部-->
  <x-header class="vux-search-header"
            :left-options="{backText: '', showBack: showBack}">
    <div class="vux-header-title"
         slot="overwrite-title">
      <a href="javascript:void(0);"
         class="search-conent"
         @click="gotoSearch">
        <mySearch :disabled="disabled"
                  :placeholder="'搜索您想要的商品、店铺、套餐'"
                  :backColor="'rgb(247,247,247,1)'"
                  :value="keyword"
                  @enter="handleEnter"
                  @input="handleChange"
                  ref="searchInput"></mySearch>
      </a>
    </div>
    <a v-if="!disabled"
       class="search-button"
       href="javascript:void(0);"
       slot="right"
       @click="enterSearch">搜索</a>
    <!-- <i v-if="disabled" class="msgs-icon" slot="right" @click="$router.push('/message')"></i> -->
  </x-header>
</template>

<script>
import mySearch from '@comps/search'
import $ from 'jquery'
export default {
  name: 'searchHeader',
  components: {
    mySearch
  },
  props: {
    showBack: {
      type: Boolean,
      default: true
    },
    keyword: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    searchType: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 返回
    back () {
      this.$router.back()
    },
    handleEnter (ev) {
      this.$emit('enter', ev)
    },
    handleChange (ev) {
      this.$emit('input', ev)
    },
    // 回车或点击搜索
    enterSearch () {
      this.$emit('search')
    },
    getVal () {
      return this.$refs.searchInput.getVal()
    },
    gotoSearch () {
      if (!this.disabled) {
        return
      }

      if (this.replace) {
        this.$router.replace({
          path: '/search',
          query: {
            tab: this.searchType
          }
        })
      } else {
        this.$router.push({
          path: '/search',
          query: {
            tab: this.searchType
          }
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.showBack) {
        $('.vux-header-title').parent().addClass('vux-header-title-box')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.search-button {
  margin-right: -10px !important;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: $default_font_placeholdercolor;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: $default_font_placeholdercolor;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: $default_font_placeholdercolor;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: $default_font_placeholdercolor;
}
</style>

<style lang="scss">
.vux-search-header {
  .vux-header-title-area {
    margin: 0 88px !important;
  }
  .vux-header-title {
    margin: 0 !important;
    font-size: 32px !important;
  }

  .vux-header-title-box {
    margin-left: 30px !important;
  }

  .vux-header .vux-header-right {
    right: 0.35rem !important;
    top: 24px !important;
  }
}
</style>
