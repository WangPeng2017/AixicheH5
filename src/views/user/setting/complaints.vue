<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">投诉建议</x-header>
    <div class="content">
      <group>
        <popup-radio title="问题类型" placeholder="请选择问题类型" :options="typeData" v-model="form.feedback_type">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择问题类型</p>
        </popup-radio>
        <cell title="问题图片" :primary="'content'">
          <uploader
            :images="feedbackImgData"
            :handle-click="false"
            :show-header="false"
            :show-tip="false"
            :autoUpload="true"
            :uploadUrl="'/UploadFile/Upload'"
            :autoRemove="true"
            :removeUrl="'/UploadFile/Remove'"
          ></uploader>
        </cell>
      </group>

      <group class="margin-bottom">
        <x-input :placeholder="'标题'" v-model="form.feedback_title"></x-input>
        <x-textarea :max="200" :placeholder="'请输入具体原因'" v-model="form.feedback_content"></x-textarea>
      </group>
    </div>
    <fixed-bot-btn @click="submit">提交</fixed-bot-btn>
  </div>
</template>

<script>
  import { Cell, PopupRadio, Group, XInput, XTextarea, XHeader } from 'vux'
  import Uploader from '@comps/uploader/uploader'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import { submitFeedBack } from '@api'
  import { mapMutations } from 'vuex'
  import { SET_LOADING } from '@store/type'

  export default {
    components: {
      XHeader,
      fixedBotBtn,
      Cell,
      PopupRadio,
      Group,
      XInput,
      XTextarea,
      Uploader
    },
    data () {
      return {
        form: {},
        typeData: [
          { key: 1, value: '平台申诉' },
          { key: 2, value: '错误反馈' },
          { key: 3, value: '优化建议' },
          { key: 4, value: '其他' }
        ],
        feedbackImgData: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 提交反馈
      async submit () {
        if (!this.form.feedback_type) {
          return this.$toasted.show('请先选择问题类型！')
        }
        if (!this.form.feedback_title || this.form.feedback_title.length === 0) {
          return this.$toasted.show('请先输入标题！')
        }
        if (!this.form.feedback_content || this.form.feedback_content.length === 0) {
          return this.$toasted.show('请输入具体原因！')
        }

        if (this.feedbackImgData.length >= 1) {
          this.form.feedback_img = this.feedbackImgData[0].url
        }

        let formData = new FormData()
        for (let key in this.form) {
          formData.append(key, this.form[key])
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await submitFeedBack(formData)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show(res.msg)
          this.$router.back()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }

  .title-slot {
    text-align: center;
    padding: 20px;
    color: $default_title_color;
  }
</style>

<style lang="scss">
  .weui-textarea {
    text-align: left;
  }
</style>
