<template>
  <aside class="aside">
    <transition name="fade">
      <div class="back" @click.self="status = false" v-show="status"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="content" id="panel">

        </div>
        <div class="footer">
          <a href="javascript:void(0)" @click="status = false">关闭</a>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
  export default {
    name: 'mapRoutePanel',
    props: {
      data: {}
    },
    data () {
      return {
        status: false
      }
    },
    methods: {
      show () {
        this.status = true
      },
      hide () {
        this.status = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .aside {
    z-index: 9999;
    position: fixed;
    top: 0;
    right: 0;
    .back {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
    }
    .wrapper {
      position: fixed;
      top: 0;
      right: 0;
      background-color: #fff;
      width: 70%;
      height: 100%;
      .content {
        height: 100%;
        overflow-y: scroll;
        padding: 20px 20px $default_toolbar_height + 20px;
      }
      .footer {
        width: 100%;
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
        z-index: 10000;
        a {
          flex: 1;
          text-align: center;
          box-sizing: border-box;
          &:last-child {
            background-color: $default_red_color;
            color: #fff;
          }
        }
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(100%, 0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<style type="text/css">
  .amap-lib-driving .plan dt:first-child {
    border-top: 0;
  }

  .amap-lib-driving .plan dt:last-child {
    border-bottom: 0;
  }

  .amap-lib-driving {
    border: 1px solid #eee;
  }
</style>
