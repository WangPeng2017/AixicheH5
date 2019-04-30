<template>
  <div class="packagePanel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="title">
          <p>套餐<i class="close-icon" @click="status = false"></i></p>
        </div>
        <div class="content">
          <packageCard v-for="item in packageData" :key="item.package_id" :data="item" :type="true"></packageCard>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
  import packageCard from '@comps/card/packageCard'
  export default {
    props: {
      packageData: {
        type: Array
      }
    },
    components: {
      packageCard
    },
    data: function () {
      return {
        status: false,
        packageArr: this.packageData || []
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

  .packagePanel {
    .back {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .wrapper {
      padding: 0 20px;
      z-index: 3;
      width: 100%;
      height: 65%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
      .title {
        margin-top: 20px;
        text-align: center;
        font-size: $default_font_size;
        color: $default_title_color;
        .close-icon {
          float: right;
          width: 24px;
          height: 24px;
          margin-top: 12px;
        }
      }
      .subtitle {
        margin-top: 20px;
        text-align: left;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
      }
      .content {
        margin-top: 20px;
        width: 100%;
        height: calc(100% - 80px);
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(0, 100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

