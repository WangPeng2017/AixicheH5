<template>
  <button class="fixedBotBtn"
          @click="handleClick"
          :style="{'backColor': backColor}"
          v-foot>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    backColor: {
      type: String,
      default: 'rgba(241, 83, 83, 1)'
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.fixedBotBtn {
  font-size: $default_largefont_size;
  color: #fff;
  text-align: center;
  background-color: $default_red_color;
  width: 100%;
  height: $default_toolbar_height;
  line-height: $default_toolbar_height;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: -1.9px -5.7px 12.9px 0.1px rgba(8, 1, 3, 0.27);
  border: 0;
}
</style>
