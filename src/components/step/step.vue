<template>
  <div class="lif-step">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'step',
    props: {
      value: Number,
      backgroundColor: {
        type: String,
        default: '#fff'
      },
      gutter: {
        type: String,
        default: '10px'
      }
    },
    created () {
      this.current = this.value
    },
    mounted () {
      this._mapPropsToChildComponent()
    },
    watch: {
      value (val) {
        this.current = val
      },
      current (val) {
        this._mapPropsToChildComponent()
        this.$emit('input', val)
      }
    },
    data () {
      return {
        current: 0
      }
    },
    methods: {
      _mapPropsToChildComponent () {
        const _this = this
        const len = this.$children.length - 1
        this.$children.forEach((child, index) => {
          child.currentStepNumber = (index + 1).toString()
          child.currentStepLast = index === len
          if (index === _this.current) {
            child.currentStatus = 'process'
          } else if (index < _this.current) {
            child.currentStatus = 'finish'
          } else {
            child.currentStatus = 'wait'
          }
        })
      }
    }
  }
</script>

<style lang="less">

  .lif-step {
    display: flex;
    align-items: center;
  }
  .lif-step-item {
    display: inline-block;
    position: relative;
  }
  .lif-step-item-with-tail {
    flex: 1;
  }
  .lif-step-item-tail {
    height: 2px;
    position: absolute;
    left: 0;
    top: 24px;
    padding: 0 0;
    transition: all 0.4s ease 0s;
  }
  .lif-step-item-tail-finish {
    background: #09bb07 none repeat scroll 0 0;
  }
  .lif-step-item-tail-process, .lif-step-item-tail-wait {
    background: #CCC none repeat scroll 0 0;
  }
  .lif-step-item-icon {
    display: inline-block;
    text-align: center;
  }
  .lif-step-item-checked::before {
    font-size: 28px !important;
    line-height: 44px;
    margin: 0!important;
    transform: translateY(-8px);
  }
  .lif-step-item-title {
    font-size: 28px !important;
  }
  .lif-step-item-head {
    position: relative;
    display: inline-block;
    margin-right: -8px;
    .lif-step-item-head-inner {
      width: 44px;
      height: 44px;
      line-height: 44px;
      border-radius: 99px;
      text-align: center;
      font-size: 28px;
      transition: all 0.4s ease 0s;
      background: #fff none repeat scroll 0 0;
    }
  }
  .lif-step-item-head-finish .lif-step-item-head-inner{
    border: 2px solid #09bb07;
    color: #09bb07;
  }
  .lif-step-item-head-process .lif-step-item-head-inner{
    border: 2px solid #09bb07;
    color: #FFF;
    background: #09bb07 none repeat scroll 0 0;
  }
  .lif-step-item-head-wait .lif-step-item-head-inner {
    border: 2px solid #888;
    color: #888;
  }
  .lif-step-item-main {
    display: inline-block;
    position: relative;
    vertical-align: top;
    color: #888;
    padding-left: 10px;
  }
  .lif-step-item-main-process {
    font-weight: bold;
    color: #666;
  }
</style>
