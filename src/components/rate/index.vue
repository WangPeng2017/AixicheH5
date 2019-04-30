<template>
  <div class="Rate" v-if="length > 0">
    <button
      type="button"
      :key="n"
      :class="{'Rate__star': true, 'filled': n <= rate}"
      @click="setRate(n)"
      v-for="n in length"></button>
  </div>
</template>

<script>
  export default {
    name: 'rate',
    props: {
      length: {
        type: Number,
        default: 5
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        rate: this.value
      }
    },
    methods: {
      setRate (index) {
        if (this.disabled) return false
        this.$emit('beforeRate', this.rate)
        this.rate = index
        this.$emit('input', this.rate)
        this.$emit('afterRate', this.rate)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/css/pub";

  .Rate {
    height: 37px;
    display: inline-block;
  }

  .Rate__star {
    padding: 0;
    text-decoration: none;
    background: transparent;
    border: 0;
    display: inline-block;
    width: 39px;
    height: 37px;
    margin-right: 10px;
    @include backimg('./image/start');
    &:last-child {
      margin-right: 0;
    }
  }

  .Rate__star.filled {
    @include backimg('./image/start_on');
  }
</style>
