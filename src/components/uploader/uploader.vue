<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div v-show="showHeader" class="weui-uploader__hd">
          <p class="weui-uploader__title"> {{ title }} </p>
          <div v-show="showHeader && showTip" class="weui-uploader__info">
            {{ images.length }} / {{ max }}
          </div>
        </div>

        <div class="weui-uploader__bd" :class="{small: size === 'small'}">
          <ul class="weui-uploader__files">
            <uploader-item v-for="(image, index) in images" :background-image="image.url" :key="image.url" @click.native="imageClick(image, index)"></uploader-item>
          </ul>

          <div v-show="!readonly && images.length < max" class="weui-uploader__input-box" @click="add">
            <input v-if="!handleClick" ref="input" class="weui-uploader__input" type="file" accept="image/*" :capture="showCapture" @change="change">
          </div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewImages" ref="previewer">

      </previewer>
    </div>
    <actionsheet v-model="showAction" :menus="menus" @on-click-menu="actionClick" show-cancel></actionsheet>
  </div>
</template>

<script>
  import UploaderItem from './uploader-item.vue'
  import { Actionsheet, Previewer, TransferDom, Loading } from 'vux'
  import { uploadFile, removeFile } from '@api'
  import { GetType } from '@utils/mixin'

  export default {
    props: {
      images: {
        type: Array,
        default: () => []
      },
      max: {
        type: Number,
        default: 1
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showTip: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '图片上传'
      },
      // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
      handleClick: {
        type: Boolean,
        default: false
      },
      // 选择文件后是否自动上传，如果不是，则emit change事件
      autoUpload: {
        type: Boolean,
        default: false
      },
      uploadUrl: {
        type: String,
        default: ''
      },
      autoRemove: {
        type: Boolean,
        default: false
      },
      removeUrl: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'normal'
      },
      capture: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: 'img'
      },
      params: {
        type: Object,
        default: null
      }
    },
    directives: {
      TransferDom
    },
    components: {
      UploaderItem,
      Previewer,
      Actionsheet,
      Loading
    },
    data () {
      return {
        previewImages: [],
        showAction: false,
        menus: {
          preview: '预览',
          delete: '<span style="color:red">删除</span>'
        },
        activeImage: {}
      }
    },
    methods: {
      add () {
        if (this.handleClick) {
          this.$emit('add-image')
        }
      },
      imageClick (image, index) {
        this.activeImage = {
          ...this.activeImage,
          image: image,
          index: index
        }
        this.showAction = true
      },
      actionClick (key) {
        if (key === 'preview') {
          // 暂未实现，可以捕捉preview事件自己实现
          if (this.handleClick) {
            this.$emit('preview', this.activeImage.image, this.activeImage.index)
          } else {
            this.previewImages.slice(0, this.previewImages.length)
            this.images.map(i => {
              this.previewImages.push({src: i.url})
            })
            this.$refs.previewer.show(this.activeImage.index)
          }
        } else if (key === 'delete') {
          if (this.handleClick) {
            this.$emit('remove-image', this.activeImage.image, this.activeImage.index)
          } else {
            if (this.autoRemove) {
              if (!this.removeUrl) {
                console.error('removeUrl')
              }
              if (this.$vux && this.$vux.loading) {
                this.$vux.loading.show('正在移除')
              }

              let formData = new window.FormData()
              formData.append('filePath', this.images[this.activeImage.index].url)
              removeFile(formData).then(response => {
                if (this.$vux && this.$vux.loading) {
                  this.$vux.loading.hide()
                }
                this.images.splice(this.activeImage.index, 1)
              })
            } else {
              this.images.splice(this.activeImage.index, 1)
            }
          }
        }
      },
      // 适用于action的情况
      change () {
        if (this.handleClick) {
          return
        }
        let file = this.$refs.input.files[0]
        let formData = new window.FormData()
        formData.append(this.name, this.$refs.input.files[0])
        if (this.params) {
          for (let key in this.params) {
            formData.append(key, this.params[key])
          }
        }
        if (this.autoUpload) {
          if (!this.uploadUrl) {
            console.error('uploadUrl不应为空')
          }
          if (this.$vux && this.$vux.loading) {
            this.$vux.loading.show('正在上传')
          }

          uploadFile(formData).then(response => {
            if (this.$vux && this.$vux.loading) {
              this.$vux.loading.hide()
            }
            this.$refs.input.value = ''
            this.images.push({
              url: response.data,
              name: file.name,
              ext: GetType(file.name),
              size: file.size,
              type: file.type
            })
          })
        } else {
          this.$refs.input.value = ''
          this.$emit('upload-image', formData)
        }
      }
    },
    computed: {
      showCapture () {
        return this.capture || undefined
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
  .remove:before {
    width: 0;
    height: 0;
  }
  .weui-uploader__bd.small {
    .weui-uploader__input-box {
      margin-right: 10px;
      margin-bottom: 10px;
      width: 116px;
      height: 116px;
    }
    .weui-uploader__file {
      width: 120px;
      height: 120px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .weui-uploader__input-box {
    float: right;
    width: 150px;
    height: 150px;
    border: 2px dashed #ACACAC;
    &:before {
      height: 60px;
    }
    &:after {
      width: 60px;
    }
  }

  .weui-uploader__file {
    float: right;
    width: 150px;
    height: 150px;
  }

  .weui-cell {
    .weui-cell {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
