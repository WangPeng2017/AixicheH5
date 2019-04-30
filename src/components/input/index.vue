<template>
  <div class="my-input" @click="$emit('click')">
    <label>
      <slot name="icon"></slot>
      <span>{{ label }}</span>
    </label>
    <div class="right">
      <input
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="currentValue"
        @change="change" />
      <div class="icon-wrapper" v-if="icon">
        <i class="go-icon"></i>
      </div>
    </div>
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
      },
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        default: false
      },
      icon: {
        type: Boolean,
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

<style lang="scss" scoped>
  @import "../../assets/css/pub";
  .my-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: $default_font_size;
    color: $default_title_color;
    height: $default_cell_height;
    line-height: $default_cell_height;
    border-bottom: 1px solid #eee;/*no*/
    padding:0 20px;
    line-height: 1;
    &:last-child {
      border-bottom: 0;
    }
    label {
      width: 240px;
      display: flex;
      align-items: center;
      i {
        margin-right: 20px;
      }
    }
    .right {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      input {
        height: 100%;
        box-sizing: border-box;
        flex: 1;
        border: 0;
        text-align: right;
        font-size: $default_font_size;
        background-color: transparent;
        text-overflow: ellipsis;
        &[type=date] {
          width: 0;
          height: 0;
          opacity: 0;
          position: absolute;
        }
      }
      .input-date {
        flex: 1;
        height: 100%;
        line-height: 76px;
        position: relative;
        span {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
  .icon-wrapper {
    width: 15px;
    margin-left: 20px;
  }
  .go-icon {
    width: 15px;
    height: 27px;
    display: block;
    @include backimg('./image/go-icon');
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
  }
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
</style>
