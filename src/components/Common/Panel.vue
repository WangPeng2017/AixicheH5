<template>
  <div class="cell"
       @click="onClick">
    <div class="cell__lf">
      <slot name="left"></slot>
    </div>
    <div class="cell-cn">
      <slot name="center"></slot>
    </div>
    <div class="cell__rg">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { go } from 'Lib/router'
export default {
  name: 'Panel',
  props: {
    link: [String, Object]
  },
  data () {
    return {
      back: require('Assets/img/back.png')
    }
  },
  methods: {
    onClick () {
      go(this.link, this.$router)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.cell {
  padding: 6px 13px;
  border-bottom: 1px solid #f6f6f6;
  overflow: hidden;
  display: flex;
  position: relative;
}
</style>
