<template>
  <div class="search">
    <i class="iconfont icon-search"></i>
    <input
      type="text"
      @keyup.enter="handleEnter"
      @input="handleChange"
      :disabled="disabled"
      v-model.trim="currentValue"
      :placeholder="placeholder"
      :style="{'backgroundColor': backColor}" />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      backColor: {
        type: String,
        default: 'rgba(255, 255, 255, 1)'
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      handleEnter (ev) {
        this.$emit('enter', ev)
      },
      handleChange (ev) {
        this.$emit('input', ev)
      },
      getVal () {
        return this.currentValue
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .search {
    position: relative;
    input {
      width: 100%;
      height: $default_input_height;
      border-radius: $default_input_height/2;
      font-size: $default_font_size;
      box-sizing: border-box;
      border: 0;
      color: $default_input_color;
      background-color: $default_input_background_color;
      text-indent: 70px;
    }
    i {
      position: absolute;
      left: 20px;
      top: 0;
    }
  }
</style>
