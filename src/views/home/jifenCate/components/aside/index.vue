<template>
  <div class="aside">
      <ul>
        <li
          v-for="(item, index) in data"
          :class="{'active': index === activeIndex}"
          @click="getCategory($event, item.category_id, index)">
          {{ item.category_name }}</li>
      </ul>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      data: Array
    },
    data () {
      return {
        asideBScroll: null,
        activeIndex: 0
      }
    },
    methods: {
      getCategory (ev, id, index) {
        this.$emit('change', id)
        this.activeIndex = index
        this.asideBScroll.scrollToElement(ev.target, 500)
      },
      initBScroll () {
        this.asideBScroll = new BScroll('.aside', {
          click: true
        })
      }
    },
    created () {
      this.$nextTick(() => {
        this.initBScroll()
      })
    },
    watch: {
      data () {
        setTimeout(() => {
          this.asideBScroll.refresh()
        }, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/css/pub";

  .aside {
    width: 25%;
    margin-right: 0px;
    flex: none;
    ul {
      background-color: $default_background_color;
      li {
        height: 108px;
        line-height: 108px;
        text-align: center;
        border-bottom: 0; /*no*/
        &.active {
          background-color: #fff;
          border-left: 4px solid $default_theme_color;
        }
      }
    }
  }
</style>
