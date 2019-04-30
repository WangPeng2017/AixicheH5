<template>
  <div class="radioGroup">
    <slot></slot>
  </div>
</template>

<script>
  import { findComponentsDownward } from '@js/util'

  export default {
    name: 'MyRadioGroup',
    props: {
      value: {
        type: [String, Number],
        default: ''
      }
    },
    data () {
      return {
        currentValue: this.value,
        childrens: []
      }
    },
    mounted () {
      this.updateValue()
    },
    methods: {
      updateValue () {
        const value = this.value
        this.childrens = findComponentsDownward(this, 'MyRadio')
        if (this.childrens) {
          this.childrens.forEach(child => {
            child.currentValue = value === child.label
            child.group = true
          })
        }
      },
      change (data) {
        this.currentValue = data.value
        this.updateValue()
        this.$emit('input', data.value)
        this.$emit('change', data)
      }
    },
    watch: {
      value () {
        this.updateValue()
      }
    }
  }
</script>

<style></style>
