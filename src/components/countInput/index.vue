<template>
  <div class="count">
    <i @click="handleChange(-1)">-</i>
    <span>{{ currentValue }}</span>
    <i @click="handleChange(1)">+</i>
  </div>
</template>

<script>
  export default {
    name: 'countInput',
    props: {
      value: {
        type: Number
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      handleChange (mark) {
        let val = this.currentValue + mark * this.step
        val = val > this.max ? this.max : val
        val = val < this.min ? this.min : val
        this.$emit('input', val)
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
        this.$emit('change', this.currentValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .count {
    width: 187px;
    line-height: 46px;
    display: flex;
    text-align: center;
    border: 1px solid #e7e7e7;/*no*/
    font-size: 25px;
    color: #333;
    float: right;
    i {
      width: 56px;
      height: 46px;
      font-style: normal;
      font-size: 36px;
      &:first-child {
        border-right: 1px solid #e7e7e7;/*no*/
      }
      &:last-child {
        border-left: 1px solid #e7e7e7;/*no*/
      }
    }
    span {
      flex: 1;
    }
  }
</style>
