<template>
  <div class="input">
    <slot></slot>
    <div class="line"></div>
    <input :type="type"
           :placeholder="placeholder"
           :value="currentValue"
           v-on:input="handleChange">
    <slot name="button"></slot>
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
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleChange (ev) {
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
@import "../../../../../assets/css/pub";
.input {
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $default_border_color; /*no*/
  margin-top: 40px;

  .line {
    width: 1px; /*no*/
    height: 40px;
    background-color: $default_border_color;
    margin: 0 20px;
  }
  input {
    height: 100%;
    flex: 1;
    background-color: transparent;
    border: 0;
    font-size: $default_font_size;
    outline: none;
  }
}
</style>
