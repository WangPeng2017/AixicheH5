<template>
  <div class="my-select" @click="$emit('click')">
    <label>{{ label }}</label>
    <select @change="change" :value="currentValue" :disabled="disabled">
      <option value="" selected disabled style="display: none;">{{ placeholder }}</option>
      <slot></slot>
    </select>
    <i class="right-icon"></i>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Array]
      },
      label: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: {
        type: Array
      },
      disabled: {
        default: false
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      change (ev) {
        this.$emit('input', ev.target.value)
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/pub";
  .my-select {
    width: 100%;
    height: $default_cell_height;
    line-height: $default_cell_height;
    font-size: $default_font_size;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid $default_border_color;/*no*/
    padding: 0 20px;
    position: relative;
    label {
      width: 240px;
      flex: none;
      color: $default_title_color;
    }
    select {
      width: 0;
      flex: 1;
      border: 0;
      background-color: transparent;
      direction: rtl;
      height: 100%;
      text-indent: 25px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    ::-webkit-input-placeholder {
      color:$default_input_placeholder_color;
    }
    i {
      position: absolute;
      right: 20px;
    }
  }
</style>
