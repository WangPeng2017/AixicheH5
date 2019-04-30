<template>
  <div class="header">
    <div class="header-left">
      <div class="left-arrow"
           @click="onClickBack"
           v-show="showBack">
        <i class="arrow"
           :style="{borderColor: titleColor}"></i>
      </div>
      <slot name="left"></slot>
    </div>
    <h1 class="header-title"
        :style="{color: titleColor}">
      {{title}}
    </h1>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {},
    showBack: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: '#000'
    }
  },
  data () {
    return {
      // blackBack: require("Assets/img/blackBack.png"),
      // whiteBack: require("Assets/img/whiteBack.png")
    }
  },
  methods: {
    onClickBack () {
      this.$router ? this.$router.back() : window.history.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/style/theme.less';
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 2px 0;
  box-sizing: border-box;
  background-color: @header-background-color;
  border-bottom: 1px solid @header-border-color;
}
.header .header-title {
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: @header-title-color;
}
.header-title-area,
.header .header-title {
  margin: 0 88px;
  height: 40px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header .header-title > span {
  display: inline-block;
}
.header .header-left,
.header .header-right {
  position: absolute;
  top: 14px;
  display: block;
  font-size: 14px;
  line-height: 21px;
  color: @header-text-color;
}
.header .header-left a,
.header .header-left button,
.header .header-right a,
.header .header-right button {
  float: left;
  margin-right: 8px;
  color: @header-text-color;
}
.header .header-left a:active,
.header .header-left button:active,
.header .header-right a:active,
.header .header-right button:active {
  opacity: 0.5;
}
.header .header-left {
  left: 18px;
}
.header .header-left .header-back {
  padding-left: 16px;
}
.header .header-left .left-arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -9px;
}

.header .header-left .left-arrow .arrow {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #000;
  border-width: 2px 0 0 2px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 8px;
  left: 7px;
}

.header .header-right {
  right: 15px;
}
.header .header-right a,
.header .header-right button {
  margin-left: 8px;
  margin-right: 0;
}
.header .header-right .header-more:after {
  content: '\2022\0020\2022\0020\2022\0020';
  font-size: 16px;
}
.header-fade-in-right-enter-active {
  animation: fadeinR 0.5s;
}
.header-fade-in-left-enter-active {
  animation: fadeinL 0.5s;
}
@keyframes fadeinR {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeinL {
  0% {
    opacity: 0;
    transform: translateX(-150px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
