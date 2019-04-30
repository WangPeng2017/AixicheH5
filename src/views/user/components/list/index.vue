<template>
  <div class="list" @click="handleClick" :style="{'height': height / 75 + 'rem'}">
    <label>
      <slot name="icon"></slot>
      <span>{{ label }}</span>
    </label>
    <div class="right">
      <template v-if="type === 'text'">
        <input :type="type" :placeholder="placeholder" :disabled="disabled" :value="currentValue" @change="handleChange">
      </template>
      <template v-else-if="type === 'date'">
        <label class="input-date">
          <span>{{ currentValue }}</span>
          <input :type="type" :placeholder="placeholder" :disabled="disabled" :value="currentValue" @change="handleChange">
        </label>
      </template>
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
      icon: {
        default: true,
        type: Boolean
      },
      placeholder: {},
      label: {},
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      height: {
        default: 88
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      handleChange (ev) {
        this.currentValue = ev.target.value
        this.$emit('input', ev.target.value)
      },
      handleClick (ev) {
        this.$emit('click', ev)
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
  @import "../../../../assets/css/pub";

  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: $default_font_size;
    color: $default_title_color;
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
