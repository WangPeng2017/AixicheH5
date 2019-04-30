<template>
  <transition name="fade">
    <div class="sheet" v-show="showStatus" @click.self="hide">
      <div class="wrapper">
        <div class="title">{{title}}</div>
        <div class="scroll">
          <slot></slot>
        </div>
        <div class="footer" @click="hide">
          <i class="close-icon"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    },
    data () {
      return {
        showStatus: false
      }
    },
    methods: {
      show () {
        this.showStatus = true
      },
      hide () {
        this.showStatus = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sheet {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .wrapper {
      width: 100%;
      height: 65%;
      border-radius: 10px 10px 0 0;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .title {
        height: 76px;
        line-height: 76px;
        text-align: center;
        font-size: 30px;
        color: #333;
        border-bottom: 1px solid rgba(0, 0, 0, .1);/*no*/
      }
      .scroll {
        width: 100%;
        position: absolute;
        top: 76px;
        bottom: 97px;
        left: 0;
        overflow-y: scroll;
      }
      .footer {
        border-top: 1px solid rgba(0, 0, 0, .1);/*no*/
        width: 100%;
        height: 97px;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
