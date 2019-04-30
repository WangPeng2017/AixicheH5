<template>
  <div class="view">
    <x-header :left-options="{ backText: '' }"
              class="vux-1px-b">商家入驻</x-header>
    <step v-model="step"
          background-color="#f7f7f7">
      <step-item title="商家信息"
                 class="step-item"></step-item>
      <step-item title="店铺信息"
                 class="step-item"></step-item>
      <step-item title="企业信息"
                 class="step-item"></step-item>
    </step>
    <div class="content">
      <div class="tooltip margin-bottom"
           v-if="form.seller_status === -1">
        <h3>拒绝原因</h3>
        <p>{{ form.seller_status_desc || "无" }}</p>
      </div>
      <group title="店铺信息"
             class="margin-bottom">
        <cell title="店铺Logo"
              :primary="'content'">
          <uploader :images="logoImgData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </cell>
        <cell title="店铺封面"
              :primary="'content'">
          <uploader :images="headImgData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </cell>
        <x-input title="店铺名称"
                 placeholder="店铺名称"
                 v-model="form.shop_name"
                 :max="50"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <x-input title="商铺电话"
                 placeholder="请输入商铺电话"
                 :max="13"
                 v-model="form.shop_phone"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <x-input title="24小时电话"
                 placeholder="请输入24小时电话"
                 :max="13"
                 v-model="form.hours_phone"
                 placeholder-align="right"
                 text-align="right"></x-input>
      </group>
    </div>
    <fixed-bot-btn @click="nextClick">下一步</fixed-bot-btn>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import { Group, XInput, XButton, Step, StepItem, Cell, XHeader } from 'vux'
import Uploader from '@comps/uploader/uploader'
import fixedBotBtn from '@comps/fixedBotBtn'

export default {
  components: {
    XHeader,
    Step,
    StepItem,
    Group,
    XInput,
    XButton,
    Uploader,
    Cell,
    fixedBotBtn
  },
  data () {
    return {
      step: 1,
      form: {},
      logoImgData: [],
      headImgData: []
    }
  },
  computed: {
    ...mapState(['token', 'user'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    loadForm () {
      let jsonStr = sessionStorage.getItem('sellerRegisterForm')
      this.form = JSON.parse(jsonStr)
      let self = this
      if (this.form.seller_logo && this.form.seller_logo.length > 0) {
        self.logoImgData.slice(0, self.logoImgData.length)
        self.logoImgData.push({ url: self.form.seller_logo })
      }

      if (this.form.seller_head_img && this.form.seller_head_img.length > 0) {
        self.headImgData.slice(0, self.headImgData.length)
        self.headImgData.push({ url: self.form.seller_head_img })
      }
    },
    isValid () {
      if (!this.form.shop_phone || this.form.shop_phone.length === 0) {
        this.$toasted.show('请先输入商铺电话！')
        return false
      }
      if (!this.form.hours_phone || this.form.hours_phone.length === 0) {
        this.$toasted.show('请先输入商铺24小时电话！')
        return false
      }
      return true
    },
    // 下一步
    async nextClick () {
      if (this.isValid()) {
        if (this.logoImgData.length >= 1) {
          this.form.seller_logo = this.logoImgData[0].url
        }

        if (this.headImgData.length >= 1) {
          this.form.seller_head_img = this.headImgData[0].url
        }
        sessionStorage.setItem(
          'sellerRegisterForm',
          JSON.stringify(this.form)
        )
        this.$router.push('/sellerRegisterStep' + (this.step + 1))
      }
    }
  },
  created () {
    this.loadForm()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.content {
  padding-top: $default_toolbar_height;
  height: calc(
    100% - #{$default_navbar_height} - #{$default_buytoolbar_height}
  );
}

.tooltip {
  padding: 20px;
  margin: 20px;
  color: #df9d35;
  background: #fffbe6;
  p {
    margin-top: 10px;
    width: 100%;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: -1.9px -5.7px 12.9px 0.1px rgba(8, 1, 3, 0.27);
  border: 0;
}
</style>

<style lang="scss">
@import "../../assets/css/pub";

.vux-step {
  position: fixed;
  top: $default_navbar_height;
  left: 0;
  padding: 30px;
  width: 100%;
  height: $default_buytoolbar_height;
  background-color: $default_background_color;
  z-index: 9;
}
.vux-step-item-title {
  font-size: $default_font_size !important;
}
.weui-cells:before {
  z-index: 1;
}
.vux-step-item-icon {
  width: auto !important;
}
</style>
