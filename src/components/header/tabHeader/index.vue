<template>
  <header class="header">
    <i class="left-icon" @click="back()" v-if="showBack"></i>
    <div class="center">
      <a href="javascript:void(0)" :class="{'active': item.status}" @click="tabChanged(item)" v-for="item in data">{{item.text}}</a>
    </div>
    <i></i>
  </header>
</template>

<script>
  import tabNav from '@comps/nav/tabNav'
  export default {
    name: 'tabHeader',
    components: {
      tabNav
    },
    props: {
      showBack: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array
      }
    },
    methods: {
      tabChanged (item) {
        if (item.status) {
          return
        }
        this.data.map(i => {
          i.status = false
        })
        item.status = true
        this.$emit('tabChanged', item)
      },
      // 返回
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .header {
    width: 100%;
    background-color: #fff;
    color: $default_navtitle_color;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    border-bottom: 1px solid $default_border_color;
    i {
      margin: 0 6px;
      height: auto !important;
    }
    .center {
      height: 100%;
      display: inline-flex;
      margin: 0 100px;
      flex: 0 1 80%;
      a {
        height: $default_navbar_height;
        line-height: $default_navbar_height;
        flex: 1;
        text-align: center;
        font-size: $default_font_size;
        color: $default_navtitle_color;
        &.active {
          font-weight: bold;
          height: calc(100% - 4px);
          border-bottom: 4px solid $default_red_color;
        }
      }
    }
  }
</style>
