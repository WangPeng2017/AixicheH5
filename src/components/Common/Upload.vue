<template>
  <div>
    <div class="wx-cell">
      <div class="wx-cell__bd">
        <div class="wx-uploader__hd">
          <p class="wx-uploader__title">{{ title }}</p>
          <div class="wx-uploader__info">{{ imgList.length }}/{{ maxImgs }}</div>
        </div>
        <div class="wx-cell__bd">
          <ul class="wx-uploader__files"
              id="uploaderFiles">
            <li v-for="(item, index) in imgList"
                :key="item.id"
                :style="{backgroundImage: 'url(' + item.src + ')'}"
                :class=" + item.loading ? 'wx-uploader__file wx-uploader__file_status' : 'wx-uploader__file' ">
              <img class="previewer-demo-img"
                   :src="item.src"
                   width="79"
                   height="79"
                   @click="show(index)" />
              <i class="wx-loading wx-loading"
                 v-if="item.loading"></i>
              <i class="wx-delete"
                 @click="deleteMe(index)"
                 v-if="!item.loading"></i>
            </li>
            <div v-transfer-dom>
              <previewer :list="imgList"
                         ref="previewer"
                         :options="options"
                         @on-index-change="logIndexChange"></previewer>
            </div>
          </ul>
          <div class="wx-uploader__input-box">
            <input id="uploaderInput"
                   class="wx-uploader__input"
                   type="file"
                   accept="image/*"
                   v-on:change="onChange" />
          </div>
        </div>
      </div>
    </div>

    <confirm v-model="showConfirm"
             :title="confirmTitle"
             :content="content"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             confirm-text="确认"
             cancel-text="取消"></confirm>
    <toast v-model="showToast"
           type="text"
           :time="800"
           is-show-mask
           :text="toastMsg"></toast>
    <div v-show="false && showLoading"
         class="wx-bg">
      <div class="wx-toast">
        <i class="weui-loading wx-icon_toast"></i>
        <p class="wx-toast__content"
           style="margin-top: 5px;">图片上传中</p>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { getCompressPic, upload } from "Lib/utils.pic";
import { Confirm, Toast, Previewer, TransferDom } from "vux";

export default {
  name: "CommonUpload",
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Toast,
    Previewer
  },
  props: ["data", "webUrl", "title"],
  data () {
    return {
      imgList: [],
      maxImgs: 5,
      showLoading: false,
      showConfirm: false,
      showToast: false,
      toastMsg: "上传失败",
      confirmTitle: "温馨提示",
      content: "该图片成功上传，您确认删除吗？",
      deleteTarget: "",
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      }
    };
  },
  watch: {
    data: {
      handler: function () {
        this.imgList = this.data;
      }
    }
  },
  methods: {
    // 图片预览
    logIndexChange (arg) {
      // console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index);
    },
    //
    onChange: function (val) {
      let files = val.target.files;

      // 创建读取文件的对象
      const reader = new FileReader();

      // 创建文件读取相关的变量
      let imgFile;
      // 为文件读取成功设置事件
      reader.onload = function (e) {
        imgFile = e.target.result;

        // 检查图片数量限制
        if (this.imgList.length >= 5) {
          this.$vux.alert.show({
            title: "图片数量已达到上限",
            content: "最多添加五张图片"
          });
          return false;
        }

        // 压缩图片
        getCompressPic(imgFile, data => {
          this.imgList.push({
            src: data,
            msrc: data,
            id: Date.now(),
            loading: true
          });
          this.showLoading = true;
          upload(files[0].name, data, this.showUploadResult, this.webUrl);
        });
      }.bind(this);

      // 正式读取文件
      let i = 0;
      const timer1 = setInterval(() => {
        if (i < files.length) {
          reader.readAsDataURL(files[i]);
          i++;
        } else {
          clearInterval(timer1);
        }
      }, 100);
    },
    showUploadResult: function (res) {
      if (res.data.code === 1) {
        this.showLoading = false;
        this.$set(this.imgList[this.imgList.length - 1], "loading", false);
        this.$set(
          this.imgList[this.imgList.length - 1],
          "attachments",
          res.data.data
        );
        this.$emit("on-upload", this.imgList);
      } else {
        // 上传失败
        this.showToast = true;
        this.toastMsg = "上传失败";
        this.imgList.splice(this.imgList.length - 1, 1);
      }
    },
    deleteMe: function (val) {
      this.deleteTarget = val;
      this.showConfirm = true;
    },
    onCancel: function () { },
    onConfirm: function () {
      this.imgList.splice(this.deleteTarget, 1);
    }
  }
};
</script>

<style lang='less' scoped>
.v-transfer-dom /deep/ .pswp__top-bar button[title='Toggle fullscreen'] {
  display: none;
}
.wx-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.7);
  z-index: 9;
}

.wx-toast {
  position: fixed;
  z-index: 5001;
  width: 7.6em;
  min-height: 7.6em;
  top: 180px;
  left: 50%;
  margin-left: -3.8em;
  text-align: center;
  border-radius: 5px;
  color: #ffffff;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  margin-left: 0 !important;
}

.wx-icon_toast.weui-loading {
  margin: 30px 0 0;
  width: 38px;
  height: 38px;
}

.wx-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
}

.wx-label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}

.wx-cell__bd {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.wx-cell:before {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  // border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
  right: 15px;
}

.wx-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}

.wx-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}

.wx-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}

.wx-uploader__input-box:before,
.wx-uploader__input-box:after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}

.wx-cells_form input,
.wx-cells_form textarea,
.wx-cells_form label[for] {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.wx-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.wx-uploader__files {
  list-style: none;
}

.wx-uploader__file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
  background: no-repeat center center;
  background-size: cover;
  position: relative;
}

.wx-uploader__file_status:before {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.wx-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
}

.wx-delete {
  background: white
    url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icmVtb3ZlLWNpcmNsZSI+CgkJPHBhdGggZD0iTTI1NSwwQzExNC43NSwwLDAsMTE0Ljc1LDAsMjU1czExNC43NSwyNTUsMjU1LDI1NXMyNTUtMTE0Ljc1LDI1NS0yNTVTMzk1LjI1LDAsMjU1LDB6IE0zODIuNSwyODAuNWgtMjU1di01MWgyNTVWMjgwLjV6ICAgICIgZmlsbD0iI2NjMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=')
    no-repeat;
  background-size: 22px;
  width: 22px;
  height: 22px;
  border-radius: 22px;
  display: block;
  position: absolute;
  top: 12px;
  right: -10px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #ffffff;
}

.wx-uploader__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.wx-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 14px;
}

.wx-uploader__info {
  color: #b2b2b2;
  display: none;
}

.wx-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
</style>
