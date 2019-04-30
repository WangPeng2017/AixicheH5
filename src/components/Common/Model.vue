<template>
  <div v-show="show">
    <div class="model"
         @click="closeModel"></div>
    <div class="model-content"
         :style="resetStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Model',
  components: {},
  props: ['show', 'resetStyle'],
  data () {
    return {}
  },
  methods: {
    closeModel () {
      this.$emit('closeModel')
    }
  }
}
</script>

<style lang="less" scoped>
.model {
  background: rgba(0, 0, 0, 1);
  opacity: 0.07;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.model-content {
  position: absolute;
  width: 90%;
  background: #fff;
  left: 50%;
  top: 5%;
  transform: translate(-50%, 0%);

  padding: 10px;
  height: 80%;
  overflow: auto;
}
</style>

