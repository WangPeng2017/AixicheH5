<template>
  <label class="checkbox">
    <i :class="{'checked': currentValue,
    'small': sizeClass==='small',
    'middle': sizeClass==='middle',
    'large': sizeClass==='large',
    'red': backgroundClass==='red',
    'blue': backgroundClass==='blue'}"></i>
    <input type="checkbox" :disabled="disabled" @change="handleChange">
    <span><slot></slot></span>
  </label>
</template>

<script>
  // 默认形态对勾 checkbox
  export default {
    name: 'MyCheckbox',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      sizeClass: {
        type: String,
        default: 'small'
      },
      backgroundClass: {
        type: String,
        default: 'red'
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      handleChange (ev) {
        this.currentValue = !this.currentValue
        this.$emit('input', this.currentValue)
        this.$emit('click', this.currentValue)
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .checkbox {
    /*width: 100%;*/
    display: inline-flex;
    align-items: center;
    i {
      flex: none;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      margin-right: 20px;
    }

    input[type=checkbox] {
      display: none;
      vertical-align: middle;
    }
    span {
      font-size: $default_font_size;
      color: $default_title_color;
    }
  }

  .small {
    width: 36px;/*px*/
    height: 36px;/*px*/

  }

  .middle {
    width: 48px;
    height: 48px;
  }

  .large {
    width: 60px;
    height: 60px;
  }

  .red {
    @include backimg('./image/nochecked');
    &.checked {
      @include backimg('./image/checked');
    }
  }
</style>
