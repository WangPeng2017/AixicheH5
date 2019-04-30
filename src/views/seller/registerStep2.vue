<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">商家入驻</x-header>
    <step v-model="step"
          background-color='#f7f7f7'>
      <step-item title="商家信息"
                 class="step-item"></step-item>
      <step-item title="店铺信息"
                 class="step-item"></step-item>
      <step-item title="企业信息"
                 class="step-item"></step-item>
    </step>
    <div class="content">
      <div class="tooltip margin-bottom"
           v-if="form.seller_status===-1">
        <h3>拒绝原因</h3>
        <p>{{form.seller_status_desc || '无'}}</p>
      </div>
      <group title="企业信息"
             class="margin-bottom">
        <x-input title="企业名称"
                 placeholder="请输入企业名称"
                 v-model="form.seller_name"
                 :max="30"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <popup-picker title="企业分类"
                      placeholder="请选择企业分类"
                      :columns="1"
                      :data="typeData"
                      v-model="form.seller_type_idVal"
                      @on-change="onSellerTypeChange"
                      show-name></popup-picker>
        <popup-picker title="企业所在地"
                      placeholder="请选择企业所在地"
                      :columns="3"
                      :data="regionData"
                      v-model="form.region_idVal"
                      @on-change="onAreaChange"
                      show-name></popup-picker>
        <x-input title="企业详细地址"
                 placeholder="请输入企业详细地址"
                 :max="50"
                 v-model="form.seller_address"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <x-textarea title="企业经营范围"
                    placeholder="请输入企业经营范围"
                    v-model="form.empirical_range"
                    :max="200"></x-textarea>
      </group>

      <group title="执照信息"
             class="margin-bottom">
        <cell title="营业执照图片（限制照片小于10MB）"
              :primary="'content'">
          <uploader :images="licenseImgData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </cell>
        <x-input title="统一社会信用代码"
                 placeholder="请输入统一社会信用代码"
                 v-model="form.licence_number"
                 :max="30"
                 placeholder-align="right"
                 text-align="right"></x-input>
        <datetime title="成立日期"
                  placeholder="请选择企业成立日期"
                  v-model="form.business_license_start"
                  :min-year="1949"
                  ::max-year="currentYear"></datetime>
        <popup-radio title="营业期限"
                     placeholder="请选择营业期限"
                     :options="longtimeData"
                     v-model="form.is_longtime">
          <p slot="popup-header"
             class="vux-1px-b title-slot">请选择营业期限</p>
        </popup-radio>
        <datetime title="营业开始日期"
                  placeholder="请选择营业开始日期"
                  v-model="form.business_license_start"
                  v-if="showBusinessEnddate"
                  :min-year="1949"
                  :max-year="2050"></datetime>
        <datetime title="营业结束日期"
                  placeholder="请选择营业结束日期"
                  v-model="form.business_license_end"
                  v-if="showBusinessEnddate"
                  :min-year="1949"
                  :max-year="2050"></datetime>
      </group>
    </div>
    <fixed-bot-btn @click="nextClick"
                   :backColor="'rgba(86, 183, 91, 1)'">提交</fixed-bot-btn>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import { Datetime, Group, PopupPicker, XInput, XTextarea, XButton, Step, StepItem, Cell, PopupRadio, XHeader } from 'vux'
import Uploader from '@comps/uploader/uploader'
import fixedBotBtn from '@comps/fixedBotBtn'
import { getSellerTypeList, sellerRegister } from '@api'
import qs from 'qs'

export default {
  components: {
    XHeader,
    Step,
    StepItem,
    Datetime,
    Group,
    PopupPicker,
    XInput,
    XTextarea,
    XButton,
    Uploader,
    Cell,
    PopupRadio,
    fixedBotBtn
  },
  data () {
    return {
      step: 2,
      form: {},
      showBusinessEnddate: false,
      longtimeData: [
        { key: 0, value: '非长期' },
        { key: 1, value: '长期' }
      ],
      licenseImgData: [],
      typeData: [],
      regionData: [],
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState(['token', 'user'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载入驻申请表单
    loadForm () {
      let jsonStr = sessionStorage.getItem('sellerRegisterForm')
      this.form = JSON.parse(jsonStr)
      if (this.form.business_license_img && this.form.business_license_img.length > 0) {
        this.licenseImgData.slice(0, this.licenseImgData.length)
        this.licenseImgData.push({ url: this.form.business_license_img })
      }

      if (this.form.is_longtime === 0) {
        this.showBusinessEnddate = true
      }
    },
    // 加载省市区
    loadRegions () {
      let regions = localStorage.getItem('regions')
      if (regions) {
        this.regionData = JSON.parse(regions)
      }
    },
    // 商家类型切换
    onSellerTypeChange (val) {
      if (val && val.length > 0) {
        this.form.seller_type_id = val[val.length - 1]
      }
    },
    // 地区切换
    onAreaChange (val) {
      if (val && val.length > 0) {
        this.form.region_id = val[val.length - 1]
      }
    },
    // 验证
    isValid () {
      if (!this.form.seller_name || this.form.seller_name.length === 0) {
        this.$toasted.show('请先输入企业名称！')
        return false
      }
      if (!this.form.seller_type_idVal || this.form.seller_type_idVal.length === 0) {
        this.$toasted.show('请先选择企业分类！')
        return false
      }
      if (!this.form.region_idVal || this.form.region_idVal.length === 0) {
        this.$toasted.show('请先选择企业所在地！')
        return false
      }
      if (!this.form.seller_address || this.form.seller_address.length === 0) {
        this.$toasted.show('请先输入企业详细地址！')
        return false
      }

      if (!this.form.licence_number || this.form.licence_number.length === 0) {
        this.$toasted.show('请先输入营业执照代码！')
        return false
      }
      let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/
      if (!reg.test(this.form.licence_number)) {
        this.$toasted.show('请先输入正确的营业执照代码！')
        return false
      }
      if (!this.form.business_license_img || this.form.business_license_img.length === 0) {
        this.$toasted.show('请先上传营业执照照片！')
        return false
      }
      if (this.form.business_license_start.length === 0) {
        this.$toasted.show('请先选择企业成立日期！')
        return false
      }
      if (!this.form.is_longtime) {
        this.$toasted.show('请先选择企业营业期限！')
        return false
      }

      if (this.form.is_longtime === 0 && this.form.business_license_end.length === 0) {
        this.$toasted.show('请先选择营业执照失效日期！')
        return false
      }
      return true
    },
    // 下一步
    async nextClick () {
      if (this.licenseImgData.length >= 1) {
        this.form.business_license_img = this.licenseImgData[0].url
      }
      if (this.isValid()) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await sellerRegister(qs.stringify(this.form))
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$router.push('/sellerRegisterStep' + (this.step + 1))
        }
      }
    },
    // 加载商家类型
    async loadSellerTypes () {
      let res = await getSellerTypeList()
      if (res && res.code === 200) {
        this.typeData = res.data
      }
    }
  },
  created () {
    this.loadForm()
    this.loadSellerTypes()
    this.loadRegions()
  },
  watch: {
    'form.is_longtime': function (val) {
      if (val === 0) {
        this.showBusinessEnddate = true
      } else {
        this.showBusinessEnddate = false
        this.form.business_license_end = null
      }
    }
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

.title-slot {
  text-align: center;
  padding: 16px 0;
  color: $default_title_color;
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
.weui-textarea {
  text-align: right;
}
.vux-step-item-icon {
  width: auto !important;
}
</style>
