<template>
  <label class="radio">
    <span class="wrapper">
      <span class="round" :class="{'checked': currentValue}"></span>
      <input
        class="radio-input"
        type="radio"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>
<script>
  import {findComponentUpward} from '@js/util'

  export default {
    name: 'MyRadio',
    props: {
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      label: {
        type: [String, Number]
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      change () {
        if (this.disabled) {
          return false
        }
        const checked = event.target.checked
        this.currentValue = checked
        let value = checked ? this.trueValue : this.falseValue
        this.$emit('input', value)

        if (this.group && this.label !== undefined) {
          this.parent.change({
            value: this.label,
            trueValue: this.trueValue,
            checked: this.value
          })
        }
      },
      updateValue () {
        this.currentValue = this.value === this.trueValue
      }
    },
    data () {
      return {
        currentValue: this.value,
        group: false,
        parent: findComponentUpward(this, 'MyRadioGroup')
      }
    },
    mounted () {
      if (this.parent) this.group = true
      if (!this.group) {
        this.updateValue()
      } else {
        this.parent.updateValue()
      }
    },
    watch: {
      value (val) {
        this.updateValue()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .radio {
    display: inline-flex;
    align-items: center;
    .wrapper {
      display: flex;
      align-items: center;
      margin-right: 4px;
      .round {
        width: 36px;/*px*/
        height: 36px;/*px*/
        display: inline-block;
        border-radius: 50%;
        position: relative;
        @include backimg('./image/radio');
        &.checked {
          @include backimg('./image/radioOn');
        }
      }
      .radio-input {
        position: absolute;
        opacity: 0;
      }
    }
  }
</style>
