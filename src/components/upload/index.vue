<template>
  <div class="upload">
    <label class="wrapper">
      <slot>上传图片</slot>
      <input type="file"
             accept="image/*"
             hidden
             @change="change">
    </label>
    <div class="clip"
         v-show="clipStatus">
      <div class="main"
           ref="clipContent">
        <div class="lens"
             ref="lens"></div>
        <img :src="image"
             ref="image"
             :style="{transform: `translate3d(${posX}px, ${posY}px, 0)`, opacity: imageStatus ? 1 : 0}">
        <div class="loading"
             v-show="!imageStatus">
          <loading></loading>
          <p>正在努力加载图片</p>
        </div>
      </div>
      <div class="buttonGroup">
        <span class="cancelBtn"
              @click="cancel">取消</span>
        <span class="confirmBtn"
              @click="confirm">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './loading.vue'
import compressImage from '@js/compressImage'
export default {
  components: {
    loading,
    compressImage
  },
  props: {
    enableClip: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imageStatus: false,
      clipStatus: false,
      image: '',
      clipImage: '',
      winWidth: window.screen.availWidth,
      winHeight: window.screen.availHeight,
      touchStartX: 0,
      touchStartY: 0,
      posX: 0,
      posY: 0,
      currentTouchPosX: 0,
      currentTouchPosY: 0,
      scale: 0
    }
  },
  methods: {
    change (ev) {
      let file = ev.target.files[0]
      let reader = new FileReader()
      // compressImage(reader.readAsDataURL(file), {
      //   // width: 100, // 压缩后图片的宽
      //   height: 200, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
      //   quality: 0.8 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
      // }).then(result => {
      //   console.log(result) // result即为压缩后的结果
      // })
      reader.readAsDataURL(file)
      reader.onload = ev => {
        this.image = ev.target.result
        if (this.enableClip) {
          this.clipStatus = true
          let image = new Image()
          image.src = ev.target.result
          image.onload = () => {
            this.init()
          }
        } else {
          this.$emit('clip', ev.target.result)
          this.clipStatus = false
          this.imageStatus = false
        }
      }
    },
    init () {
      let imageWidth = this.$refs.image.clientWidth
      let imageHeight = this.$refs.image.clientHeight
      let clipContentWidth = this.$refs.clipContent.clientWidth
      let clipContentHeight = this.$refs.clipContent.clientHeight
      let scaleWidth = imageWidth / clipContentWidth
      let scaleHeight = imageHeight / clipContentHeight
      this.scale = Math.max(scaleWidth, scaleHeight)

      let tempWidth = imageWidth * this.scale
      let tempHeight = imageHeight * this.scale

      let canvas = document.createElement('canvas')
      canvas.width = tempWidth
      canvas.height = tempHeight
      canvas.getContext('2d').drawImage(this.$refs.image, 0, 0, tempWidth, tempHeight)
      this.$refs.image.src = canvas.toDataURL('image/png', 0.5)
      this.posX = (clipContentWidth - tempWidth) / 2
      this.posY = (clipContentHeight - tempHeight) / 2

      this.$refs.lens.addEventListener('touchstart', this.touchstart)
      this.$refs.lens.addEventListener('touchmove', this.touchmove)
      this.imageStatus = true
    },
    cancel () {
      this.deleteEvent()
      this.image = null
      this.imageStatus = false
      this.clipStatus = false
    },
    confirm () {
      let clipContentWidth = this.$refs.clipContent.clientWidth
      let clipContentHeight = this.$refs.clipContent.clientHeight
      let imageWidth = this.$refs.lens.clientWidth
      let imageHeight = this.$refs.lens.clientHeight
      let tempX = (clipContentWidth - imageWidth) / 2 - this.posX
      let tempY = (clipContentHeight - imageHeight) / 2 - this.posY
      let canvas = document.createElement('canvas')
      canvas.width = imageWidth
      canvas.height = imageHeight
      let context = canvas.getContext('2d')
      context.drawImage(this.$refs.image, tempX, tempY, imageWidth, imageHeight, 0, 0, imageWidth, imageWidth)
      this.$emit('clip', canvas.toDataURL('image/png'))
      this.imageStatus = false
      this.clipStatus = false
    },
    touchstart (ev) {
      ev.preventDefault()
      this.touchStartX = ev.touches[0].pageX
      this.touchStartY = ev.touches[0].pageY
      this.currentTouchPosX = this.posX
      this.currentTouchPosY = this.posY
    },
    touchmove (ev) {
      ev.preventDefault()
      this.posX = ev.touches[0].pageX - this.touchStartX + this.currentTouchPosX
      this.posY = ev.touches[0].pageY - this.touchStartY + this.currentTouchPosY
    },
    deleteEvent () {
      this.$refs.lens.removeEventListener('touchstart', this.touchstart)
      this.$refs.lens.removeEventListener('touchmove', this.touchmove)
    }
  },
  activated () {

  }
}
</script>

<style lang="scss" scoped>
.upload,
.wrapper {
  width: 100%;
  height: 100%;
  display: block;
}

.clip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.6);

  .main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 125px;
    .lens {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      box-sizing: content-box;
      z-index: 2;
      border: 1000px solid rgba(0, 0, 0, 0.6);
    }
    > img {
      position: absolute;
    }

    .loading {
      width: 500px;
      height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }

  .buttonGroup {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    z-index: 2;

    span {
      padding: 28px 100px;
      font-size: 29px;
      border-radius: 10px;
      line-height: 1;
      &.cancelBtn {
        background-color: #e7e7e7;
        color: #333;
      }
      &.confirmBtn {
        background-color: #27ae60;
        color: #fff;
      }
    }
  }
}
</style>
