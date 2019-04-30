<template>
  <div class="my-input" @click="$emit('click')">
    <label>{{ label }}</label>
    <textarea :placeholder="placeholder" :value="currentValue" @change="change" slot="body"></textarea>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      },
      label: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '请输入'
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

<style lang="scss" scoped>
  @import "../../assets/css/pub";
  .my-input {
    width: 100%;
    font-size: $default_font_size;
    display: flex;
    background: #fff;
    border-bottom: 1px solid $default_border_color;/*no*/
    label {
      height: $default_cell_height;
      line-height: $default_cell_height;
      width: 240px;
      flex: none;
      text-indent: 20px;
      color: $default_title_color;
    }
    textarea {
      margin: 24px 0;
      width: 100%;
      height: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
      border: 0;
      padding: 0 20px;
      box-sizing: border-box;
      text-align: right;
      resize: none;
    }
    ::-webkit-input-placeholder {
      color:$default_input_placeholder_color;
    }
  }
</style>
