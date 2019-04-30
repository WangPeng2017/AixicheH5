<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <div class="content">
        {{content}}
      </div>
      <div class="close-btn" @click="closeMask">
        <i class="iconfont close-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showMask: false
    }
  },
  methods: {
    closeMask () {
      this.showMask = false
    }
  },
  mounted () {
    this.showMask = this.value
  },
  watch: {
    value (newVal, oldVal) {
      this.showMask = newVal
    },
    showMask (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 537px;
    height: 653px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    .dialog-title {
      width: 100%;
      height: 60px;
      font-size: 30px;
      color:rgba(0,0,0,1);
      font-weight: 400;
      font-family:MicrosoftYaHei;
      padding-bottom: 3%;
      box-sizing: border-box;
      border-bottom: 1px solid #C5C5C5;
    }
    .content {
      color: #797979;
      line-height: 26px;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
}
</style>